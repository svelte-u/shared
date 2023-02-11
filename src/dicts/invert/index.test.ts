import { describe, expect, it } from "vitest"

import { invert } from "."

describe("invert", () => {
	it("should be defined", () => {
		expect(invert).toBeDefined()
	})

	it("should work", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}

		const result = invert(obj)

		expect(result).toEqual({
			1: "a",
			2: "b",
			3: "c",
		})
	})

	it("should work with empty object", () => {
		const obj = {}

		const result = invert(obj)

		expect(result).toEqual({})
	})
})
