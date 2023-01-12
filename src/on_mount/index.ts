import { onMount } from "svelte"

import type { Fn } from "../utils"

/**
 * Call onMount() if it's inside a component lifecycle, if not, do nothing.
 *
 * @param fn - the function to be called when the component is mounted
 *
 */
export function on_mount(fn: Fn) {
	try {
		onMount(fn)
	} catch {
		// do nothing
	}
}
