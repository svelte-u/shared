import { describe, expect, it } from "vitest"

import { select } from "."

describe("select", () => {
	it("should be defined", () => {
		expect(select).toBeDefined()
	})

	it("should work", () => {
		const actors = [
			{
				name: "Tom Cruise",
				age: 58,
			},
			{
				name: "Tom Hanks",
				age: 64,
			},
			{
				name: "Tom Hardy",
				age: 43,
			},
		]

		expect(select(actors, (a) => a.name)).toEqual([
			"Tom Cruise",
			"Tom Hanks",
			"Tom Hardy",
		])

		expect(
			select(
				actors,
				(a) => a.name,
				(a) => a.age > 50
			)
		).toEqual(["Tom Cruise", "Tom Hanks"])
	})
})
