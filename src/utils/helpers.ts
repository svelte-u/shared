import { onDestroy } from "svelte"
import { get, readable, writable } from "svelte/store"
import type { Readable, Writable } from "svelte/store"

import { isPartialWritable, isReadable, isReadableOnly } from "./is"
import type { Fn, MaybeStore } from "./types"

/**
 * A function that get date type, that inspired from python type function.
 *
 * @remarks This function is used to get the type of the value.
 *
 * @param value - The value to get type.
 *
 * @param full - Whether to return the full type or not.
 *
 * @example
 * ```ts
 * type(1) // number
 * type(1, true) // [object Number]
 * ```
 *
 * @see https://docs.python.org/3/library/functions.html#type
 *
 * @returns The type of the value.
 */
export function type<T>(value: T, full = false): string {
	const _value = Object.prototype.toString.call(value)

	if (full) return _value
	else return _value.slice(8, -1).toLowerCase()
}

/**
 * Safely get the value of a store, or return the value if it's not a store.
 *
 * @param value - The value to unstore.
 *
 * @example
 * ```ts
 * unstore(1) // 1
 * unstore(readable(1)) // 1
 * unstore(writable(1)) // 1
 * ```
 * @returns The value of the store, or the value if it's not a store.
 */
export function unstore<T>(value: MaybeStore<T>): T {
	return isReadable(value) ? get(value) : value
}

/**
 * Convert a value or a store to a writable store.
 *
 * @param value - The value or store to convert.
 *
 * @example
 * ```ts
 * toWritable(1) // writable(1)
 * toWritable(readable(1)) // writable(1)
 * toWritable(writable(1)) // writable(1)
 * ```
 * @returns A writable store.
 */
export function toWritable<T>(value: MaybeStore<T>): Writable<T> {
	if (isPartialWritable(value)) return value

	if (isReadableOnly(value)) return writable(unstore(value))

	return writable(value)
}

/**
 * A function that converts a value to a readable store, the value could be plain, writable, or even readable store
 *
 * @param value - the value to be converted
 *
 * @example
 * ```ts
 * toReadable(1) // readable(1)
 * toReadable(readable(1)) // readable(1)
 * toReadable(writable(1)) // readable(1)
 * ```
 * @returns a readable store
 */
export function toReadable<T>(value: MaybeStore<T>): Readable<T> {
	if (isPartialWritable(value)) {
		return {
			subscribe: value.subscribe,
		}
	}

	return isReadableOnly(value) ? value : readable(value)
}

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
export function createSingletonPromise<T>(fn: () => Promise<T>) {
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

/**
 * Call onDestroy() if it's inside a component lifecycle, if not, do nothing.
 *
 * @param fn - the function to be called when the component is destroyed
 *
 * @returns true if onDestroy() is called, false if not
 */
export function on_destroy(fn: Fn) {
	try {
		onDestroy(fn)

		return true
	} catch {
		return false
	}
}
