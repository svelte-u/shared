import type { EventHook } from "../utils"

/**
 * Utility for creating event hooks
 *
 * @returns - Event hooks
 */
export function create_event_hook<T = any>(): EventHook<T> {
	const fns: Array<(param: T) => void> = []

	const off = (fn: (param: T) => void) => {
		const index = fns.indexOf(fn)

		if (index !== -1) fns.splice(index, 1)
	}

	const on = (fn: (param: T) => void) => {
		fns.push(fn)

		return {
			off: () => off(fn),
		}
	}

	const trigger = (param: T) => {
		fns.forEach((fn) => fn(param))
	}

	return {
		on,
		off,
		trigger,
	}
}
