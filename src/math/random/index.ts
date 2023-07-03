/**
 * Returns a random number between min (inclusive) and max (exclusive)
 *
 * @param min - The minimum number.
 *
 * @param max - The maximum number.
 *
 * @example
 * ```ts
 * random(1, 10) // 1
 *
 * random(1, 10) // 5
 * ```
 *
 * @returns a random number between min (inclusive) and max (exclusive).
 */
export function random(min: number, max: number): number {
	min = Math.ceil(min)

	max = Math.floor(max)

	return Math.floor(Math.random() * (max - min + 1)) + min
}
