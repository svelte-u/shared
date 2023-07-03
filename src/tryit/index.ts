import type { AnyFn } from "../utils"

/**
 * Convert a function to an error-first async function.
 *
 * @param fn - A function to be converted to an error-first async function.
 *
 * @see https://radash-docs.vercel.app/docs/async/tryit
 *
 * @example
 * ```ts
 * const { result, error } = await atryit(async () => {
 * 	return "hello"
 * })()
 * ```
 *
 * @returns An error-first async function.
 *
 */
export function atryit(fn: AnyFn) {
	return async (...args: any) => {
		try {
			return { result: await fn(...args), error: null }
		} catch (err) {
			return { result: null, error: err }
		}
	}
}

/**
 * Convert a function to an error-first function.
 *
 * @param fn - A function to be converted to an error-first function.
 *
 * @example
 * ```ts
 * const { result, error } = tryit(() => {
 * 	return "hello"
 * })()
 * ```
 *
 * @returns An error-first function.
 */
export function tryit(fn: AnyFn) {
	return (...args: any) => {
		try {
			return { result: fn(...args), error: null }
		} catch (err) {
			return { result: null, error: err }
		}
	}
}
