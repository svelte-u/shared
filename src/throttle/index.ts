import { createFilterWrapper, throttleFilter } from "../utils"
import type { FunctionArgs, PromisifyFn } from "../utils"

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param fn - A function to be executed after delay seconds debounced.
 *
 * @param s - The time to wait before invoking the function in seconds
 *
 * @param trailing - If true, call fn again after the time is up
 *
 * @param leading - if true, call fn on the leading edge of the s timeout
 *
 * @param rejectOnCancel - Whether to reject the promise if the function is cancelled.
 *
 * @example
 * ```ts
 * const fn = throttle(() => console.log("Hello World"), 1)
 *
 * fn() // "Hello World"
 *
 * fn() // Nothing
 *
 * await sleep(1)
 *
 * fn() // "Hello World"
 *
 * fn()	// Nothing
 * ```
 *
 * @returns A new throttled function.
 */
export function throttle<T extends FunctionArgs>(
	fn: T,
	s = 0.2,
	trailing = false,
	leading = true,
	rejectOnCancel = false
): PromisifyFn<T> {
	return createFilterWrapper(
		throttleFilter(s, trailing, leading, rejectOnCancel),
		fn
	)
}
