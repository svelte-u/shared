import type { Writable } from "svelte/store"

import { toWritable } from "../utils"
import { toReadable } from "../utils"
import { unstore } from "../utils"
import { isWritable } from "../utils"
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
	if (isWritable(value)) {
		return (_value?: boolean) => {
			if (typeof _value !== "undefined") {
				value.set(
					typeof _value === "boolean" ? _value : !unstore(value)
				)
			} else value.set(!unstore(value))
		}
	} else {
		const store = toWritable(value)

		const toggle = (_value?: boolean) => {
			if (typeof _value !== "undefined") {
				store.set(
					typeof _value === "boolean" ? _value : !unstore(store)
				)
			} else store.set(!unstore(store))
		}

		return {
			toggled: toReadable(store),
			toggle,
		}
	}
}
