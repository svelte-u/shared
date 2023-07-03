import type { FunctionArgs } from "../../utils"

/**
 * A function that takes a list of functions and executes them in order.
 *
 * @param funcs - The list of functions to execute.
 *
 *
 */
export function chain(...funcs: FunctionArgs[]) {
	return (...args: any[]) => {
		return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
	}
}
