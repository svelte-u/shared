import { describe, expect, it } from "vitest"

import { type } from "."

describe("type", () => {
	it("should be defined", () => {
		expect(type).toBeDefined()
	})

	it("should work", () => {
		expect(type(1)).toBe("number")

		expect(type("1")).toBe("string")

		expect(type({})).toBe("object")

		expect(type([])).toBe("array")

		expect(type(null)).toBe("null")

		expect(type(undefined)).toBe("undefined")

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(type(() => {})).toBe("function")
	})
})
