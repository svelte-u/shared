import { SingletonPromiseReturn } from "../utils"

/**
 * Create singleton promise function
 *
 * @param fn - function to be wrapped
 *
 * @example
 * ```
 * const promise = createSingletonPromise(async () => { ... })
 *
 * await promise()
 * await promise() // all of them will be bind to a single promise instance
 * await promise() // and be resolved together
 * ```
 *
 * @returns singleton promise function
 */
export function create_singleton_promise<T>(
	fn: () => Promise<T>
): SingletonPromiseReturn<T> {
	let _promise: Promise<T> | undefined

	function wrapper() {
		if (!_promise) _promise = fn()
		return _promise
	}
	wrapper.reset = async () => {
		const _prev = _promise
		_promise = undefined
		if (_prev) await _prev
	}

	return wrapper
}
