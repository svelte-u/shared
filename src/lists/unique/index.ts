/**
 * Gets the unique values of an array.
 *
 * @param list - The array to process.
 *
 * @param fn - The function to determine field values
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
