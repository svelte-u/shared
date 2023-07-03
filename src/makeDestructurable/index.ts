/**
 * Make isomorphic destructurable for object and array at the same time
 *
 * @param obj - The object to make destructurable.
 *
 * @param arr - The array to use for destructuring.
 *
 * @see https://antfu.me/posts/destructuring-with-object-or-array
 *
 * @example
 * ```ts
 * const foo = { name: "foo" }
 *
 * const bar = 1024
 *
 * const obj = makeDestructurable(
 * 	{ foo, bar } as const,
 * 	[foo, bar] as const
 * )
 *
 * const { foo: foo2, bar: bar2 } = obj
 *
 * const [foo3, bar3] = obj
 * ```
 *
 * @returns The destructurable object.
 */
export function makeDestructurable<
	T extends Record<string, unknown>,
	A extends readonly any[]
>(obj: T, arr: A): T & A {
	if (typeof Symbol !== "undefined") {
		const clone = structuredClone(obj)

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

		return clone as T & A
	} else {
		return Object.assign([...arr], obj) as unknown as T & A
	}
}
