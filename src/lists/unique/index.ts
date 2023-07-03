/**
 * Gets the unique values of an array.
 *
 * @param list - The array to process.
 *
 * @param fn - The function to determine field values
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 4, 4, 5, 6, 6, 7], (item) => item) // [1, 2, 3, 4, 5, 6, 7]
 * ```
 *
 * @returns The new array of unique values.
 */
export function unique<T, K extends string | number | symbol>(
	list: T[],
	fn: (item: T) => K
) {
	const value_map = list.reduce((acc, item) => {
		const key = fn ? fn(item) : (item as string | number | symbol)

		if (acc[key]) return acc

		return { ...acc, [key]: item }
	}, {} as Record<string | number | symbol, T>)

	return Object.values(value_map)
}
