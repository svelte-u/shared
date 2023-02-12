import { ClusterOptions } from "../../utils"

/**
 * Split a list into sublists.
 *
 * @param list - The list to split.
 *
 * @param options - The options to use.
 * - `size` - The max size of each sublist. Default: `2`
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
