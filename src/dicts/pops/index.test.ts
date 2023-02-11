import { describe, expect, it } from "vitest"

import { pops } from "."

describe("pops", () => {
	it("should be defined", () => {
		expect(pops).toBeDefined()
	})

	it("should work", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}

		expect(pops(obj, ["a", "b"])).toEqual({
			c: 3,
		})
	})

	it("should work with empty keys", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}

		expect(pops(obj, [])).toEqual({
			a: 1,
			b: 2,
			c: 3,
		})
	})

	it("should work with empty object", () => {
		const obj = {}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(pops(obj, ["a", "b"])).toEqual({})
	})

	it("should work with empty object and empty keys", () => {
		const obj = {}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(pops(obj, [])).toEqual({})
	})

	it("should work with non-existent keys", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(pops(obj, ["d", "e"])).toEqual({
			a: 1,
			b: 2,
			c: 3,
		})
	})
})
