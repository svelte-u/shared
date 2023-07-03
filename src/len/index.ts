import { type } from "../utils"

/**
 * A function that returns the length of an item.
 *
 * @param item - The item to get the length of.
 *
 * @see https://docs.python.org/3/library/functions.html#len
 *
 * @example
 * ```ts
 * len([1, 2, 3]) // 3
 *
 * len("hello") // 5
 *
 * len({ a: 1, b: 2 }) // 2
 *
 * len(new Set([1, 2, 3])) // 3
 *
 * len(new Map([["a", 1], ["b", 2]])) // 2
 *
 * len(1) // TypeError: len() argument must be a sequence or collection, not number
 *
 * len(null) // TypeError: len() argument must be a sequence or collection, not null
 * ```
 * @returns The length of the item.
 */
export function len<T>(item: T): number {
	if (item instanceof Map) return item.size

	if (item instanceof Set) return item.size

	if (item instanceof Object) return Object.keys(item).length

	if (item instanceof Array) return item.length

	if (typeof item === "string") return item.length

	throw new TypeError(
		`len() argument must be a sequence or collection, not ${type(item)}`
	)
}
