import { describe, expect, it } from "vitest"

import { compose } from "."

describe("compose", () => {
	it("should be defined", () => {
		expect(compose).toBeDefined()
	})

	it("should work", () => {
		const zero = (fn: any) => () => fn(0)

		const size = (fn: any) => (num: any) => fn({ num })

		const increment =
			(fn: any) =>
			({ num }: any) =>
				fn({ num: num + 1 })

		const args = (arg: any) => (args: any) => args[arg]

		const composed = compose(zero, size, increment, increment, args("num"))

		const decomposed = zero(size(increment(increment(args("num")))))

		const expected = decomposed()

		const result = composed()

		expect(result).toBe(expected)
	})
})
