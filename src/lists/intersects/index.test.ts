import { describe, expect, it } from "vitest"

import { intersects } from "."

describe("intersects", () => {
	it("should be defined", () => {
		expect(intersects).toBeDefined()
	})

	it("should work", () => {
		const actors = ["Tom Cruise", "Brad Pitt", "Leonardo DiCaprio"]

		const singers = ["Lady Gaga", "Adele"]

		const [result, intersectingItems] = intersects(actors, singers)

		expect(result).toBe(false)

		expect(intersectingItems).toEqual([])

		singers.push("Brad Pitt")

		const [result2, intersectingItems2] = intersects(actors, singers)

		expect(result2).toBe(true)

		expect(intersectingItems2).toEqual(["Brad Pitt"])
	})

	it("should work with custom fn", () => {
		const actors = [
			{ name: "Tom Cruise", age: 58 },
			{ name: "Brad Pitt", age: 57 },
			{ name: "Leonardo DiCaprio", age: 46 },
		]

		const singers = [
			{ name: "Lady Gaga", age: 35 },
			{ name: "Adele", age: 33 },
		]

		const [result, intersectingItems] = intersects(actors, singers, {
			fn: (item) => item.name,
		})

		expect(result).toBe(false)

		expect(intersectingItems).toEqual([])

		singers.push({ name: "Brad Pitt", age: 57 })

		const [result2, intersectingItems2] = intersects(actors, singers, {
			fn: (item) => item.name,
		})

		expect(result2).toBe(true)

		expect(intersectingItems2).toEqual([{ name: "Brad Pitt", age: 57 }])
	})
})
