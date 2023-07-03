/**
 * Selects a list of values from a list of objects
 *
 * @param list - The list of objects to select from
 *
 * @param fn - The function to select the value from the object
 *
 * @param condition - The condition to filter the list by
 *
 * @example
 * ```ts
 * select([{ a: 1 }, { a: 2 }, { a: 3 }], (item) => item.a) // [1, 2, 3]
 * ```
 *
 * @returns The list of values
 */
export function select<T, K>(
	list: T[],
	fn: (item: T) => K,
	condition?: (item: T) => boolean
) {
	return list.reduce((acc, item) => {
		if (condition && !condition(item)) return acc
		return [...acc, fn(item)]
	}, [] as K[])
}
