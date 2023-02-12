/**
 * Gets the new object with the specified keys from the original object.
 *
 * @param obj - The original object.
 *
 * @param keys - The keys to pick.
 *
 * @param omit_undefined - If true, the keys with undefined values will be omitted.
 *
 * @returns The new object with the specified keys from the original object
 */
export function picker<
	O extends Record<string | number | symbol, any>,
	T extends keyof O
>(obj: O, keys: T[], omit_undefined = false) {
	return keys.reduce((n, k) => {
		if (k in obj) {
			if (!omit_undefined || obj[k] !== undefined) n[k] = obj[k]
		}
		return n
	}, {} as Pick<O, T>)
}
