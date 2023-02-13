import { describe, expect, it } from "vitest"

import { sort } from "."

describe("sort", () => {
	it("should be defined", () => {
		expect(sort).toBeDefined()
	})

	it("should work dict base list", () => {
		const People = [
			{ Name: 5, Surname: "Surname" },
			{ Name: 1, Surname: "ZZZ" },
			{ Name: 10, Surname: "AAA" },
		]

		expect(sort(People, "Name")).toEqual([
			{ Name: 1, Surname: "ZZZ" },
			{ Name: 5, Surname: "Surname" },
			{ Name: 10, Surname: "AAA" },
		])

		expect(sort(People, "-Name")).toEqual([
			{ Name: 10, Surname: "AAA" },
			{ Name: 5, Surname: "Surname" },
			{ Name: 1, Surname: "ZZZ" },
		])

		expect(sort(People, "Surname")).toEqual([
			{ Name: 10, Surname: "AAA" },
			{ Name: 5, Surname: "Surname" },
			{ Name: 1, Surname: "ZZZ" },
		])

		expect(sort(People, "-Surname")).toEqual([
			{ Name: 1, Surname: "ZZZ" },
			{ Name: 5, Surname: "Surname" },
			{ Name: 10, Surname: "AAA" },
		])
	})
})
