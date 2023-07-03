import { writable } from "svelte/store"

import { on_destroy } from "../utils"
import { toReadable } from "../utils"
import { unstore } from "../utils"
import type { Fn, IntervalFnOptions, MaybeStore, Pauseable } from "../utils"

/**
 * Wrapper for `setInterval` with controls
 *
 * @param fn - callback function
 *
 * @param interval - interval in seconds
 *
 * @example
 * ```ts
 * const { pause, resume } = intervalFn(() => { ... }, 1)
 *
 * pause() // pause the interval
 *
 * resume() // resume the interval
 *
 * ```
 *
 * @returns Pauseable object
 * - `active` - store indicating whether the interval is active
 * - `pause` - pause function to pause the interval
 * - `resume` - resume function to resume the interval
 *
 */
export function intervalFn(
	fn: Fn,
	interval: MaybeStore<number> = 1,
	options: IntervalFnOptions = {}
): Pauseable {
	const { immediate = true, immediateCallback = false } = options

	const active = writable(false)

	let timer: ReturnType<typeof setInterval> | null = null

	/**
	 * Clear the interval
	 *
	 */
	function clean() {
		if (timer) {
			clearInterval(timer)
			timer = null
		}
	}

	/**
	 * Pause the interval
	 *
	 * @remarks
	 * This function will clear the interval and set the active to false
	 */
	function pause() {
		active.set(false)
		clean()
	}

	/**
	 * Resume the interval
	 *
	 */
	function resume() {
		if (unstore(interval) <= 0) return

		active.set(true)

		if (immediateCallback) fn()

		clean()

		timer = setInterval(fn, unstore(interval) * 1000)
	}

	if (immediate) resume()

	on_destroy(pause)

	return {
		active: toReadable(active),
		pause,
		resume,
	}
}
