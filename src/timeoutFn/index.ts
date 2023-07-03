import { writable } from "svelte/store"

import { on_destroy } from "../utils"
import { toReadable } from "../utils"
import { unstore } from "../utils"
import type { Fn, MaybeStore, Pauseable, TimeoutFnOptions } from "../utils"

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param fn - callback function

 * @param interval - interval in seconds
 * 
 * @param options - options
 * - `immediate` - start the timer immediate after calling this function
 * - `immediateCallback` - execute the callback immediate after calling this function
 * 
 * @example
 * ```ts
 * const { active, pause, resume } = timeoutFn(() => { ... }, 1)
 * 
 * $active // store indicating whether the timer is active
 * 
 * pause() // pause the timer
 * 
 * resume() // resume the timer
 * ```
 * @returns Pauseable object
 * - `active` - store indicating whether the timer is active
 * - `pause` - pause function to pause the timer
 * - `resume` - resume function to resume the timer
 */
export function timeoutFn(
	fn: Fn,
	interval: MaybeStore<number> = 1,
	options: TimeoutFnOptions = {}
): Pauseable {
	const { immediate = true, immediateCallback = false } = options

	const active = writable(false)

	let timer: ReturnType<typeof setInterval> | null = null

	function clear() {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
	}

	function pause() {
		active.set(false)
		clear()
	}

	function resume() {
		clear()

		active.set(true)

		if (immediateCallback) fn()

		timer = setTimeout(() => {
			active.set(false)
			timer = null
			fn()
		}, unstore(interval) * 1000)
	}

	if (immediate) resume()

	on_destroy(pause)

	return {
		active: toReadable(active),
		resume,
		pause,
	}
}
