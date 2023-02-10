import { describe, expect, it } from "vitest"

import { clamp } from "."

describe("clamp", () => {
	it("should be defined", () => {
		expect(clamp).toBeDefined()
	})

	it("should be initial value", () => {
		const v = clamp(10, 0, 100)
		expect(v).toBe(10)
	})

	it("should be min value", () => {
		const v = clamp(-10, 0, 100)
		expect(v).toBe(0)
	})

	it("should be max value", () => {
		const v = clamp(110, 0, 100)
		expect(v).toBe(100)
	})
})
