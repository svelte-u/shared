import { describe, expect, it } from "vitest"

import { objectUrl } from "."

describe("objectUrl", () => {
	it("should be defined", () => {
		expect(objectUrl).toBeDefined()
	})

	it("should return a URL", () => {
		const url = objectUrl(new Blob())

		expect(url).toContain("blob")
	})
})
