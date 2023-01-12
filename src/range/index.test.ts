import { describe, expect, it } from "vitest"

import { range } from "."

describe("range", () => {
	it("should be defined", () => {
		expect(range).toBeDefined()
	})

	it("should work", () => {
		const items: number[] = []
		for (const item of range(0, 4)) items.push(item)
		expect(items).toEqual([0, 1, 2, 3, 4])
	})

	it("should work with negative numbers", () => {
		const items: number[] = []
		for (const item of range(-2, 2)) items.push(item)
		expect(items).toEqual([-2, -1, 0, 1, 2])
	})

	it("should work with negative numbers and a step", () => {
		const items: number[] = []
		for (const item of range(-2, 2, 2)) items.push(item)
		expect(items).toEqual([-2, 0, 2])
	})

	it("should work with starting value only", () => {
		const items: number[] = []
		for (const item of range(5)) items.push(item)
		expect(items).toEqual([0, 1, 2, 3, 4, 5])
	})
})
