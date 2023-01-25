import { beforeEach, describe, expect, it, vitest } from "vitest"

import { debounce } from "."

describe("debounce", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})
	it("should debounce", () => {
		let result

		const sum_debounce = debounce((a: number, b: number) => {
			result = a + b
		}, 1)

		sum_debounce(1, 2)

		vitest.advanceTimersByTime(1000)

		expect(result).toBe(3)
	})
})
