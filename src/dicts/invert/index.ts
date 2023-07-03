/**
 * Invert a object (swap keys and values)
 *
 * @param obj - The object to invert.
 *
 * @example
 * ```ts
 * invert({ a: 1, b: 2, c: 3 }) // { 1: "a", 2: "b", 3: "c" }
 * ```
 *
 * @returns The inverted object.
 */
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
