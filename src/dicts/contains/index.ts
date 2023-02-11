/**
 * Checks if an object contains all the given keys
 *
 * @param obj - object to check
 *
 * @param keys - keys to check
 *
 * @returns boolean
 */
export function contains(obj: object, ...keys: string[]) {
	return keys.some((key) => key in obj)
}
