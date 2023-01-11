import { readable, writable } from "svelte/store"

import { describe, expect, it } from "vitest"

import {
	browser,
	is_array,
	is_boolean,
	is_date,
	is_empty,
	is_equal,
	is_function,
	is_number,
	is_object,
	is_partial_writable,
	is_readable,
	is_readable_only,
	is_set,
	is_store,
	is_string,
	is_symbol,
	is_window,
	is_writable,
	is_ws,
} from "."

describe("utils/is", () => {
	it("shouldn't be a browser", () => {
		expect(browser).toBeFalsy()
	})

	it("shouldn't be a websocket", () => {
		expect(is_ws).toBeFalsy()
	})

	it("should be a set", () => {
		expect(is_set(new Set())).toBeTruthy()
	})

	it("should be a boolean", () => {
		expect(is_boolean(true)).toBeTruthy()

		expect(is_boolean(false)).toBeTruthy()

		expect(is_boolean(0)).toBeFalsy()

		expect(is_boolean(1)).toBeFalsy()

		expect(is_boolean("")).toBeFalsy()

		expect(is_boolean("true")).toBeFalsy()

		expect(is_boolean("false")).toBeFalsy()

		expect(is_boolean(null)).toBeFalsy()
	})

	it("should be a function", () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(is_function(() => {})).toBeTruthy()

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(is_function(function () {})).toBeTruthy()

		expect(is_function("")).toBeFalsy()

		expect(is_function(0)).toBeFalsy()

		expect(is_function(null)).toBeFalsy()
	})

	it("should be a number", () => {
		expect(is_number(0)).toBeTruthy()

		expect(is_number(1)).toBeTruthy()

		expect(is_number(3.14)).toBeTruthy()

		expect(is_number("")).toBeFalsy()

		expect(is_number(null)).toBeFalsy()
	})

	it("should be a string", () => {
		expect(is_string("")).toBeTruthy()

		expect(is_string("hello")).toBeTruthy()

		expect(is_string(0)).toBeFalsy()

		expect(is_string(null)).toBeFalsy()
	})

	it("should be an object", () => {
		expect(is_object({})).toBeTruthy()

		expect(is_object({ foo: "bar" })).toBeTruthy()

		expect(is_object([])).toBeFalsy()

		expect(is_object(null)).toBeFalsy()
	})

	it("should be an array", () => {
		expect(is_array([])).toBeTruthy()

		expect(is_array([1, 2, 3])).toBeTruthy()

		expect(is_array({})).toBeFalsy()

		expect(is_array(null)).toBeFalsy()
	})

	it("should be a date", () => {
		expect(is_date(new Date())).toBeTruthy()

		expect(is_date(new Date(0))).toBeTruthy()

		expect(is_date({})).toBeFalsy()

		expect(is_date(null)).toBeFalsy()
	})

	it("should be a symbol", () => {
		expect(is_symbol(Symbol())).toBeTruthy()

		expect(is_symbol(Symbol("foo"))).toBeTruthy()

		expect(is_symbol({})).toBeFalsy()

		expect(is_symbol(null)).toBeFalsy()
	})

	it("shouldn't be a window", () => {
		expect(is_window({})).toBeFalsy()

		expect(is_window(null)).toBeFalsy()
	})

	it("should be a readable", () => {
		expect(is_readable(readable(1))).toBeTruthy()

		expect(is_readable(writable(1))).toBeTruthy()
	})

	it("should be a writable", () => {
		expect(is_writable(writable(1))).toBeTruthy()

		expect(is_writable(readable(1))).toBeFalsy()
	})

	it("should be a partial writable", () => {
		expect(is_partial_writable(writable(1))).toBeTruthy()

		expect(is_partial_writable(readable(1))).toBeFalsy()
	})

	it("should be a readable only", () => {
		expect(is_readable_only(readable(1))).toBeTruthy()

		expect(is_readable_only(writable(1))).toBeFalsy()
	})

	it("should be a store", () => {
		expect(is_store(readable(1))).toBeTruthy()

		expect(is_store(writable(1))).toBeTruthy()

		expect(is_store({})).toBeFalsy()

		expect(is_store(null)).toBeFalsy()
	})

	it("should be empty", () => {
		expect(is_empty("")).toBeTruthy()

		expect(is_empty([])).toBeTruthy()

		expect(is_empty({})).toBeTruthy()

		expect(is_empty(new Set())).toBeTruthy()

		expect(is_empty(new Map())).toBeTruthy()

		expect(is_empty(new Date())).toBeFalsy()
	})

	it("should be equal", () => {
		expect(is_equal(1, 1)).toBeTruthy()

		expect(is_equal(1, 2)).toBeFalsy()

		expect(is_equal("foo", "foo")).toBeTruthy()

		expect(is_equal("foo", "bar")).toBeFalsy()

		expect(is_equal([1, 2, 3], [1, 2, 3])).toBeTruthy()

		expect(is_equal([1, 2, 3], [1, 2, 4])).toBeFalsy()

		expect(is_equal({ foo: "bar" }, { foo: "bar" })).toBeTruthy()

		expect(is_equal({ foo: "bar" }, { foo: "baz" })).toBeFalsy()
	})
})
