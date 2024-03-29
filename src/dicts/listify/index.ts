/**
 * Convert an object to a list of items.
 *
 * @param obj - The object to convert.
 *
 * @param toItem - The function to convert each key-value pair to an item.
 *
 * @example
 * ```ts
 * listify({ a: 1, b: 2, c: 3 }, (key, value) => ({ key, value })) // [
 * 	// ["a", 1]
 * 	// ["b", 2]
 * 	// ["c", 3]
 * // ]
 * ```
 * @returns The list of items.
 */
export function listify<Value, Key extends string | number | symbol, KResult>(
	obj: Record<Key, Value>,
	toItem: (key: Key, value: Value) => KResult
) {
	if (!obj) return []

	const entries = Object.entries(obj)

	if (entries.length === 0) return []

	return entries.reduce((acc, entry) => {
		return [...acc, toItem(entry[0] as Key, entry[1] as Value)]
	}, [] as KResult[])
}
