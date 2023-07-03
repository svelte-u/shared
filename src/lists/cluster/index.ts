import type { ClusterOptions } from "../../utils"

/**
 * Split a list into sublists.
 *
 * @param list - The list to split.
 *
 * @param options - The options to use.
 * - `size` - The max size of each sublist. Default: `2`
 *
 * @example
 * ```ts
 * cluster([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // [
 * 	// [1, 2]
 * 	// [3, 4]
 * 	// [5, 6]
 * 	// [7, 8]
 * 	// [9, 10]
 * // ]
 *
 * cluster([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { size: 3 }) // [
 * 	// [1, 2, 3]
 * 	// [4, 5, 6]
 * 	// [7, 8, 9]
 * 	// [10]
 * // ]
 * ```
 *
 * @returns List of sublists.
 */
export function cluster<T>(list: T[], options: ClusterOptions = {}): T[][] {
	const { size = 2 } = options

	if (size === 0) return []

	const cluster_count = Math.ceil(list.length / size)

	return new Array(cluster_count).fill(null).map((_c: null, i: number) => {
		return list.slice(i * size, i * size + size)
	})
}
