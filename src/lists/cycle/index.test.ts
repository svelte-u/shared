import { readable, writable } from "svelte/store"

import { describe, expect, it } from "vitest"

import { cycle } from "."
import { unstore } from "../../utils"

describe("cycle", () => {
	it("should work with array", () => {
		const { state, next, prev, index } = cycle(["foo", "bar", "fooBar"])

		expect(unstore(state)).toBe("foo")
		expect(unstore(index)).toBe(0)

		next()

		expect(unstore(state)).toBe("bar")
		expect(unstore(index)).toBe(1)

		prev()

		expect(unstore(state)).toBe("foo")
		expect(unstore(index)).toBe(0)
	})

	it("should work with writable store", () => {
		const list = writable(["foo", "bar", "fooBar"])

		const { state, next, prev, index } = cycle(list)

		expect(unstore(state)).toBe("foo")
		expect(unstore(index)).toBe(0)

		next()

		expect(unstore(state)).toBe("bar")
		expect(unstore(index)).toBe(1)

		prev()

		expect(unstore(state)).toBe("foo")
		expect(unstore(index)).toBe(0)
	})

	it("should work with readable store", () => {
		const list = readable(["foo", "bar", "fooBar"])

		const { state, next, prev, index } = cycle(list)

		expect(unstore(state)).toBe("foo")
		expect(unstore(index)).toBe(0)

		next()

		expect(unstore(state)).toBe("bar")
		expect(unstore(index)).toBe(1)

		prev()

		expect(unstore(state)).toBe("foo")
		expect(unstore(index)).toBe(0)
	})

	describe("when list empty", () => {
		it("returns the correctly data", () => {
			const list = readable([])

			const { state, index, next } = cycle(list)

			next(2)

			expect(unstore(state)).toBeUndefined()
			expect(unstore(index)).toBe(2)
		})
	})
})
