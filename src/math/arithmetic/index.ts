import { to_number } from "../../to_number"
import type {
	DivideAble,
	MultiplyAble,
	SubtractAble,
	SumAble,
} from "../../utils"

/**
 * Sums all the numbers in given sequences.
 *
 * @param args - The sequences to sum.
 *
 * @returns The sum of all the numbers in given sequences.
 */
export function sum(...args: SumAble): number {
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
export function subtract(...args: SubtractAble): number {
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
export function multiply(...args: MultiplyAble): number {
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
export function divide(...args: DivideAble): number {
	let result = 1

	for (const arg of args) {
		if (Array.isArray(arg)) {
			for (const item of arg) {
				result /= to_number(item)
			}
		} else {
			result /= to_number(arg)
		}
	}

	return result
}
