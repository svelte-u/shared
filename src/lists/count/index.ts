import type { Dict } from "../../utils"

/**
 * Counts the number of times each item appears in a list.
 *
 * @param list -  The list to count.
 *
 * @param fn -  A function that returns the id of an item or the field to count.
 *
 * @returns A record of the number of times each item appears in the list.
 */
export function count<T extends Dict>(
	list: T[],
	fn: (item: T) => string | number | symbol
) {
	return list.reduce((acc, item) => {
		const id = fn(item)
		return {
			...acc,
			[id]: (acc[id] ?? 0) + 1,
		}
	}, {} as Record<string | number | symbol, number>)
}
