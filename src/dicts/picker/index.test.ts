import { describe, expect, it } from "vitest"

import { picker } from "."

describe("picker", () => {
	it("should be defined", () => {
		expect(picker).toBeDefined()
	})

	it("should work", () => {
		const obj = {
			foo: "foo",
			bar: "bar",
			baz: "baz",
		}

		const { foo, bar } = picker(obj, ["foo", "bar"])

		expect(foo).toEqual("foo")

		expect(bar).toEqual("bar")

		expect(picker({ a: 1, b: 2, c: 3 }, ["a", "b"])).toEqual({
			a: 1,
			b: 2,
		})

		expect(picker({ a: 1, b: 2, c: undefined }, ["a", "b"], true)).toEqual({
			a: 1,
			b: 2,
		})
	})
})
