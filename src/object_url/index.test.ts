import { describe, expect, it } from "vitest"

import { object_url } from "."

describe("object_url", () => {
	it("should be defined", () => {
		expect(object_url).toBeDefined()
	})

	it("should return a URL", () => {
		const url = object_url(new Blob())

		expect(url).toContain("blob")
	})
})
