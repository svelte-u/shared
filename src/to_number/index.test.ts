import { describe, expect, it } from "vitest"

import { to_number } from "."

describe("to_number", () => {
	it("should be defined", () => {
		expect(to_number).toBeDefined()
	})

	it("default", () => {
		const value = "123.345"

		const float = to_number(value)

		const int = to_number(value, { method: "int" })

		expect(float).toBe(123.345)
		expect(int).toBe(123)
	})

	it("radix", () => {
		const value = "0xFA"
		const int = to_number(value, { method: "int", radix: 16 })

		expect(int).toBe(250)
	})

	it("nanToZero", () => {
		const value = "Hi"
		const float = to_number(value, { nan_to_zero: true })
		expect(float).toBe(0)
	})
})
