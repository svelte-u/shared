import { describe, expect, it } from "vitest"

import { toNumber } from "."

describe("toNumber", () => {
	it("should be defined", () => {
		expect(toNumber).toBeDefined()
	})

	it("default", () => {
		const value = "123.345"

		const float = toNumber(value)

		const int = toNumber(value, { method: "int" })

		expect(float).toBe(123.345)
		expect(int).toBe(123)
	})

	it("radix", () => {
		const value = "0xFA"
		const int = toNumber(value, { method: "int", radix: 16 })

		expect(int).toBe(250)
	})

	it("nanToZero", () => {
		const value = "Hi"
		const float = toNumber(value, { nanToZero: true })
		expect(float).toBe(0)
	})
})
