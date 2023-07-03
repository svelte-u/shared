/**
 * Clamp a value between two other values.
 *
 * @param value - The value to clamp
 *
 * @param min - The minimum value
 *
 * @param max - The maximum value
 *
 * @example
 * ```ts
 * clamp(5, 1, 10) // 5
 * clamp(0, 1, 10) // 1
 * clamp(15, 1, 10) // 10
 * ```
 *
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value))
}
