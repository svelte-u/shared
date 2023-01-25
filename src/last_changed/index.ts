import { to_readable } from "../to_readable"
import { to_writable } from "../to_writable"
import type { MaybeStore } from "../utils"
import { watchable } from "../watchable"

/**
 * A function that tracks changes to value and update a timestamp.
 *
 * @param initial_value - The initial value of the store.
 *
 * @param initial_timestamp- An optional initial timestamp.
 *
 * @returns An object containing the store and the timestamp store.
 */
export function last_changed<T>(
	initial_value: MaybeStore<T>,
	initial_timestamp?: number
) {
	const timestamp = to_writable(initial_timestamp ?? +Date.now())

	const value = watchable(initial_value, () => timestamp.set(+Date.now()))

	return { value, timestamp: to_readable(timestamp) }
}
