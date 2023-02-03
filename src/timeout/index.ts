import { readable } from "svelte/store"
import type { Readable } from "svelte/store"

import { on_destroy } from "../on_destroy"
import { timeoutfn } from "../timeoutfn"
import { noop } from "../utils"
import type { Fn, Stoppable, TimeoutOptions } from "../utils"

/**
 * Update value after a given time with controls.
 *
 * @param interval - Time in seconds to update the value.
 *
 * @param options - Options to control the behavior of the timeout.
 * - `controls` - Expose more controls. (default: false)
 * - `callback` - a function to call when the timeout is reached.
 *
 * @returns
 * - `ready` - a readable store with the current state.
 * - `stop` - a function to stop the timeout. (only if `controls` option is true)
 * - `start` - a function to start the timeout. (only if `controls` option is true)
 *
 */
export function timeout(
	interval?: number,
	options?: TimeoutOptions<false>
): Readable<boolean>
export function timeout(
	interval: number,
	options: TimeoutOptions<true>
): {
	ready: Readable<boolean>
} & Stoppable
export function timeout(interval = 1, options: TimeoutOptions<boolean> = {}) {
	const { controls: exposeControls = false, callback } = options

	let unsubscribe: Fn = noop

	const controls = timeoutfn(callback ?? noop, interval, options)

	const ready = readable(true, (set) => {
		unsubscribe = controls.pending.subscribe((value) => set(!value))
		console.log(unsubscribe)
		console.log("ME")
	})

	on_destroy(unsubscribe)

	if (exposeControls) {
		return {
			ready,
			...controls,
		}
	} else {
		return ready
	}
}
