import { get } from "svelte/store"

import { describe, expect, it } from "vitest"

import { adjust_with_unit } from "."

describe("adjust_with_unit", () => {
	it("should be defined", () => {
		expect(adjust_with_unit).toBeDefined()
	})

	it("should work with number", () => {
		const result = adjust_with_unit(100, 1)

		expect(get(result)).toEqual(100)

		result.inc()

		expect(get(result)).toEqual(101)

		result.dec()

		expect(get(result)).toEqual(100)
	})

	it("should work with with unit", () => {
		const result = adjust_with_unit("100%", 1)

		expect(get(result)).toEqual("100%")

		result.inc()

		expect(get(result)).toEqual("101%")

		result.dec()

		expect(get(result)).toEqual("100%")
	})

	it("should work with with -ve unit", () => {
		const result = adjust_with_unit("-1rem", 1)

		expect(get(result)).toEqual("-1rem")

		result.inc()

		expect(get(result)).toEqual("0rem")

		result.dec()

		expect(get(result)).toEqual("-1rem")
	})

	it("shouldn't work with invalid input", () => {
		const result = adjust_with_unit("var(--cool)", -10)

		expect(get(result)).toEqual("var(--cool)")

		result.inc()

		expect(get(result)).toEqual("var(--cool)")

		result.dec()

		expect(get(result)).toEqual("var(--cool)")
	})
})
