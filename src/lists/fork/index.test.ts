import { describe, expect, it } from "vitest"

import { fork } from "."

describe("fork", () => {
	it("should be defined", () => {
		expect(fork).toBeDefined()
	})

	it("should work", () => {
		const gods = [
			{
				name: "Ra",
				power: 100,
			},
			{
				name: "Zeus",
				power: 98,
			},
			{
				name: "Loki",
				power: 72,
			},
			{
				name: "Vishnu",
				power: 100,
			},
		]

		const [gods1, gods2] = fork(gods, (f) => f.power > 90)

		expect(gods1).toEqual([
			{ name: "Ra", power: 100 },
			{ name: "Zeus", power: 98 },
			{ name: "Vishnu", power: 100 },
		])

		expect(gods2).toEqual([{ name: "Loki", power: 72 }])
	})
})
