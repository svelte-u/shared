/**
 * Replaces a search expression with values from a data object
 *
 * @param str - The string to be searched
 *
 * @param data - The data object to be used to replace the search expression
 *
 * @param regex - The search expression
 *
 * @example
 * ```ts
 * template("Hello {{name}}", { name: "John" }) // "Hello John"
 *
 * template("Hello {name}", { name: "John" }, /{(.+?)}/g) // "Hello John"
 * ```
 * @returns A string with values from data object using search expression
 */
export function template(
	str: string,
	data: Record<string, any>,
	regex = /\{\{(.+?)\}\}/g
) {
	return Array.from(str.matchAll(regex)).reduce((acc, match) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, key] = match

		return acc.replace(match[0], data[key])
	}, str)
}
