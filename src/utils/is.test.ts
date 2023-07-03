import { readable, writable } from "svelte/store"

import { describe, expect, it } from "vitest"

import {
	browser,
	isEmpty,
	isEqual,
	isFunction,
	isPartialWritable,
	isReadable,
	isReadableOnly,
	isStore,
	isWritable,
	isWs,
} from "."

describe("utils/is", () => {
	it("shouldn't be a browser", () => {
		expect(browser).toBeFalsy()
	})

	it("shouldn't be a websocket", () => {
		expect(isWs).toBeFalsy()
	})

	it("should be a function", () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isFunction(() => {})).toBeTruthy()

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isFunction(function () {})).toBeTruthy()

		expect(isFunction("")).toBeFalsy()

		expect(isFunction(0)).toBeFalsy()

		expect(isFunction(null)).toBeFalsy()
	})

	it("should be a readable", () => {
		expect(isReadable(readable(1))).toBeTruthy()

		expect(isReadable(writable(1))).toBeTruthy()
	})

	it("should be a writable", () => {
		function customWritable() {
			const { subscribe, set } = writable(1)

			return {
				subscribe,
				set,
			}
		}

		expect(isWritable(writable(1))).toBeTruthy()

		expect(isWritable(readable(1))).toBeFalsy()

		expect(isWritable(customWritable())).toBeFalsy()
	})

	it("should be a partial writable", () => {
		function customWritable() {
			const { subscribe, set } = writable(1)

			return {
				subscribe,
				set,
			}
		}

		expect(isPartialWritable(writable(1))).toBeTruthy()

		expect(isPartialWritable(readable(1))).toBeFalsy()

		expect(isPartialWritable(customWritable())).toBeTruthy()
	})

	it("should be a readable only", () => {
		function customWritable() {
			const { subscribe, set } = writable(1)

			return {
				subscribe,
				set,
			}
		}

		expect(isReadableOnly(readable(1))).toBeTruthy()

		expect(isReadableOnly(writable(1))).toBeFalsy()

		expect(isReadableOnly(customWritable())).toBeFalsy()
	})

	it("should be a store", () => {
		function customWritable() {
			const { subscribe, set } = writable(1)

			return {
				subscribe,
				set,
			}
		}

		expect(isStore(readable(1))).toBeTruthy()

		expect(isStore(writable(1))).toBeTruthy()

		expect(isStore({})).toBeFalsy()

		expect(isStore(null)).toBeFalsy()

		expect(isStore(customWritable())).toBeTruthy()
	})

	it("should be empty", () => {
		expect(isEmpty("")).toBeTruthy()

		expect(isEmpty([])).toBeTruthy()

		expect(isEmpty({})).toBeTruthy()

		expect(isEmpty(new Set())).toBeTruthy()

		expect(isEmpty(new Map())).toBeTruthy()

		expect(isEmpty(new Date())).toBeFalsy()
	})

	it("should be equal", () => {
		expect(isEqual(1, 1)).toBeTruthy()

		expect(isEqual(1, 2)).toBeFalsy()

		expect(isEqual("foo", "foo")).toBeTruthy()

		expect(isEqual("foo", "bar")).toBeFalsy()

		expect(isEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()

		expect(isEqual([1, 2, 3], [1, 2, 4])).toBeFalsy()

		expect(isEqual({ foo: "bar" }, { foo: "bar" })).toBeTruthy()

		expect(isEqual({ foo: "bar" }, { foo: "baz" })).toBeFalsy()
	})
})
