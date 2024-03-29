/**
 * Groups a list of items by a given function.
 *
 * @param list - List to group
 *
 * @param fn - Function to group by
 *
 * @example
 * ```ts
 * group(
 * 	[{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 3, name: "a" }],
 * 	(item) => item.name
 * ) // { a: [{ id: 1, name: "a" }, { id: 3, name: "a" }], b: [{ id: 2, name: "b" }] }
 * ```
 * @returns A record of lists, where the key is the result of the function, and the value is the list of items that match the key
 */
export function group<T>(list: T[], fn: (item: T) => any) {
	return list.reduce((acc, item) => {
		const id = fn(item)
		const group_list = acc[id] ?? []
		return { ...acc, [id]: [...group_list, item] }
	}, {} as Record<string, T[]>)
}
