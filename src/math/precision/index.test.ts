import { describe, expect, it } from "vitest"

import { precision } from "."

describe("precision", () => {
	it("should be defined", () => {
		expect(precision).toBeDefined()
	})

	it("should work", () => {
		const base = 45.125

		const result = precision(base, 2)

		expect(result).toBe(45.13)
	})

	it("out ceil should work", () => {
		const base = 45.125

		const result = precision(base, 2, { math: "ceil" })

		expect(result).toBe(45.13)
	})

	it("out floor should work", () => {
		const base = 45.129

		const result = precision(base, 2, { math: "floor" })

		expect(result).toBe(45.12)
	})
})
