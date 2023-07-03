import { on_destroy } from "../utils"
import type { EventHook } from "../utils"

/**
 * Utility for creating event hooks
 *
 *
 * @example
 * ```ts
 * const { on, off, trigger } = createEventHook<string>()
 *
 * on((param) => console.log(param))
 *
 * trigger("xxx") // xxx
 *
 * off((param) => console.log(param))
 *
 * trigger("xxx") // nothing
 *```
 *
 * @returns - Event hooks
 * - `on` - Add a function to the event hook
 * - `off` - Remove a function from the event hook
 * - `trigger` - Trigger the event hook
 */
export function createEventHook<T = any>(): EventHook<T> {
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

		const offFn = () => off(fn)

		on_destroy(offFn)

		return {
			off: offFn,
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
