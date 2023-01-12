import { get, readable, writable } from "svelte/store"

import { describe, expect, it } from "vitest"

import { to_readable } from "."
import { is_readable_only } from "../utils"

describe("to_readable", () => {
	it("should be defined", () => {
		expect(to_readable).toBeDefined()
	})

	it("default", () => {
		const w = "123.345"

		const r = to_readable(w)

		expect(is_readable_only(r)).toBeTruthy()
	})

	it("writable", () => {
		const w = writable("123.345")

		const r = to_readable(w)

		expect(is_readable_only(r)).toBeTruthy()
	})

	it("readable", () => {
		const r = readable("123.345")

		const r2 = to_readable(r)

		expect(is_readable_only(r2)).toBeTruthy()
	})

	it("value", () => {
		const w = "123.345"

		const r = to_readable(w)

		expect(get(r)).toBe("123.345")
	})
})
