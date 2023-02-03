import { get, readable, writable } from "svelte/store"

import { describe, expect, it } from "vitest"

import { taggable } from "."

describe("taggable", () => {
	it("should be defined", () => {
		expect(taggable).toBeDefined()
	})

	it("should work with default", () => {
		const { toggled, toggle } = taggable()

		expect(get(toggled)).toBeDefined()

		expect(toggle).toBeDefined()

		expect(get(toggled)).toBe(false)

		toggle()

		expect(get(toggled)).toBe(true)

		toggle()

		expect(get(toggled)).toBe(false)

		toggle(true)

		expect(get(toggled)).toBe(true)

		toggle(false)

		expect(get(toggled)).toBe(false)
	})

	it("should work with initial value", () => {
		const { toggled, toggle } = taggable(true)

		expect(get(toggled)).toBeDefined()

		expect(toggle).toBeDefined()

		expect(get(toggled)).toBe(true)

		toggle()

		expect(get(toggled)).toBe(false)

		toggle()

		expect(get(toggled)).toBe(true)

		toggle(false)

		expect(get(toggled)).toBe(false)

		toggle(true)

		expect(get(toggled)).toBe(true)
	})

	it("should work with writable", () => {
		const value = writable(false)

		const toggle = taggable(value)

		expect(get(value)).toBeDefined()

		expect(toggle).toBeDefined()

		expect(get(value)).toBe(false)

		toggle()

		expect(get(value)).toBe(true)

		toggle()

		expect(get(value)).toBe(false)

		toggle(true)

		expect(get(value)).toBe(true)

		toggle(false)

		expect(get(value)).toBe(false)
	})
	it("should work with readable", () => {
		const value = readable(false)

		const { toggled, toggle } = taggable(value)

		expect(get(toggled)).toBeDefined()

		expect(toggle).toBeDefined()

		expect(get(toggled)).toBe(false)

		toggle()

		expect(get(toggled)).toBe(true)

		toggle()

		expect(get(toggled)).toBe(false)

		toggle(true)

		expect(get(toggled)).toBe(true)

		toggle(false)

		expect(get(toggled)).toBe(false)
	})
})
