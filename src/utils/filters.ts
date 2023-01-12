import { get, writable } from "svelte/store"

import { to_readable } from "../to_readable"
import { noop } from "./is"
import type {
	AnyFn,
	DebounceFilterOptions,
	EventFilter,
	FunctionArgs,
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
 * @returns A wrapped function
 */
export function create_filter_wrapper<T extends FunctionArgs>(
	filter: EventFilter,
	fn: T
) {
	function wrapper(this: any, ...args: any[]) {
		filter(() => fn.apply(this, args), { fn, this_arg: this, args })
	}

	return wrapper as any as T
}

/**
 * A filter that bypasses all events
 *
 * @param invoke - The function to be invoked
 *
 * @returns The result of the function
 */
export const bypass_filter: EventFilter = (invoke) => {
	return invoke()
}

/**
 * Create an EventFilter that debounce the events
 *
 * @param s - The time to wait before invoking the function in seconds
 *
 * @param options - The options for the filter
 */

export function debounce_filter(
	s: number,
	options: DebounceFilterOptions = {}
) {
	let timer: ReturnType<typeof setTimeout> | undefined

	let max_timer: ReturnType<typeof setTimeout> | undefined | null

	let last_rejector: AnyFn = noop

	const _clearTimeout = (timer: ReturnType<typeof setTimeout>) => {
		clearTimeout(timer)
		last_rejector()
		last_rejector = noop
	}

	const filter: EventFilter = (invoke) => {
		const duration = s

		const max_duration = options.max_wait

		if (timer) _clearTimeout(timer)

		if (
			duration <= 0 ||
			(max_duration !== undefined && max_duration <= 0)
		) {
			if (max_timer) {
				_clearTimeout(max_timer)
				max_timer = null
			}
			return Promise.resolve(invoke())
		}

		return new Promise((resolve, reject) => {
			last_rejector = options.reject_on_cancel ? reject : resolve
			// Create the max_timer. Clears the regular timer on invoke
			if (max_duration && !max_timer) {
				max_timer = setTimeout(() => {
					if (timer) _clearTimeout(timer)
					max_timer = null
					resolve(invoke())
				}, max_duration * 1000)
			}

			// Create the regular timer. Clears the max timer on invoke
			timer = setTimeout(() => {
				if (max_timer) _clearTimeout(max_timer)
				max_timer = null
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
 * @param reject_on_cancel - Whether to reject the promise when the event is cancelled
 */
export function throttle_filter(
	s: number,
	trailing = true,
	leading = true,
	reject_on_cancel = false
) {
	let last_exec = 0

	let timer: ReturnType<typeof setTimeout> | undefined

	let is_leading = true

	let last_rejector: AnyFn = noop

	let last_value: any

	const clear = () => {
		if (timer) {
			clearTimeout(timer)
			timer = undefined
			last_rejector()
			last_rejector = noop
		}
	}

	const filter: EventFilter = (_invoke) => {
		const duration = s * 1000

		const elapsed = Date.now() - last_exec

		const invoke = () => {
			return (last_value = _invoke())
		}

		clear()

		if (duration <= 0) {
			last_exec = Date.now()
			return invoke()
		}

		if (elapsed > duration && (leading || !is_leading)) {
			last_exec = Date.now()
			invoke()
		} else if (trailing) {
			return new Promise((resolve, reject) => {
				last_rejector = reject_on_cancel ? reject : resolve
				timer = setTimeout(() => {
					last_exec = Date.now()
					is_leading = true
					resolve(invoke())
					clear()
				}, duration - elapsed)
			})
		}

		if (!leading && !timer)
			timer = setTimeout(() => (is_leading = true), duration)

		is_leading = false

		return last_value
	}

	return filter
}

/**
 * EventFilter that gives extra controls to pause and resume the filter
 *
 * @param extend_filter - Extra filter to apply when the PauseableFilter is active, default to none
 *
 */
export function pauseable_filter(
	extend_filter: EventFilter = bypass_filter
): Pauseable & { event_filter: EventFilter } {
	const active = writable(true)

	function pause() {
		active.set(false)
	}

	function resume() {
		active.set(true)
	}

	const event_filter: EventFilter = (...args) => {
		if (get(active)) extend_filter(...args)
	}

	return { active: to_readable(active), pause, resume, event_filter }
}
