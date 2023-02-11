import { describe, expect, it } from "vitest"

import { filter } from "."

describe("filter", () => {
	it("should be defined", () => {
		expect(filter).toBeDefined()
	})

	it("should work", () => {
		expect(filter({ a: 1, b: 2, c: 3 }, (x) => x === undefined)).toEqual({
			a: 1,
			b: 2,
			c: 3,
		})

		expect(
			filter({ a: 1, b: 2, c: undefined }, (x) => x === undefined)
		).toEqual({
			a: 1,
			b: 2,
		})

		expect(filter({ a: 1, b: 2, c: undefined }, (x) => x === 2)).toEqual({
			a: 1,
			c: undefined,
		})

		expect(filter({ a: 1, b: 2, c: undefined })).toEqual({
			a: 1,
			b: 2,
		})

		expect(
			filter({ a: 1, b: 2, c: undefined }, (x) => x === 2 || x === 1)
		).toEqual({ c: undefined })
	})
})
