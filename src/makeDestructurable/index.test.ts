import { describe, expect, it } from "vitest"

import { makeDestructurable } from "."

describe("makeDestructurable", () => {
	it("should be defined", () => {
		expect(makeDestructurable).toBeDefined()
	})

	it("should work", () => {
		const foo = { name: "foo" }

		const bar = 1024

		const obj = makeDestructurable(
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
