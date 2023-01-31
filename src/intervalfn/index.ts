import { writable } from "svelte/store"

import { on_destroy } from "../on_destroy"
import { to_readable } from "../to_readable"
import { unstore } from "../unstore"
import type { Fn, IntervalFnOptions, MaybeStore, Pauseable } from "../utils"

/**
 * Wrapper for `setInterval` with controls
 *
 * @param fn - callback function
 *
 * @param interval - interval in seconds
 *
 * @returns Pauseable object
 */
export function intervalfn(
	fn: Fn,
	interval: MaybeStore<number> = 1,
	options: IntervalFnOptions = {}
): Pauseable {
	const { immediate = true, immediate_callback = false } = options

	const active = writable(false)

	let timer: any = null

	function clean() {
		if (timer) {
			clearInterval(timer)
			timer = null
		}
	}

	function pause() {
		active.set(false)
		clean()
	}

	function resume() {
		if (interval <= 0) return

		active.set(true)

		if (immediate_callback) fn()

		clean()

		timer = setInterval(fn, unstore(interval) * 1000)
	}

	if (immediate) resume()

	on_destroy(pause)

	return {
		active: to_readable(active),
		pause,
		resume,
	}
}
