export type Fn<TArgs = any, KReturn = any | void> = (
	...args: TArgs[]
) => KReturn

/**
 * a composition of functions, each function is given the next function as an argument and must call it to continue executing.
 *
 * @param fn - the function to compose
 *
 * @returns the composed function
 */
export function compose(...fn: Fn[]) {
	return fn.reverse().reduce((acc, _fn) => _fn(acc))
}
