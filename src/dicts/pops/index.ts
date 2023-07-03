/**
 * Remove the given keys from the given object.
 *
 * @param obj - The object to remove keys from.
 *
 * @param keys - The keys to remove.
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 }
 * pops(obj, ["a", "b"])
 * console.log(obj) // { c: 3 }
 * ```
 *
 */
export function pops<T, K extends keyof T>(obj: T, keys: K[]) {
	for (const key of keys) {
		delete obj[key]
	}
}
