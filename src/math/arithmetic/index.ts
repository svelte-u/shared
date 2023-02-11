import { to_number } from "../../to_number"
import type { Sequential } from "../../utils"

/**
 * Sums all the numbers in given sequences.
 *
 * @param args - The sequences to sum.
 *
 * @returns The sum of all the numbers in given sequences.
 */
export function sum(...args: Sequential): number {
	let result = 0

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result += to_number(item)
			}
		} else {
			result += to_number(arg)
		}
	}

	return result
}

/**
 * Subtract all the numbers in given sequences.
 *
 * @param args - The sequences to subtract.
 *
 * @returns The subtraction of all the numbers in given sequences.
 */
export function subtract(...args: Sequential): number {
	let result = 0
	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				if (result === 0) result = to_number(item)
				else result -= to_number(item)
			}
		} else {
			if (result === 0) result = to_number(arg)
			else result -= to_number(arg)
		}
	}

	return result
}

/**
 * Multiply all the numbers in given sequences.
 *
 * @param args - The sequences to multiply.
 *
 * @returns The multiplication of all the numbers in given sequences.
 */
export function multiply(...args: Sequential): number {
	let result = 1

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result *= to_number(item)
			}
		} else {
			result *= to_number(arg)
		}
	}

	return result
}

/**
 * Divide all the numbers in given sequences.
 *
 * @param args - The sequences to divide.
 *
 * @returns The division of all the numbers in given sequences.
 */
export function divide(...args: Sequential): number {
	let result

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				if (result === undefined) result = to_number(item)
				else {
					result /= to_number(item)
				}
			}
		} else {
			if (result === undefined) result = to_number(arg)
			else result /= to_number(arg)
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
 * @returns The maximum number of sequences
 */
export function max(...args: Sequential): number {
	let result = -Infinity

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result = Math.max(result, to_number(item))
			}
		} else {
			result = Math.max(result, to_number(arg))
		}
	}

	return result
}

/**
 * Get the minimum number of sequences
 *
 * @param args - The sequences to get the minimum number.
 *
 * @returns The minimum number of sequences
 */
export function min(...args: Sequential): number {
	let result = Infinity

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result = Math.min(result, to_number(item))
			}
		} else {
			result = Math.min(result, to_number(arg))
		}
	}

	return result
}
