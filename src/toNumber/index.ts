import type { ToNumberOptions } from "../utils"

/**
 * Convert a value to a number.
 *
 * @param value - The value to convert to a number.
 *
 * @param options - Options to control the conversion.
 * - `method` - The method to use to convert the value. Default `float`.
 * - `radix` - The base in mathematical numeral systems passed to `int`. Only works with `method: 'int'`
 * - `nanToZero` - Replace NaN with zero. Default `false`.
 *
 * @example
 * ```ts
 * toNumber("123.345") // 123.345
 * toNumber("123.345", { method: "int" }) // 123
 * toNumber("0xFA", { method: "int", radix: 16 }) // 250
 * toNumber("Hello", {nanToZero: true }) // 0
 * ```
 *
 * @returns The converted number.
 */
export function toNumber(
	value: number | string,
	options: ToNumberOptions = {}
): number {
	const { method, radix, nanToZero } = options

	let _method: "parseFloat" | "parseInt" = "parseFloat"

	if (method === "int") _method = "parseInt"

	let resolved =
		typeof value === "number" ? value : Number[_method](value, radix)

	if (nanToZero && isNaN(resolved)) resolved = 0

	return resolved
}
