import { toWritable } from "../utils"
import type { MaybeStore, Watchable } from "../utils"

/**
 * Creates a watchable store that calls a function when the value changes.
 *
 * @param initialValue - Initial value to start watching
 *
 * @param fn - Function to call when the value changes
 *
 * @see https://vuejs.org/guide/essentials/watchers.html
 *
 * @example
 * ```ts
 * const count = watchable(0, (o, n) => {
 * 	console.log(`count changed from ${o} to ${n}`)
 * })
 * ```
 *
 * @returns A writable store that calls a function when the value changes
 */
export function watchable<T>(
	initialValue: MaybeStore<T>,
	fn: (o: T, n: T) => void
): Watchable<T> {
	const { subscribe, update } = toWritable(initialValue)

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
