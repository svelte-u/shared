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
		pops(obj, ["a", "b"])

		expect(obj).toEqual({
			c: 3,
		})
	})

	it("should work with empty keys", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}
		pops(obj, [])

		expect(obj).toEqual({
			a: 1,
			b: 2,
			c: 3,
		})
	})

	it("should work with empty object", () => {
		const obj = {}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		pops(obj, ["a", "b"])

		expect(obj).toEqual({})
	})

	it("should work with empty object and empty keys", () => {
		const obj = {}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		pops(obj, [])

		expect(obj).toEqual({})
	})

	it("should work with non-existent keys", () => {
		const obj = {
			a: 1,
			b: 2,
			c: 3,
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		pops(obj, ["d", "e"])

		expect(obj).toEqual({
			a: 1,
			b: 2,
			c: 3,
		})
	})
})
