import { toNumber } from "../../toNumber"
import type { Sequential } from "../../utils"

/**
 * Sums all the numbers in given sequences.
 *
 * @param args - The sequences to sum.
 *
 * @example
 * ```ts
 * sum(1, 2, 3) // 6
 * sum([1, 2, 3]) // 6
 * sum([1, 2], 3) // 6
 * sum(1, [2, 3]) // 6
 * ```
 *
 * @returns The sum of all the numbers in given sequences.
 */
export function sum(...args: Sequential): number {
	let result = 0

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result += toNumber(item)
			}
		} else {
			result += toNumber(arg)
		}
	}

	return result
}

/**
 * Subtract all the numbers in given sequences.
 *
 * @param args - The sequences to subtract.
 *
 * @example
 * ```ts
 * subtract(1, 2, 3) // -4
 * subtract([1, 2, 3]) // -4
 * subtract([1, 2], 3) // -4
 * subtract(1, [2, 3]) // -4
 * ```
 *
 * @returns The subtraction of all the numbers in given sequences.
 */
export function subtract(...args: Sequential): number {
	let result = 0
	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				if (result === 0) result = toNumber(item)
				else result -= toNumber(item)
			}
		} else {
			if (result === 0) result = toNumber(arg)
			else result -= toNumber(arg)
		}
	}

	return result
}

/**
 * Multiply all the numbers in given sequences.
 *
 * @param args - The sequences to multiply.
 *
 * @example
 * ```ts
 * multiply(1, 2, 3) // 6
 * multiply([1, 2, 3]) // 6
 * multiply([1, 2], 3) // 6
 * multiply(1, [2, 3]) // 6
 * ```
 *
 * @returns The multiplication of all the numbers in given sequences.
 */
export function multiply(...args: Sequential): number {
	let result = 1

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result *= toNumber(item)
			}
		} else {
			result *= toNumber(arg)
		}
	}

	return result
}

/**
 * Divide all the numbers in given sequences.
 *
 * @param args - The sequences to divide.
 *
 * @example
 * ```ts
 * divide(1, 2, 3) // 0.16666666666666666
 * divide([1, 2, 3]) // 0.16666666666666666
 * divide([1, 2], 3) // 0.16666666666666666
 * divide(1, [2, 3]) // 0.16666666666666666
 * ```
 *
 * @returns The division of all the numbers in given sequences.
 */
export function divide(...args: Sequential): number {
	let result

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				if (result === undefined) result = toNumber(item)
				else {
					result /= toNumber(item)
				}
			}
		} else {
			if (result === undefined) result = toNumber(arg)
			else result /= toNumber(arg)
		}
	}

	if (result === undefined) result = 0
	return result
}

/**
 * Calculates the average of all the numbers in given sequences.
 *
 * @param args - The sequences to calculate the average.
 *
 * @example
 * ```ts
 * average(1, 2, 3) // 2
 * average([1, 2, 3]) // 2
 * average([1, 2], 3) // 2
 * average(1, [2, 3]) // 2
 * ```
 *
 * @returns The average of all the numbers in given sequences.
 */
export function average(...args: Sequential): number {
	return sum(...args) / args.flat().length
}

/**
 * Get the maximum number of sequences
 *
 * @param args - The sequences to get the maximum number.
 *
 * @example
 * ```ts
 * max(1, 2, 3) // 3
 * max([1, 2, 3]) // 3
 * max([1, 2], 3) // 3
 * max(1, [2, 3]) // 3
 * ```
 *
 * @returns The maximum number of sequences
 */
export function max(...args: Sequential): number {
	let result = -Infinity

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result = Math.max(result, toNumber(item))
			}
		} else {
			result = Math.max(result, toNumber(arg))
		}
	}

	return result
}

/**
 * Get the minimum number of sequences
 *
 * @param args - The sequences to get the minimum number.
 *
 * @example
 * ```ts
 * min(1, 2, 3) // 1
 * min([1, 2, 3]) // 1
 * min([1, 2], 3) // 1
 * min(1, [2, 3]) // 1
 * ```
 *
 * @returns The minimum number of sequences
 */
export function min(...args: Sequential): number {
	let result = Infinity

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result = Math.min(result, toNumber(item))
			}
		} else {
			result = Math.min(result, toNumber(arg))
		}
	}

	return result
}
