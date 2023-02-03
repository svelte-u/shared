import { writable } from "svelte/store"

import { on_destroy } from "../on_destroy"
import { to_readable } from "../to_readable"
import { unstore } from "../unstore"
import type { AnyFn, MaybeStore, Stoppable, TimeoutFnOptions } from "../utils"

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param fn - callback function

 * @param interval - interval in seconds
 * 
 * @returns Stoppable object
 */
export function timeoutfn(
	fn: AnyFn,
	interval: MaybeStore<number> = 1,
	options: TimeoutFnOptions = {}
): Stoppable {
	const { immediate = true } = options

	const pending = writable(false)

	let timer: any = null

	function clear() {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
	}

	function stop() {
		pending.set(false)
		clear()
	}

	function start(...args: unknown[]) {
		clear()
		pending.set(true)
		timer = setTimeout(() => {
			pending.set(false)
			timer = null
			fn(...args)
		}, unstore(interval) * 1000)
	}

	if (immediate) start()

	on_destroy(stop)

	return {
		pending: to_readable(pending),
		start,
		stop,
	}
}
