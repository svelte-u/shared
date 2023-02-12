/**
 * Remove the given keys from the given object.
 *
 * @param obj - The object to remove keys from.
 *
 * @param keys - The keys to remove.
 *
 */
export function pops<T, K extends keyof T>(obj: T, keys: K[]) {
	for (const key of keys) {
		delete obj[key]
	}
}
