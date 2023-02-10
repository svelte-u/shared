import { describe, expect, it } from "vitest"

import { chain } from "."

describe("chain", () => {
	it("should be defined", () => {
		expect(chain).toBeDefined()
	})

	it("should work", () => {
		const genesis = () => 0
		const add_five = (num: number) => num + 5
		const two_times = (num: number) => num * 2

		const chained = chain(genesis, add_five, two_times)

		expect(chained()).toBe(10)
	})

	it("should work with multiple arguments", () => {
		const genesis = (a: number, b: number) => a + b
		const add_five = (num: number) => num + 5
		const two_times = (num: number) => num * 2

		const chained = chain(genesis, add_five, two_times)

		expect(chained(1, 2)).toBe(16)
	})

	it("should work with multiple arguments and multiple chains", () => {
		const genesis = (a: number, b: number) => a + b
		const add_five = (num: number) => num + 5
		const two_times = (num: number) => num * 2

		const chained = chain(genesis, add_five)
		const chained2 = chain(chained, two_times)

		expect(chained2(1, 2)).toBe(16)
	})
})
