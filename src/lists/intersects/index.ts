import type { IntersectsOptions } from "../../utils"

/**
 * Determine whether the given arrays intersect.
 *
 * @param a - The first array.
 *
 * @param b - The second array.
 *
 * @param options - options:
 * - `fn` - A function that returns a unique key for each item in the array.
 *
 * @returns a boolean value indicating whether the arrays intersect and the intersecting items.
 */
export function intersects<T, K extends string | number | symbol>(
	a: T[],
	b: T[],
	options: IntersectsOptions<T, K> = {}
): [boolean, T[]] {
	const { fn = (item: T) => item as unknown as K } = options

	if (!a || !b) return [false, []]

	const dict_b = b.reduce(
		(acc, item) => ({ ...acc, [fn(item)]: true }),
		{} as Record<K, boolean>
	)

	return [
		a.some((item) => dict_b[fn(item)]),
		a.filter((item) => dict_b[fn(item)]),
	]
}
