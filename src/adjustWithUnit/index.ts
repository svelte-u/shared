import { toWritable } from "../utils"
import type { MaybeStore } from "../utils"

/**
 * Adjust a value with unit
 *
 * @param target - Target value
 *
 * @param delta - Delta value
 *
 * @example
 * ```ts
 * const count = adjustWithUnit("1px", 1)
 * count.inc() // "2px"
 * count.dec() // "1px"
 * ```
 *
 * @returns A store with `inc` and `dec` methods
 */
export function adjustWithUnit(
	target: MaybeStore<string | number>,
	delta: number
) {
	const { subscribe, update } = toWritable(target)

	function update_value(_target: string | number, type: string) {
		if (typeof _target === "number")
			return type === "inc" ? _target + delta : _target - delta

		const value = _target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ""

		const unit = _target.slice(value.length)

		const result =
			type === "inc"
				? parseFloat(value) + delta
				: parseFloat(value) - delta

		if (Number.isNaN(result)) return _target

		return result + unit
	}

	return {
		subscribe,
		inc: () => update((n) => update_value(n, "inc")),
		dec: () => update((n) => update_value(n, "dec")),
	}
}
