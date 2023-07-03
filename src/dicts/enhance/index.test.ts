import { get } from "svelte/store"

import { describe, expect, it } from "vitest"

import { enhance } from "."

describe("enhance", () => {
	it("should be defined", () => {
		expect(enhance).toBeDefined()
	})

	it("should return a dict", () => {
		const dict = enhance({})

		expect(dict).toBeDefined()

		expect(dict.subscribe).toBeDefined()

		expect(get(dict)).toEqual({})
	})

	it("should get a value", () => {
		const obj = { foo: "bar" }

		const dict = enhance(obj)

		expect(dict.get("foo")).toEqual("bar")

		expect(dict.get("bar")).toEqual(null)

		expect(dict.get("bar", "baz")).toEqual("baz")
	})

	it("should add a value", () => {
		const obj = { foo: "bar" }

		const dict = enhance(obj)

		dict.add("bar", "baz")

		expect(get(dict)).toEqual({ foo: "bar", bar: "baz" })
	})

	it("should clear the dict", () => {
		const obj = { foo: "bar" }

		const dict = enhance(obj)

		dict.clear()

		expect(get(dict)).toEqual({})
	})

	it("should check if a key exists", () => {
		const obj = { foo: "bar" }

		const dict = enhance(obj)

		expect(dict.contains("foo")).toEqual(true)

		expect(dict.contains("bar")).toEqual(false)

		dict.add("bar", "baz")

		expect(dict.contains("bar")).toEqual(true)
	})

	it("should copy the dict", () => {
		const obj = { foo: { bar: "baz", fuss: { Hi: "Bye" } } }

		const dict = enhance(obj)

		const copy = dict.copy()

		expect(get(copy)).toEqual(get(dict))

		copy.add("bar", "baz")

		expect(get(copy)).not.toEqual(get(dict))

		dict.clear()

		expect(get(copy)).not.toEqual(get(dict))

		copy.clear()

		expect(get(copy)).toEqual(get(dict))
	})

	it("should create a dict from keys", () => {
		const dict = enhance({}).fromKeys(["foo", "bar"], "baz")

		expect(get(dict)).toEqual({ foo: "baz", bar: "baz" })
	})

	it("should invert the dict", () => {
		const obj = { foo: "bar", bar: "baz" }

		const dict = enhance(obj)

		dict.invert()

		expect(get(dict)).toEqual({ bar: "foo", baz: "bar" })

		dict.invert()

		expect(get(dict)).toEqual(obj)
	})

	it("should get the keys", () => {
		const obj = { foo: "bar", bar: "baz" }

		const dict = enhance(obj)

		expect(dict.keys()).toEqual(["foo", "bar"])
	})

	it("should pop a value", () => {
		const obj = { foo: "bar", bar: "baz" }

		const dict = enhance(obj)

		expect(dict.pop("foo")).toEqual("bar")

		expect(get(dict)).toEqual({ bar: "baz" })

		expect(dict.pop("foo")).toEqual(null)

		expect(dict.pop("bar")).toEqual("baz")

		expect(get(dict)).toEqual({})
	})

	it("should pop an item", () => {
		const obj = { foo: "bar", bar: "baz" }

		const dict = enhance(obj)

		expect(dict.popitem()).toEqual(["bar", "baz"])

		expect(get(dict)).toEqual({ foo: "bar" })

		expect(dict.popitem()).toEqual(["foo", "bar"])

		expect(get(dict)).toEqual({})

		expect(dict.popitem()).toEqual(null)
	})

	it("should get the values", () => {
		const obj = { foo: "bar", bar: "baz" }

		const dict = enhance(obj)

		expect(dict.values()).toEqual(["bar", "baz"])
	})
})
