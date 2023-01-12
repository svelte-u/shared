import { get } from "svelte/store"

import { is_readable } from "../utils"
import type { MaybeStore } from "../utils"

/**
 * Safely get the value of a store, or return the value if it's not a store.
 *
 * @param value - The value to unstore.
 *
 * @returns The value of the store, or the value if it's not a store.
 */
export function unstore<T>(value: MaybeStore<T>): T {
	return is_readable(value) ? get(value) : value
}
