import { PrecisionOptions } from "../../utils"

/**
 * Set the precision of a number.
 *
 * @param value - The value to set the precision of
 *
 * @param digits - The number of digits to keep
 *
 * @param options - The options to use
 * - `math` - Method to use for rounding, floor or ceil or round (default: "round")
 *
 * @example
 * ```ts
 * precision(45.125, 2) // 45.13
 *
 * precision(45.125, 2, { math: "ceil" }) // 45.13
 *
 * precision(45.129, 2, { math: "floor" }) // 45.12
 *
 * precision(45.125, 2, { math: "round" }) // 45.13
 * ```
 * @returns The value with the precision set
 *
 */
export function precision(
	value: number,
	digits: number,
	options?: PrecisionOptions
): number | string {
	const power = 10 ** digits
	return Math[options?.math || "round"](value * power) / power
}
