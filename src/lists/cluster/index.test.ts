import { describe, expect, it } from "vitest"

import { cluster } from "."

describe("cluster", () => {
	it("should be defined", () => {
		expect(cluster).toBeDefined()
	})

	it("should split a list into sublists", () => {
		expect(cluster([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
			[9, 10],
		])
		expect(cluster([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { size: 3 })).toEqual([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[10],
		])
	})

	it("should return an empty array if given an empty array", () => {
		expect(cluster([])).toEqual([])
	})

	it("should return an empty array if given a size of 0", () => {
		expect(cluster([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { size: 0 })).toEqual(
			[]
		)
	})

	it("should return an array of arrays if given an array of arrays", () => {
		expect(
			cluster([
				[1, 2],
				[3, 4],
				[5, 6],
				[7, 8],
				[9, 10],
			])
		).toEqual([
			[
				[1, 2],
				[3, 4],
			],
			[
				[5, 6],
				[7, 8],
			],
			[[9, 10]],
		])
	})

	it("should return an array of arrays if given an array of arrays and a size of 3", () => {
		expect(
			cluster(
				[
					[1, 2],
					[3, 4],
					[5, 6],
					[7, 8],
					[9, 10],
				],
				{ size: 3 }
			)
		).toEqual([
			[
				[1, 2],
				[3, 4],
				[5, 6],
			],
			[
				[7, 8],
				[9, 10],
			],
		])
	})
})
