import { describe, expect, it, vitest } from "vitest"

import { on_destroy } from "."

describe("on_destroy", () => {
	it("should be defined", () => {
		expect(on_destroy).toBeDefined()
	})

	it("should work", () => {
		const fn = vitest.fn()

		const destroyed = on_destroy(fn)

		expect(fn).not.toHaveBeenCalled()

		expect(destroyed).toBe(false)
	})
})
