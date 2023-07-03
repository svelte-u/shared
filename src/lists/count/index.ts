/**
 * Counts the number of times each item appears in a list.
 *
 * @param list -  The list to count.
 *
 * @param fn -  A function that returns the id of an item or the field to count.
 *
 * @example
 * ```ts
 * count([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n % 2 === 0 ? "even" : "odd") // { even: 5, odd: 5 }
 * ```
 *
 * @returns A record of the number of times each item appears in the list.
 */
export function count<T>(list: T[], fn: (item: T) => string | number | symbol) {
	return list.reduce((acc, item) => {
		const id = fn(item)
		return {
			...acc,
			[id]: (acc[id] ?? 0) + 1,
		}
	}, {} as Record<string | number | symbol, number>)
}
