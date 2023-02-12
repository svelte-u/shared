/**
 * Convert an object to a list of items.
 *
 * @param obj - The object to convert.
 *
 * @param to_item - The function to convert each key-value pair to an item.
 *
 * @returns The list of items.
 */
export function listify<Value, Key extends string | number | symbol, KResult>(
	obj: Record<Key, Value>,
	to_item: (key: Key, value: Value) => KResult
) {
	if (!obj) return []

	const entries = Object.entries(obj)

	if (entries.length === 0) return []

	return entries.reduce((acc, entry) => {
		return [...acc, to_item(entry[0] as Key, entry[1] as Value)]
	}, [] as KResult[])
}
