import { get, writable } from "svelte/store"

import { toReadable } from "../utils"
import { noop } from "./is"
import type {
	AnyFn,
	ArgumentsType,
	DebounceFilterOptions,
	EventFilter,
	Pauseable,
} from "./types"

/**
 * Create a wrapper function that will apply the filter to the function
 *
 * @internal
 *
 * @param filter - The filter to be applied
 *
 * @param fn - The function to be wrapped
 *
 *  @returns A wrapped function
 */
export function createFilterWrapper<T extends AnyFn>(
	filter: EventFilter,
	fn: T
) {
	function wrapper(this: any, ...args: ArgumentsType<T>) {
		return new Promise<ReturnType<T>>((resolve, reject) => {
			// make sure it's a promise
			Promise.resolve(
				filter(() => fn.apply(this, args), { fn, thisArg: this, args })
			)
				.then(resolve)
				.catch(reject)
		})
	}

	return wrapper
}

/**
 * A filter that bypasses all events
 *
 * @param invoke - The function to be invoked
 *
 * @returns The result of the function
 */
export const bypassFilter: EventFilter = (invoke) => {
	return invoke()
}

/**
 * Create an EventFilter that debounce the events
 *
 * @param s - The time to wait before invoking the function in seconds
 *
 * @param options - The options for the filter
 * - `maxWait` - The maximum time allowed to be delayed before it's invoked. In seconds.
 * - `rejectOnCancel` - Whether to reject the last call if it's been cancel. Default to `false`
 *
 * @returns The event filter function
 */

export function debounceFilter(s: number, options: DebounceFilterOptions = {}) {
	let timer: ReturnType<typeof setTimeout> | undefined

	let maxTimer: ReturnType<typeof setTimeout> | undefined | null

	let lastRejector: AnyFn = noop

	const _clearTimeout = (timer: ReturnType<typeof setTimeout>) => {
		clearTimeout(timer)
		lastRejector()
		lastRejector = noop
	}

	const filter: EventFilter = (invoke) => {
		const duration = s

		const maxDuration = options.maxWait

		if (timer) _clearTimeout(timer)

		if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
			if (maxTimer) {
				_clearTimeout(maxTimer)
				maxTimer = null
			}
			return Promise.resolve(invoke())
		}

		return new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve
			// Create the maxTimer. Clears the regular timer on invoke
			if (maxDuration && duration > maxDuration && !maxTimer) {
				maxTimer = setTimeout(() => {
					if (timer) _clearTimeout(timer)

					maxTimer = null

					resolve(invoke())
				}, maxDuration * 1000)
			}

			// Create the regular timer. Clears the max timer on invoke
			timer = setTimeout(() => {
				if (maxTimer) _clearTimeout(maxTimer)
				maxTimer = null
				resolve(invoke())
			}, duration * 1000)
		})
	}

	return filter
}

/**
 * Create an EventFilter that throttle the events
 *
 * @param s - The time to wait before invoking the function in seconds
 *
 * @param trailing - Whether to invoke the function on the trailing edge of the wait interval
 *
 * @param leading - Whether to invoke the function on the leading edge of the wait interval
 *
 * @param rejectOnCancel - Whether to reject the promise when the event is cancelled
 */
export function throttleFilter(
	s: number,
	trailing = true,
	leading = true,
	rejectOnCancel = false
) {
	let lastExec = 0

	let timer: ReturnType<typeof setTimeout> | undefined

	let isLeading = true

	let lastRejector: AnyFn = noop

	let lastValue: any

	const clear = () => {
		if (timer) {
			clearTimeout(timer)
			timer = undefined
			lastRejector()
			lastRejector = noop
		}
	}

	const filter: EventFilter = (_invoke) => {
		const duration = s * 1000

		const elapsed = Date.now() - lastExec

		const invoke = () => {
			return (lastValue = _invoke())
		}

		clear()

		if (duration <= 0) {
			lastExec = Date.now()
			return invoke()
		}

		if (elapsed > duration && (leading || !isLeading)) {
			lastExec = Date.now()
			invoke()
		} else if (trailing) {
			return new Promise((resolve, reject) => {
				lastRejector = rejectOnCancel ? reject : resolve
				timer = setTimeout(() => {
					lastExec = Date.now()
					isLeading = true
					resolve(invoke())
					clear()
				}, duration - elapsed)
			})
		}

		if (!leading && !timer)
			timer = setTimeout(() => (isLeading = true), duration)

		isLeading = false

		return lastValue
	}

	return filter
}

/**
 * EventFilter that gives extra controls to pause and resume the filter
 *
 * @param extendFilter - Extra filter to apply when the PauseableFilter is active, default to none
 *
 * @returns
 * - `active` - A readable store that indicates whether the filter is active
 * - `pause` - A function to pause the filter
 * - `resume` - A function to resume the filter
 * - `eventFilter` - The event filter function
 *
 */
export function pauseableFilter(
	extendFilter: EventFilter = bypassFilter
): Pauseable & { eventFilter: EventFilter } {
	const active = writable(true)

	function pause() {
		active.set(false)
	}

	function resume() {
		active.set(true)
	}

	const eventFilter: EventFilter = (...args) => {
		if (get(active)) extendFilter(...args)
	}

	return { active: toReadable(active), pause, resume, eventFilter }
}
