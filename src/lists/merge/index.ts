/**
 * Merge two lists and override the first list with the second list
 *
 * @param list - The first list.
 *
 * @param other - The second list to merge.
 *
 * @param fn - A function that returns a unique key for each item in the array.
 *
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

	return list.reduce((acc, r) => {
		const matched = other.find((o) => fn(r) === fn(o))
		return matched ? [...acc, matched] : [...acc, r]
	}, [] as T[])
}
