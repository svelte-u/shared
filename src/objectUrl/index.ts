import { on_destroy } from "../utils"
import { unstore } from "../utils"
import type { MaybeStore } from "../utils"

/**
 * URL representing an object.
 *
 * @param value - The value to create an object URL for.
 *
 * @returns The object URL.
 */
export function objectUrl(value: MaybeStore<Blob | MediaSource | undefined>) {
	let url: string | undefined = ""

	const _value = unstore(value)

	/** Clean up the object URL. */
	function release() {
		if (url) URL.revokeObjectURL(url)

		url = undefined
	}

	release()

	if (_value) url = URL.createObjectURL(_value)

	on_destroy(release)

	return url
}
