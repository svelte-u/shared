export function invert<
	Key extends string | number | symbol,
	Value extends string | number | symbol
>(obj: Record<string, Value>): Record<Value, Key> {
	if (!obj) return {} as Record<Value, Key>
	return Object.keys(obj).reduce(
		(acc, key) => ({
			...acc,
			[obj[key]]: key,
		}),
		{} as Record<Value, Key>
	)
}
