import { to_writable } from "../../to_writable"
import { unstore } from "../../unstore"
import type { Dict } from "../../utils"
import { contains as _contains } from "../contains"
import { invert as _invert } from "../invert"

/**
 * Enhance a object with some useful methods.
 *
 * @param obj - The object to enhance.
 *
 * @returns The enhanced object.
 * - `subscribe` - A svelte store.
 * - `add` - Add a value to the dict.
 * - `clear` - Clear the dict.
 * - `contains` - Check if the dict contains a key.
 * - `copy` - Copy the dict.
 * - `from_keys` - Create a dict from keys.
 * - `get` - Get a value from the dict.
 * - `invert` - Invert the dict.
 * - `keys` - Get the keys of the dict.
 * - `pop` - Remove a value from the dict.
 * - `popitem` - Remove the last item from the dict.
 * - `values` - Get the values of the dict.
 */
export function enhance(obj: Dict) {
	const dict = to_writable(obj)

	/**
	 * Add a value to the dict.
	 *
	 * @param key - The key to add.
	 *
	 * @param value - The value to add.
	 *
	 */
	function add(key: string, value: unknown) {
		dict.update((n: Dict) => {
			n[key] = value
			return n
		})
	}

	/** Clear the dict.*/
	function clear() {
		dict.update((n: Dict) => {
			for (const key in n) {
				delete n[key]
			}
			return n
		})
	}
	/**
	 * Check if the dict contains a key.
	 *
	 * @param key - The key to check.
	 *
	 * @returns boolean
	 */
	function contains(key: string) {
		return _contains(unstore(dict), key)
	}
	/**
	 * Copy the dict.
	 *
	 * @returns The copied dict.
	 */
	function copy() {
		return enhance({ ...unstore(dict) })
	}

	/**
	 * Create a dict from keys.
	 *
	 * @param keys - The keys to create.
	 *
	 * @param value - The value to set.
	 *
	 * @returns The created dict.
	 */
	function from_keys(keys: string[], value: unknown) {
		return enhance(
			keys.reduce((n, k) => {
				n[k] = value
				return n
			}, {} as Dict)
		)
	}

	/**
	 * Get a value from the dict.
	 *
	 * @param key - The key to get.
	 *
	 * @param fallback - The fallback value if the key is not found.
	 *
	 * @returns The value.
	 */
	function get(key: string, fallback: unknown = null) {
		return unstore(dict)[key] ?? fallback
	}

	/**
	 * Invert the dict.
	 *
	 * @returns The inverted dict.
	 */

	function invert() {
		dict.set(_invert(unstore(dict)))
	}

	/**
	 * Get the keys of the dict.
	 *
	 * @returns The keys.
	 */
	function keys() {
		return Object.keys(unstore(dict))
	}

	/**
	 * Get a value from the dict and remove it.
	 *
	 * @param key - The key to get.
	 *
	 * @returns The value.
	 */
	function pop(key: string) {
		const value = get(key)

		dict.update((n: Dict) => {
			delete n[key]
			return n
		})

		return value
	}

	/**
	 * Remove the last item from the dictionary and return it.
	 *
	 * @returns The last item.
	 */
	function popitem() {
		const key = Object.keys(unstore(dict)).pop()

		if (key) {
			const value = get(key)

			dict.update((n: Dict) => {
				delete n[key]
				return n
			})

			return [key, value]
		}

		return null
	}

	/**
	 * Get the values of the dict.
	 *
	 * @returns The values.
	 */
	function values() {
		return Object.values(unstore(dict))
	}

	return {
		subscribe: dict.subscribe,
		add,
		clear,
		contains,
		copy,
		from_keys,
		get,
		invert,
		keys,
		pop,
		popitem,
		values,
	}
}
