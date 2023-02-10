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
 */
export function precision(
	value: number,
	digits: number,
	options?: PrecisionOptions
): number | string {
	const power = 10 ** digits
	return Math[options?.math || "round"](value * power) / power
}
