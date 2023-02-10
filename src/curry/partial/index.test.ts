import { describe, expect, it } from "vitest"

import { partial } from "."

describe("partial", () => {
	it("should be defined", () => {
		expect(partial).toBeDefined()
	})

	it("should work", () => {
		const add = (a: number, b: number) => a + b
		const add_one = partial(add, 1)

		expect(add_one(2)).toBe(3)
	})

	it("should work with multiple arguments", () => {
		const add = (a: number, b: number, c: number) => a + b + c
		const add_one = partial(add, 1, 2)

		expect(add_one(3)).toBe(6)
	})

	it("should work with multiple arguments and multiple partials", () => {
		const add = (a: number, b: number, c: number) => a + b + c

		const add_one = partial(add, 1)

		const add_two = partial(add_one, 2)

		expect(add_two(3)).toBe(6)
	})
})
