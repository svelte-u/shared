/**
 * filter unwanted values.
 *
 * @param obj - the object to be filtered
 *
 * @param filter - the filter function, if the function returns true, the value will be removed.
 *
 * @example
 * ```ts
 * filter({ a: 1, b: 2, c: 3 }, (value) => value === 2) // { a: 1, c: 3 }
 * ```
 *
 * @returns the filtered object
 */
export function filter<RemovedKeys extends string, T>(
	obj: Record<string | number | symbol, any>,
	filter: (value: any) => boolean = (x) => !x
): Omit<T, RemovedKeys> {
	if (!obj) return {} as T

	return Object.keys(obj).reduce((acc, key) => {
		if (filter(obj[key])) {
			return acc
		} else return { ...acc, [key]: obj[key] }
	}, {} as T)
}
