import type { ToNumberOptions } from "../utils"

/**
 * Convert a value to a number.
 *
 * @param value - The value to convert to a number.
 *
 * @param options - Options to control the conversion.
 *
 * @returns The converted number.
 */
export function to_number(
	value: number | string,
	options: ToNumberOptions = {}
): number {
	const { method, radix, nan_to_zero } = options

	let _method: "parseFloat" | "parseInt" = "parseFloat"

	if (method === "int") _method = "parseInt"

	let resolved =
		typeof value === "number" ? value : Number[_method](value, radix)

	if (nan_to_zero && isNaN(resolved)) resolved = 0

	return resolved
}
