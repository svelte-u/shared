import { readable, writable } from "svelte/store"

import { describe, expect, it, vitest } from "vitest"

import { createSingletonPromise, on_destroy, type, unstore } from "."

describe("utils/helpers", () => {
	it("should be defined", () => {
		expect(type).toBeDefined()
		expect(unstore).toBeDefined()
		expect(createSingletonPromise).toBeDefined()
		expect(on_destroy).toBeDefined()
	})

	it("should be a show type", () => {
		expect(type(readable(1))).toMatchInlineSnapshot('"object"')

		expect(type(writable(1))).toMatchInlineSnapshot('"object"')

		expect(type({})).toMatchInlineSnapshot('"object"')

		expect(type(null)).toMatchInlineSnapshot('"null"')

		expect(type(undefined)).toMatchInlineSnapshot('"undefined"')

		expect(type(new Set())).toMatchInlineSnapshot('"set"')

		expect(type("")).toMatchInlineSnapshot('"string"')

		expect(type([])).toMatchInlineSnapshot('"array"')

		expect(type(new Map())).toMatchInlineSnapshot('"map"')

		expect(type(new Date())).toMatchInlineSnapshot('"date"')
	})

	it("should be a show full type", () => {
		expect(type(readable(1), true)).toMatchInlineSnapshot(
			'"[object Object]"'
		)

		expect(type(writable(1), true)).toMatchInlineSnapshot(
			'"[object Object]"'
		)

		expect(type({}, true)).toMatchInlineSnapshot('"[object Object]"')

		expect(type(null, true)).toMatchInlineSnapshot('"[object Null]"')

		expect(type(undefined, true)).toMatchInlineSnapshot(
			'"[object Undefined]"'
		)

		expect(type(new Set(), true)).toMatchInlineSnapshot('"[object Set]"')

		expect(type("", true)).toMatchInlineSnapshot('"[object String]"')

		expect(type([], true)).toMatchInlineSnapshot('"[object Array]"')

		expect(type(new Map(), true)).toMatchInlineSnapshot('"[object Map]"')

		expect(type(new Date(), true)).toMatchInlineSnapshot('"[object Date]"')
	})

	it("default", () => {
		const v = "123.345"

		const un = unstore(v)

		expect(un).toBe("123.345")
	})

	it("writable", () => {
		const wv = writable("123.345")

		const un = unstore(wv)

		expect(un).toBe("123.345")
	})

	it("readable", () => {
		const rv = readable("123.345")

		const un = unstore(rv)

		expect(un).toBe("123.345")
	})

	it("should create singleton as promise", () => {
		const my_function = () => {
			const result = createSingletonPromise(() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve("Hello World")
					}, 1000)
				})
			})

			return {
				result,
			}
		}

		const { result } = my_function()

		expect(result()).toBeInstanceOf(Promise)
	})

	it("should destroy safely", () => {
		const fn = vitest.fn()

		const destroyed = on_destroy(fn)

		expect(fn).not.toHaveBeenCalled()

		expect(destroyed).toBe(false)
	})
})
