import { create_filter_wrapper, throttle_filter } from "../utils"
import type { FunctionArgs } from "../utils"

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
 * @returns A new debounce function.
 */
export function throttle<T extends FunctionArgs>(
	fn: T,
	s = 0.2,
	trailing = false,
	leading = true
): T {
	return create_filter_wrapper(throttle_filter(s, trailing, leading), fn)
}
