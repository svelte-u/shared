import { get } from "svelte/store"

import { describe, expect, it } from "vitest"

import { adjustWithUnit } from "."

describe("adjustWithUnit", () => {
	it("should be defined", () => {
		expect(adjustWithUnit).toBeDefined()
	})

	it("should work with number", () => {
		const result = adjustWithUnit(100, 1)

		expect(get(result)).toEqual(100)

		result.inc()

		expect(get(result)).toEqual(101)

		result.dec()

		expect(get(result)).toEqual(100)
	})

	it("should work with with unit", () => {
		const result = adjustWithUnit("100%", 1)

		expect(get(result)).toEqual("100%")

		result.inc()

		expect(get(result)).toEqual("101%")

		result.dec()

		expect(get(result)).toEqual("100%")
	})

	it("should work with with -ve unit", () => {
		const result = adjustWithUnit("-1rem", 1)

		expect(get(result)).toEqual("-1rem")

		result.inc()

		expect(get(result)).toEqual("0rem")

		result.dec()

		expect(get(result)).toEqual("-1rem")
	})

	it("shouldn't work with invalid input", () => {
		const result = adjustWithUnit("var(--cool)", -10)

		expect(get(result)).toEqual("var(--cool)")

		result.inc()

		expect(get(result)).toEqual("var(--cool)")

		result.dec()

		expect(get(result)).toEqual("var(--cool)")
	})
})
