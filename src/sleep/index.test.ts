import { describe, expect, it } from "vitest"

import { sleep } from "."

describe("sleep", () => {
	it("should be defined", () => {
		expect(sleep).toBeDefined()
	})

	it("should work", async () => {
		let counter = 0

		setTimeout(() => counter++, 10)

		await sleep(0.01)

		expect(counter).toBe(1)

		setTimeout(() => counter++, 20)

		await sleep(0.01)

		expect(counter).toBe(1)
	})

	it("should throw timeout", async () => {
		await sleep(0.01, true).catch((error) => {
			expect(error).toBe("Timeout")
		})

		await sleep(0.01, true, "Custom reason").catch((error) => {
			expect(error).toBe("Custom reason")
		})
	})
})
