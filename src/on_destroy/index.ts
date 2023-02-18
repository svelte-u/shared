import { onDestroy } from "svelte"

import type { Fn } from "../utils"

/**
 * Call onDestroy() if it's inside a component lifecycle, if not, do nothing.
 *
 * @param fn - the function to be called when the component is destroyed
 *
 * @returns true if onDestroy() is called, false if not
 */
export function on_destroy(fn: Fn) {
	try {
		onDestroy(fn)

		return true
	} catch {
		return false
	}
}
