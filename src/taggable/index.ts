import type { Writable } from "svelte/store"

import { to_readable } from "../to_readable"
import { to_writable } from "../to_writable"
import { unstore } from "../unstore"
import { is_boolean, is_writable } from "../utils"
import type { DefaultTaggableReturn, MaybeStore, ToggleFn } from "../utils"

/**
 * Creates a taggable store.
 *
 * @param value - initial state.
 *
 * @defaultValue false
 *
 * @returns
 * - `toggle` - a function to toggle the state.
 * - `toggled` - a readable store with the current state. if the value is not writable store
 */
export function taggable(value: Writable<boolean>): ToggleFn
export function taggable(value?: MaybeStore<boolean>): DefaultTaggableReturn
export function taggable(value: MaybeStore<boolean> = false) {
	if (is_writable(value)) {
		return (_value?: boolean) => {
			if (typeof _value !== "undefined") {
				value.set(is_boolean(_value) ? _value : !unstore(value))
			} else value.set(!unstore(value))
		}
	} else {
		const store = to_writable(value)

		const toggle = (_value?: boolean) => {
			if (typeof _value !== "undefined") {
				store.set(is_boolean(_value) ? _value : !unstore(store))
			} else store.set(!unstore(store))
		}

		return {
			toggled: to_readable(store),
			toggle,
		}
	}
}
