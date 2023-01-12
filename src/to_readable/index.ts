import { readable } from "svelte/store"
import type { Readable } from "svelte/store"

import { is_partial_writable, is_readable_only } from "../utils"
import type { MaybeStore } from "../utils"

/**
 * A function that converts a value to a readable store, the value could be plain, writable, or even readable store
 *
 * @param value - the value to be converted
 *
 * @returns a readable store
 */
export function to_readable<T>(value: MaybeStore<T>): Readable<T> {
	if (is_partial_writable(value)) {
		return {
			subscribe: value.subscribe,
		}
	}

	return is_readable_only(value) ? value : readable(value)
}
