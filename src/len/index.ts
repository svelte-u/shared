import { type } from "../type"

/**
 * A function that returns the length of an item.
 *
 * @param item - The item to get the length of.
 *
 * @see https://docs.python.org/3/library/functions.html#len
 *
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
