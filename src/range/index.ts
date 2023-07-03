/**
 * Returns an generator of numbers from start to stop.
 *
 * @param start - The start of the range.
 *
 * @param stop - The end of the range.
 *
 * @param step - The step of the range.
 *
 * @see https://docs.python.org/3/library/functions.html#func-range
 *
 * @example
 * ```ts
 * range(1, 5) // [1, 2, 3, 4, 5]
 * range(1, 5, 2) // [1, 3, 5]
 * range(5, 1, -1) // [5, 4, 3, 2, 1]
 * range(10) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10]
 * ```
 *
 * @returns An generator of numbers.
 */
export function* range(
	start: number,
	stop?: number,
	step = 1
): Generator<number> {
	if (typeof stop === "undefined") {
		stop = start
		start = 0
	}

	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return []
	}

	for (let i = start; i <= stop; i += step) {
		yield i
		if (i + step > stop) break
	}
}
