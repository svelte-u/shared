import { describe, expect, it } from "vitest"

import { contains } from "."

describe("contains", () => {
	it("should be defined", () => {
		expect(contains).toBeDefined()
	})

	it("should work", () => {
		const result = contains({ a: 1, b: 2, c: 3 }, "a")

		expect(result).toEqual(true)
	})

	it("should work with empty object", () => {
		const result = contains({}, "a")

		expect(result).toEqual(false)
	})

	it("should work with empty initial value", () => {
		const result = contains({ a: 1, b: 2, c: 3 }, "")

		expect(result).toEqual(false)
	})

	it("should work with empty object and empty initial value", () => {
		const result = contains({}, "")

		expect(result).toEqual(false)
	})
})
