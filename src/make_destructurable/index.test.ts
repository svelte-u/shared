import { describe, expect, it } from "vitest"

import { make_destructurable } from "."

describe("make_destructurable", () => {
	it("should be defined", () => {
		expect(make_destructurable).toBeDefined()
	})

	it("should work", () => {
		const foo = { name: "foo" }

		const bar = 1024

		const obj = make_destructurable(
			{ foo, bar } as const,
			[foo, bar] as const
		)

		const { foo: foo2, bar: bar2 } = obj

		const [foo3, bar3] = obj

		expect(foo2).toEqual(foo)

		expect(bar2).toEqual(bar)

		expect(foo3).toEqual(foo)

		expect(bar3).toEqual(bar)
	})
})
