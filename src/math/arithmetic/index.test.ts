import { describe, expect, it } from "vitest"

import { average, divide, max, min, multiply, subtract, sum } from "."

describe("arithmetic", () => {
	it("should be defined", () => {
		expect(sum).toBeDefined()
		expect(subtract).toBeDefined()
		expect(multiply).toBeDefined()
		expect(divide).toBeDefined()
		expect(average).toBeDefined()
		expect(max).toBeDefined()
		expect(min).toBeDefined()
	})

	it("should Sum", () => {
		expect(sum(1, 2)).toMatchInlineSnapshot("3")

		expect(sum("1", "2")).toMatchInlineSnapshot("3")

		expect(sum("1", 2)).toMatchInlineSnapshot("3")

		expect(sum(1, "2")).toMatchInlineSnapshot("3")

		expect(sum([1, 2, 3])).toMatchInlineSnapshot("6")

		expect(sum(["1", 2, 3])).toMatchInlineSnapshot("6")

		expect(sum([1, "2", 3])).toMatchInlineSnapshot("6")

		expect(sum([1, 2, "3"])).toMatchInlineSnapshot("6")

		expect(sum(["1", "2", "3"])).toMatchInlineSnapshot("6")

		expect(sum([1, 2, 3], [4, 5, 6])).toMatchInlineSnapshot("21")

		expect(sum(["1", "2", "3"], [4, 5, 6])).toMatchInlineSnapshot("21")

		expect(sum(["1", "2", "3"], ["4", 5, 6])).toMatchInlineSnapshot("21")

		expect(sum(["1", "2", "3"], ["4", "5", 6])).toMatchInlineSnapshot("21")

		expect(sum(["1", "2", "3"], ["4", "5", "6"])).toMatchInlineSnapshot(
			"21"
		)

		expect(sum([1, 2, 3], [4, 5, 6], [7, 8, 9])).toMatchInlineSnapshot("45")

		expect(
			sum([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])
		).toMatchInlineSnapshot("78")

		expect(
			sum([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15])
		).toMatchInlineSnapshot("120")
	})

	it("should Subtract", () => {
		expect(subtract(1, 2)).toBe(-1)

		expect(subtract("1", "2")).toBe(-1)

		expect(subtract("1", 2)).toBe(-1)

		expect(subtract(1, "2")).toBe(-1)

		expect(subtract([1, 2, 3])).toBe(-4)

		expect(subtract(["1", 2, 3])).toBe(-4)

		expect(subtract([1, "2", 3])).toBe(-4)

		expect(subtract([1, 2, "3"])).toBe(-4)

		expect(subtract(["1", "2", "3"])).toBe(-4)

		expect(subtract([1, 2, 3], [4, 5, 6])).toBe(-19)

		expect(subtract(["1", "2", "3"], [4, 5, 6])).toBe(-19)

		expect(subtract(["1", "2", "3"], ["4", 5, 6])).toBe(-19)

		expect(subtract(["1", "2", "3"], ["4", "5", 6])).toBe(-19)

		expect(subtract(["1", "2", "3"], ["4", "5", "6"])).toBe(-19)

		expect(subtract([1, 2, 3], [4, 5, 6], [7, 8, 9])).toBe(-43)

		expect(subtract([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])).toBe(
			-76
		)

		expect(
			subtract(
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[10, 11, 12],
				[13, 14, 15]
			)
		).toBe(-118)
	})

	it("should Multiply", () => {
		expect(multiply(1, 2)).toBe(2)

		expect(multiply("1", "2")).toBe(2)

		expect(multiply("1", 2)).toBe(2)

		expect(multiply(1, "2")).toBe(2)

		expect(multiply([1, 2, 3])).toBe(6)

		expect(multiply(["1", 2, 3])).toBe(6)

		expect(multiply([1, "2", 3])).toBe(6)

		expect(multiply([1, 2, "3"])).toBe(6)

		expect(multiply(["1", "2", "3"])).toBe(6)

		expect(multiply([1, 2, 3], [4, 5, 6])).toBe(720)

		expect(multiply(["1", "2", "3"], [4, 5, 6])).toBe(720)

		expect(multiply(["1", "2", "3"], ["4", 5, 6])).toBe(720)

		expect(multiply(["1", "2", "3"], ["4", "5", 6])).toBe(720)

		expect(multiply(["1", "2", "3"], ["4", "5", "6"])).toBe(720)

		expect(multiply([1, 2, 3], [4, 5, 6], [7, 8, 9])).toBe(362880)

		expect(multiply([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])).toBe(
			479001600
		)

		expect(
			multiply(
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[10, 11, 12],
				[13, 14, 15]
			)
		).toBe(1307674368000)
	})

	it("should Divide", () => {
		expect(divide(1, 2)).toBe(0.5)

		expect(divide("1", "2")).toBe(0.5)

		expect(divide("1", 2)).toBe(0.5)

		expect(divide(1, "2")).toBe(0.5)

		expect(divide([1, 2, 3])).toBe(0.16666666666666666)

		expect(divide(["1", 2, 3])).toBe(0.16666666666666666)

		expect(divide([1, "2", 3])).toBe(0.16666666666666666)

		expect(divide([1, 2, "3"])).toBe(0.16666666666666666)

		expect(divide(["1", "2", "3"])).toBe(0.16666666666666666)

		expect(divide([1, 2, 3], [4, 5, 6])).toBe(0.001388888888888889)

		expect(divide(["1", "2", "3"], [4, 5, 6])).toBe(0.001388888888888889)

		expect(divide(["1", "2", "3"], ["4", 5, 6])).toBe(0.001388888888888889)

		expect(divide(["1", "2", "3"], ["4", "5", 6])).toBe(
			0.001388888888888889
		)

		expect(divide(["1", "2", "3"], ["4", "5", "6"])).toBe(
			0.001388888888888889
		)

		expect(divide([1, 2, 3], [4, 5, 6], [7, 8, 9])).toBe(
			0.0000027557319223985893
		)

		expect(divide([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])).toBe(
			2.08767569878681e-9
		)

		expect(
			divide([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15])
		).toBe(7.647163731819817e-13)
	})

	it("should Average", () => {
		expect(average(1, 2)).toBe(1.5)

		expect(average("1", "2")).toBe(1.5)

		expect(average("1", 2)).toBe(1.5)

		expect(average(1, "2")).toBe(1.5)

		expect(average([1, 2, 3])).toBe(2)

		expect(average(["1", 2, 3])).toBe(2)

		expect(average([1, "2", 3])).toBe(2)

		expect(average([1, 2, "3"])).toBe(2)

		expect(average(["1", "2", "3"])).toBe(2)

		expect(average([1, 2, 3], [4, 5, 6])).toBe(3.5)

		expect(average(["1", "2", "3"], [4, 5, 6])).toBe(3.5)
	})

	it("should Max", () => {
		expect(max(1, 2)).toBe(2)

		expect(max("1", "2")).toBe(2)

		expect(max("1", 2)).toBe(2)

		expect(max(1, "2")).toBe(2)

		expect(max([1, 2, 3])).toBe(3)

		expect(max(["1", 2, 3])).toBe(3)

		expect(max([1, "2", 3])).toBe(3)

		expect(max([1, 2, "3"])).toBe(3)

		expect(max(["1", "2", "3"])).toBe(3)

		expect(max([1, 2, 3], [4, 5, 6])).toBe(6)

		expect(max(["1", "2", "3"], [4, 5, 6])).toBe(6)
	})

	it("should Min", () => {
		expect(min(1, 2)).toBe(1)

		expect(min("1", "2")).toBe(1)

		expect(min("1", 2)).toBe(1)

		expect(min(1, "2")).toBe(1)

		expect(min([1, 2, 3])).toBe(1)

		expect(min(["1", 2, 3])).toBe(1)

		expect(min([1, "2", 3])).toBe(1)

		expect(min([1, 2, "3"])).toBe(1)

		expect(min(["1", "2", "3"])).toBe(1)

		expect(min([1, 2, 3], [4, 5, 6])).toBe(1)

		expect(min(["1", "2", "3"], [4, 5, 6])).toBe(1)
	})
})
