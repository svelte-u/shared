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
