/**
 * A function that returns a promise that resolves after a given amount of time.
 *
 * @param s - The amount of time to wait in seconds.
 *
 * @param throw_on_timeout - Whether to throw an error after the timeout.
 *
 * @param reason - The reason to throw if `throw_on_timeout` is `true`.
 *
 * @see https://docs.python.org/3/library/time.html#time.sleep
 *
 * @returns A promise that resolves after `s` seconds.
 */
export function sleep(
	s: number,
	throw_on_timeout = false,
	reason = "Timeout"
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (throw_on_timeout) setTimeout(() => reject(reason), s * 1000)
		else setTimeout(resolve, s * 1000)
	})
}
