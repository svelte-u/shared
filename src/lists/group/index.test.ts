import { describe, expect, it } from "vitest"

import { group } from "."

describe("group", () => {
	it("should be defined", () => {
		expect(group).toBeDefined()
	})

	it("should work", () => {
		const fish = [
			{
				name: "Marlin",
				source: "ocean",
			},
			{
				name: "Bass",
				source: "lake",
			},
			{
				name: "Trout",
				source: "lake",
			},
		]

		expect(group(fish, (f) => f.source)).toEqual({
			ocean: [{ name: "Marlin", source: "ocean" }],
			lake: [
				{ name: "Bass", source: "lake" },
				{ name: "Trout", source: "lake" },
			],
		})
	})
})
