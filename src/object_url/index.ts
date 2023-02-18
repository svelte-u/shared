import { on_destroy } from "../on_destroy"

/**
 * URL representing an object.
 *
 * @param value - The value to create an object URL for.
 *
 * @returns The object URL.
 */
export function object_url(value: Blob | MediaSource | undefined) {
	let url: string | undefined = ""

	/** Clean up the object URL. */
	function release() {
		if (url) URL.revokeObjectURL(url)

		url = undefined
	}

	release()

	if (value) url = URL.createObjectURL(value)

	on_destroy(release)

	return url
}
