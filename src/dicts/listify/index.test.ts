import { describe, expect, it } from "vitest"

import { listify } from "."

describe("listify", () => {
	it("should be defined", () => {
		expect(listify).toBeDefined()
	})

	it("should work", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}

		const result = listify(obj, (key, value) => [key, value])

		expect(result).toEqual([
			["a", 1],
			["b", 2],
			["c", 3],
		])
	})

	it("should work with empty object", () => {
		const obj = {}

		const result = listify(obj, (key, value) => [key, value])

		expect(result).toEqual([])
	})
})
