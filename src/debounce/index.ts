import { create_filter_wrapper, debounce_filter } from "../utils"
import type { DebounceFilterOptions, FunctionArgs } from "../utils"

/**
 * Debounce execution of a function.
 *
 * @param fn - A function to be executed after delay seconds debounced.
 *
 * @param s - The time to wait before invoking the function in seconds.
 *
 * @returns A new debounce function.
 */
export function debounce<T extends FunctionArgs>(
	fn: T,
	s = 0.2,
	options: DebounceFilterOptions = {}
): T {
	return create_filter_wrapper(debounce_filter(s, options), fn)
}
