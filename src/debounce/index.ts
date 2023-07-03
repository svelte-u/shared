import { createFilterWrapper, debounceFilter } from "../utils"
import type { DebounceFilterOptions, FunctionArgs, PromisifyFn } from "../utils"

/**
 * Debounce execution of a function.
 *
 * @param fn - A function to be executed after delay seconds debounced.
 *
 * @param s - The time to wait before invoking the function in seconds.
 *
 * @param options - Options to pass to the debounce filter.
 * - `maxWait` - The maximum time allowed to be delayed before it's invoked. In seconds.
 * - `rejectOnCancel` - Whether to reject the last call if it's been cancel. Default `false`.
 *
 * @example
 * ```ts
 * let counter = 0
 *
 * const fn = debounce(() => {
 * 	counter++
 * }, 1)
 *
 * fn()
 *
 * fn()
 *
 * await sleep(1)
 *
 * console.log(counter) // 1
 * ```
 *
 * @returns A new debounce function.
 */
export function debounce<T extends FunctionArgs>(
	fn: T,
	s = 0.2,
	options: DebounceFilterOptions = {}
): PromisifyFn<T> {
	return createFilterWrapper(debounceFilter(s, options), fn)
}
