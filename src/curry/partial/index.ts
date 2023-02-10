import type { FunctionArgs } from "../../utils"

/**
 * Create a function by partially applying arguments to another function.
 *
 * @param fn The function to partially apply arguments to.
 *
 * @param args The arguments to partially apply to the function.
 *
 * @returns A function that takes the remaining arguments to the function.
 */
export function partial(fn: FunctionArgs, ...args: any[]) {
	return (...rest: any[]) => fn(...args, ...rest)
}
