import type { FunctionArgs } from "../utils"

/**
 * Convert a function to an error-first async function.
 *
 * @param fn - A function to be converted to an error-first async function.
 *
 * @see https://radash-docs.vercel.app/docs/async/tryit
 *
 * @returns An error-first async function.
 *
 */
export function tryit(fn: FunctionArgs) {
	return async (...args: any) => {
		try {
			return { result: await fn(...args), error: null }
		} catch (err) {
			return { result: null, error: err }
		}
	}
}
