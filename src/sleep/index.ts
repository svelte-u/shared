/**
 * A function that returns a promise that resolves after a given amount of time.
 *
 * @param s - The amount of time to wait in seconds.
 *
 * @param throwOnTimeout - Whether to throw an error after the timeout.
 *
 * @param reason - The reason to throw if `throwOnTimeout` is `true`.
 *
 * @see https://docs.python.org/3/library/time.html#time.sleep
 *
 * @example
 * ```ts
 * await sleep(1) // Wait for 1 second
 * await sleep(1, true, "Timeout") // Throw an error after 1 second
 * ```
 *
 * @returns A promise that resolves after `s` seconds.
 */
export function sleep(
	s: number,
	throwOnTimeout = false,
	reason = "Timeout"
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (throwOnTimeout) setTimeout(() => reject(reason), s * 1000)
		else setTimeout(resolve, s * 1000)
	})
}
