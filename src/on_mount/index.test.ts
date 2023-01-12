import { describe, expect, it, vitest } from "vitest"

import { on_mount } from "."

describe("on_mount", () => {
	it("should be defined", () => {
		expect(on_mount).toBeDefined()
	})

	it("should work", () => {
		const fn = vitest.fn()

		on_mount(fn)

		expect(fn).not.toHaveBeenCalled()
	})
})
