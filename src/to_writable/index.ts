import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

import { unstore } from "../unstore"
import { is_partial_writable, is_readable_only } from "../utils"
import type { MaybeStore } from "../utils"

/**
 * Convert a value or a store to a writable store.
 *
 * @param value - The value or store to convert.
 *
 * @returns A writable store.
 */
export function to_writable<T>(value: MaybeStore<T>): Writable<T> {
	if (is_partial_writable(value)) return value

	if (is_readable_only(value)) return writable(unstore(value))

	return writable(value)
}
