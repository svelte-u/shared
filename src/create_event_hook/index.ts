import { on_destroy } from "../on_destroy"
import type { EventHook } from "../utils"

/**
 * Utility for creating event hooks
 *
 * @returns - Event hooks
 * - `on` - Add a function to the event hook
 * - `off` - Remove a function from the event hook
 * - `trigger` - Trigger the event hook
 */
export function create_event_hook<T = any>(): EventHook<T> {
	const fns: Set<(param: T) => void> = new Set()

	/**
	 * Remove a function from the event hook
	 *
	 * @param fn - Function to remove
	 */
	function off(fn: (param: T) => void) {
		fns.delete(fn)
	}

	/**
	 * Add a function to the event hook
	 *
	 * @param fn - Function to add
	 *
	 * @returns - Function to remove the function
	 */
	function on(fn: (param: T) => void) {
		fns.add(fn)

		const off_fn = () => off(fn)

		on_destroy(off_fn)

		return {
			off: off_fn,
		}
	}

	/**
	 * Trigger the event hook
	 *
	 * @param param - Parameter to pass to the functions
	 *
	 * @returns - Promise that resolves when all functions have resolved
	 */
	function trigger(param: T) {
		return Promise.all(Array.from(fns).map((fn) => fn(param)))
	}

	return {
		on,
		off,
		trigger,
	}
}
