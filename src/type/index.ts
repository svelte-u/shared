/**
 * A function that get date type, that inspired from python type function.
 *
 * @remarks This function is used to get the type of the value.
 *
 * @param value - The value to get type.
 *
 * @see https://docs.python.org/3/library/functions.html#type
 *
 * @returns The type of the value.
 */
export function type<T>(value: T): string {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
