/**
 * Merge two lists and override the first list with the second list
 *
 * @param list - The first list.
 *
 * @param other - The second list to merge.
 *
 * @param fn - A function that returns a unique key for each item in the array.
 *
 * @example
 * ```ts
 * merge(
 * 	[{ id: 1, name: "a" }, { id: 2, name: "b" }],
 * 	[{ id: 1, name: "c" }, { id: 3, name: "d" }],
 * 	(item) => item.id
 * ) // [{ id: 1, name: "c" }, { id: 2, name: "b" }, { id: 3, name: "d" }]
 * ```
 * @returns a new list with the second list merged into the first list.
 */
export function merge<T, K extends string | number | symbol>(
	list: T[],
	other: T[],
	fn: (item: T) => K
): T[] {
	if (!other && !list) return []

	if (!other) return list

	if (!list) return []

	if (!fn) return list

	const merged = [...list]

	for (const item of other) {
		const matched = merged.find((o) => fn(o) === fn(item))

		if (matched) Object.assign(matched, item)
		else merged.push(item)
	}

	return merged
}
