/**
 * Gets the new object with the specified keys from the original object.
 *
 * @param obj - The original object.
 *
 * @param keys - The keys to pick.
 *
 * @param omitUndefined - If true, the keys with undefined values will be omitted.
 *
 * @example
 * ```ts
 * picker({ a: 1, b: 2, c: 3 }, ["a", "b"]) // { a: 1, b: 2 }
 * ```
 *
 * @returns The new object with the specified keys from the original object
 */
export function picker<
	O extends Record<string | number | symbol, any>,
	T extends keyof O
>(obj: O, keys: T[], omitUndefined = false) {
	return keys.reduce((n, k) => {
		if (k in obj) {
			if (!omitUndefined || obj[k] !== undefined) n[k] = obj[k]
		}
		return n
	}, {} as Pick<O, T>)
}
