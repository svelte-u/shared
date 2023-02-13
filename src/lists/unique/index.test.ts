import { describe, expect, it } from "vitest"

import { unique } from "."

describe("unique", () => {
	it("should be defined", () => {
		expect(unique).toBeDefined()
	})

	it("should work", () => {
		// list of famous video games
		const games = [
			{
				name: "Super Mario Bros.",
				year: 1985,
			},
			{
				name: "Contra",
				year: 1987,
			},
			{
				name: "Super Mario Bros.",
				year: 1993,
			},
			{
				name: "Contra",
				year: 1990,
			},
		]

		expect(unique(games, (g) => g.name)).toEqual([
			{
				name: "Super Mario Bros.",
				year: 1985,
			},
			{
				name: "Contra",
				year: 1987,
			},
		])
	})
})
