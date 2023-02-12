/**
 * Remove the given keys from the given object and return a new object.
 *
 * @param obj - The object to remove keys from.
 *
 * @param keys - The keys to remove.
 *
 * @returns The object without the given keys.
 */
export function pops<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	const copy = structuredClone ? structuredClone(obj) : { ...obj }

	for (const key of keys) {
		delete copy[key]
	}
	return copy
}
