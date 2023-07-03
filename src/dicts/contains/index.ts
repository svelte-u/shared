/**
 * Checks if an object contains all the given keys
 *
 * @param obj - object to check
 *
 * @param keys - keys to check
 *
 * @example
 * ```ts
 * contains({ a: 1, b: 2 }, "a") // true
 * contains({ a: 1, b: 2 }, "a", "b") // true
 * contains({ a: 1, b: 2 }, "a", "b", "c") // false
 * ```
 *
 * @returns boolean
 */
export function contains(obj: object, ...keys: string[]) {
	return keys.some((key) => key in obj)
}
