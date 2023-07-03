import type { Dict } from "../../utils"

/**
 * Sorts a list of objects by a given key.
 *
 * @param list - The list to sort.
 *
 * @param key - The key to sort by.
 *
 * @example
 * ```ts
 * sort([{ a: 1 }, { a: 2 }], "a") // [{ a: 1 }, { a: 2 }]
 * sort([{ a: 1 }, { a: 2 }], "-a") // [{ a: 2 }, { a: 1 }]
 * ```
 *
 * @returns The sorted list.
 */
export function sort<T extends Dict>(list: T[], key: string) {
	if (!list) return []

	let sort_order = 1

	if (key[0] === "-") {
		sort_order = -1
		key = key.slice(1)
	}

	const order = (a: T, b: T) => {
		const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
		return result * sort_order
	}

	return list.slice().sort(order)
}
