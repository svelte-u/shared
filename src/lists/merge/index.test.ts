import { describe, expect, it } from "vitest"

import { merge } from "."

describe("group", () => {
	it("should be defined", () => {
		expect(merge).toBeDefined()
	})

	it("should work", () => {
		const actors = [
			{
				name: "John",
				age: 30,
			},
			{
				name: "Jane",
				age: 25,
			},
		]

		const new_actors = [
			{
				name: "John",
				age: 31,
			},
		]

		const merged = merge(actors, new_actors, (actor) => actor.name)

		expect(merged).toEqual([
			{
				name: "John",
				age: 31,
			},
			{
				name: "Jane",
				age: 25,
			},
		])
	})
})
