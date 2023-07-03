import { toWritable } from "../../utils"
import { unstore } from "../../utils"
import type { Dict, EnhanceSortOptions } from "../../utils"
import { sort as _sort } from "../sort"

/**
 * Enhance an array with some useful methods.
 *
 * @param arr - The array to enhance.
 *
 * @example
 * ```ts
 * const list = enhance([1, 2, 3])
 * list.subscribe((value) => console.log(value))
 * list.append(4)
 * list.clear()
 * list.count(1)
 * list.copy()
 * list.index(1)
 * list.insert(1, 2)
 * list.remove(1)
 * list.pop()
 * ```
 *
 * @returns The enhanced array.
 * - `subscribe` - A svelte store.
 * - `append` - Add an item to the end of the list.
 * - `clear` - Remove all items from the list.
 * - `count` - Count the number of times an item appears in the list.
 * - `copy` - Returns a copy of the list.
 * - `index` - Returns the index of the first item that matches the given value.
 * - `insert` - Insert an item at a given position.
 * - `remove` - Removes an item from the list.
 * - `pop` - Remove an item by index.
 * - `sort` - Sort the list.
 */
export function enhance<T>(arr: T[]) {
	const list = toWritable(arr)

	/**
	 * Add the item to the end of the list.
	 *
	 * @param item - The item to add.
	 *
	 */
	function append(item: T | T[]) {
		if (Array.isArray(item)) {
			list.update((n) => [...n, ...item])
		} else {
			list.update((n) => [...n, item])
		}
	}

	/** Removes all items from the list. */
	function clear() {
		list.set([])
	}

	/**
	 * Count the number of times an item appears in the list.
	 *
	 * @param item - The item to count. (optional)
	 *
	 * @returns - Number of times the item appears in the list.
	 */
	function count(item?: T) {
		if (item) {
			let count = 0

			const _list = unstore(list)

			for (let i = 0; i < _list.length; i++) {
				if (_list[i] === item) {
					count++
				}
			}

			return count
		} else {
			return arr.length
		}
	}

	/** Returns a copy of the list. */
	function copy() {
		return enhance([...unstore(list)])
	}

	/**
	 * Get an index of the specified item.
	 *
	 * @param item - The item to get the index of.
	 *
	 * @param start - The index to start searching from. (optional)
	 *
	 * @returns The index of the item.
	 */
	function index(item: T, start?: number) {
		return unstore(list).indexOf(item, start)
	}

	/**
	 * Insert an item into the list.
	 *
	 * @param item - The item to insert.
	 *
	 * @param index - The index to insert the item at. (default: 0)
	 */
	function insert(item: T | T[], index = 0) {
		if (Array.isArray(item)) {
			list.update((n) => [
				...n.slice(0, index),
				...item,
				...n.slice(index),
			])
		} else {
			list.update((n) => [...n.slice(0, index), item, ...n.slice(index)])
		}
	}

	/**
	 * Remove an item from the list.
	 *
	 * @param item - The item to remove.
	 *
	 */
	function remove(item: T | T[]) {
		if (Array.isArray(item)) {
			list.update((n) => n.filter((i) => !item.includes(i)))
		} else {
			list.update((n) => n.filter((i) => i !== item))
		}
	}

	/**
	 * Remove an item by index.
	 *
	 * @param index - The index of the item to remove. (default: -1)
	 *
	 * @returns The removed item.
	 */
	function pop(index?: number) {
		const _list = unstore(list)

		const item = _list.at(index ?? -1)

		remove(item ?? [])

		return item
	}

	/**
	 * Sort the list.
	 *
	 * @param options - The options to use when sorting the list.
	 * - `type`: The type of item in the list. (default: "string")
	 * - `sort_by`: Sort by the key of item. This only work for `type` object items. if sort_by isn't provided when you make `type = object`, it will sort by the first key
	 * - `reverse`: Reverse the list. (default: false)
	 */
	function sort(options: EnhanceSortOptions = {}) {
		const { type = "string", sortBy, reverse = false } = options

		const _list = unstore(list)

		if (type === "string") {
			list.set(
				_list.sort((a: any, b: any) =>
					reverse ? b.localeCompare(a) : a.localeCompare(b)
				)
			)
		} else if (type === "number") {
			list.set(_list.sort((a: any, b: any) => (reverse ? b - a : a - b)))
		} else if (type === "object") {
			let _sort_by = sortBy ?? Object.keys(_list[0] as Dict)[0]

			if (reverse) {
				_sort_by = `-${_sort_by}`
			}

			list.set(_sort(_list as any, _sort_by))
		}
	}

	return {
		subscribe: list.subscribe,
		append,
		clear,
		count,
		copy,
		index,
		insert,
		remove,
		pop,
		sort,
	}
}
