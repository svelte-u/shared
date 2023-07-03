import { toWritable } from "../utils"
import { toReadable } from "../utils"
import type { MaybeStore } from "../utils"
import { watchable } from "../watchable"

/**
 * A function that tracks changes to value and update a timestamp.
 *
 * @param initialValue - The initial value of the store.
 *
 * @param initialTimestamp- An optional initial timestamp.
 *
 * @example
 * ```ts
 * const { value, timestamp } = lastChanged(0)
 *
 * value.set(1)
 *
 * console.log($timestamp) // 1626948980000
 *
 * value.set(2)
 *
 * console.log($timestamp) // 1626948981000
 * ```
 *
 * @returns An object containing the store and the timestamp store.
 */
export function lastChanged<T>(
	initialValue: MaybeStore<T>,
	initialTimestamp?: number
) {
	const timestamp = toWritable(initialTimestamp ?? +Date.now())

	const value = watchable<T>(initialValue, () => timestamp.set(+Date.now()))

	return { value, timestamp: toReadable(timestamp) }
}
