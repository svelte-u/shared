/**
 * Clamp a value between two other values.
 *
 * @param value - The value to clamp
 *
 * @param min - The minimum value
 *
 * @param max - The maximum value
 *
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value))
}
