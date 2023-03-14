import { to_writable } from "../to_writable"
import type { MaybeStore, Watchable } from "../utils"

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
): Watchable<T> {
	const { subscribe, update } = to_writable(initial_value)

	let active = true

	return {
		subscribe,
		set: (value: T) => {
			update((old_value) => {
				if (active) fn(old_value, value)
				return value
			})
		},

		pause: () => {
			active = false
		},

		resume: () => {
			active = true
		},
	}
}
