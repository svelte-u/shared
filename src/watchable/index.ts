import { to_writable } from "../to_writable"
import type { MaybeStore, PartialWritable } from "../utils"

/**
 * Creates a writable store that calls a function when the value changes.
 *
 * @param initial_value - Initial value to start watching
 *
 * @param fn - Function to call when the value changes
 *
 * @see https://vuejs.org/guide/essentials/watchers.html
 *
 * @returns A writable store that calls a function when the value changes
 */
export function watchable<T>(
	initial_value: MaybeStore<T>,
	fn: (o: T, n: T) => void
): PartialWritable<T> {
	const { subscribe, update } = to_writable(initial_value)

	return {
		subscribe,
		set: (value: T) => {
			update((old_value) => {
				fn(old_value, value)
				return value
			})
		},
	}
}
