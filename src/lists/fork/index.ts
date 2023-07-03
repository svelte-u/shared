/**
 * Fork a list into two lists based on a condition.
 *
 * @param list - List to fork
 *
 * @param fn - Function to apply a condition to each item in the list
 *
 * @example
 * ```ts
 * fork([1, 2, 3, 4], (item) => item % 2 === 0) // [[2, 4], [1, 3]]
 * ```
 * @returns A list of lists, where the first list contains all items that match the condition, and the second list contains all items that do not match the condition
 */
export function fork<T>(list: T[], fn: (item: T) => boolean): [T[], T[]] {
	if (!list) return [[], []]
	return list.reduce(
		(acc, item) => {
			const [a, b] = acc
			if (fn(item)) {
				return [[...a, item], b]
			} else {
				return [a, [...b, item]]
			}
		},
		[[], []] as [T[], T[]]
	)
}
