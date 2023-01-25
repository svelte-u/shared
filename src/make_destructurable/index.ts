/**
 * Make isomorphic destructurable for object and array at the same time
 *
 * @param obj - The object to make destructurable.
 *
 * @param arr - The array to use for destructuring.
 *
 * @see https://antfu.me/posts/destructuring-with-object-or-array
 *
 * @returns The destructurable object.
 */
export function make_destructurable<
	Obj extends Record<string, unknown>,
	Arr extends readonly any[]
>(obj: Obj, arr: Arr): Obj & Arr {
	if (typeof Symbol !== "undefined") {
		const clone = { ...obj }

		Object.defineProperty(clone, Symbol.iterator, {
			enumerable: false,
			value() {
				let index = 0
				return {
					next: () => ({
						value: arr[index++],
						done: index > arr.length,
					}),
				}
			},
		})

		return clone as Obj & Arr
	} else {
		return Object.assign([...arr], obj) as unknown as Obj & Arr
	}
}
