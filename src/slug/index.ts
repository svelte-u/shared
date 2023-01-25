import { range } from "../range"
import type { SlugOptions } from "../utils"

/**
 * Returns a random slug.
 *
 * @param options - The options.
 *
 * @returns A random slug.
 */
export function slug(options: SlugOptions = {}): string {
	const { lower = true, upper = true, digits = true } = options

	let size = options.size || 6

	let chars = ""

	if (size <= 1) size = 2

	if (lower) chars += "abcdefghijklmnopqrstuvwxyz"

	if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	if (digits) chars += "0123456789"

	let slug = ""

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const _ of range(size - 1))
		slug += chars[Math.floor(Math.random() * chars.length)]

	return options.prefix ? `${options.prefix}-${slug}` : slug
}
