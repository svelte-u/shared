import { describe, expect, it } from "vitest"

import { slug } from "."

describe("slug", () => {
	it("should be defined", () => {
		expect(slug).toBeDefined()
	})

	it("should work", () => {
		const result = slug()
		expect(result.length).toBe(6)
	})

	it("should work with size option", () => {
		const result = slug({ size: 10 })

		expect(result.length).toBe(10)
	})

	it("should work with prefix option", () => {
		const result = slug({ size: 10, prefix: "foo" })

		expect(result.length).toBe(14)

		expect(result.startsWith("foo")).toBe(true)

		expect(result.includes("-")).toBe(true)

		expect(result.startsWith("foo-")).toBe(true)
	})

	it("should work with lower", () => {
		const result = slug({ upper: false, digits: false })

		expect(result).toMatch(/^[a-z]+$/)
	})

	it("should work with upper", () => {
		const result = slug({ lower: false, digits: false })

		expect(result).toMatch(/^[A-Z]+$/)
	})

	it("should work with digits", () => {
		const result = slug({ lower: false, upper: false })

		expect(result).toMatch(/^[0-9]+$/)
	})
})
