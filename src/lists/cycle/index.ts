import { len } from "../../len"
import { toWritable } from "../../utils"
import { toReadable } from "../../utils"
import { unstore } from "../../utils"
import type { CycleOptions, MaybeStore } from "../../utils"
import { watchable } from "../../watchable"

/**
 * Cycle through a list of items
 *
 * @param list - The list to cycle through
 *
 * @param options - The options for the cycle
 * - `fallback` - The initial value of the state.
 * - `fallback_index` - The default index when
 * - `getIndex` - Custom function to get the index of the current value.
 *
 * @example
 * ```ts
 * const { state, next, prev } = cycle(["a", "b", "c"])
 * next() // "b"
 * next() // "c"
 * next() // "a"
 * prev() // "c"
 * ```
 *
 * @returns The state and the index
 * - `state` - The current value
 * - `index` - The current index
 * - `next` - Go to the next item in the list
 * - `prev` - Go to the previous item in the list
 *
 */
export function cycle<T>(list: MaybeStore<T[]>, options?: CycleOptions<T>) {
	/**
	 * Get the fallback value
	 *
	 * @returns The fallback value
	 */
	function get_fallback() {
		return options?.fallback ?? unstore(list)[0]
	}

	/**
	 * Get the current index
	 *
	 * @returns The current index
	 */
	function getIndex() {
		const target_list = unstore(list)

		let index = options?.getIndex
			? options.getIndex(unstore(state), target_list)
			: target_list.indexOf(unstore(state))

		if (index < 0) index = options?.fallbackIndex ?? 0

		return index
	}

	/**
	 * Set the value of the state
	 *
	 * @param i - The index of the value to set
	 *
	 * @returns The value that was set
	 *
	 */
	function set_value(_index: number) {
		const target_list = unstore(_list)

		const length = len(target_list)

		const index = ((_index % length) + length) % length

		const value = target_list[index]

		state.set(value)

		return value
	}

	/**
	 * Shift the index by a given delta
	 *
	 * @param delta - The delta to shift the index by
	 *
	 * @returns The value that was set
	 */
	function shift(delta = 1) {
		const new_index = getIndex() + delta

		index.set(new_index)

		return unstore(index)
	}

	/**
	 * Go to the next item in the list
	 *
	 * @param n - The number of items to skip
	 *
	 * @returns The value that was set
	 *
	 */
	function next(n = 1) {
		return shift(n)
	}

	/**
	 * Go to the previous item in the list
	 *
	 * @param n - The number of items to skip
	 *
	 * @returns The value that was set
	 *
	 */
	function prev(n = 1) {
		return shift(-n)
	}

	const state = toWritable(get_fallback())

	const _list = toWritable(list)

	const index = watchable<number>(0, (_, new_value) => {
		set_value(new_value)
	})

	return {
		state: toReadable(state),
		index: toReadable(index),
		next,
		prev,
	}
}
