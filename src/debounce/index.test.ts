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

	it("should debounce with max_wait", () => {
		let result

		const sum_debounce = debounce(
			(a: number, b: number) => {
				result = a + b
			},
			1,
			{ maxWait: 2 }
		)

		sum_debounce(1, 2)

		vitest.advanceTimersByTime(1000)

		expect(result).toBe(3)

		vitest.advanceTimersByTime(1000)

		expect(result).toBe(3)
	})

	it("should debounce with max_wait and use the max_wait value", () => {
		let result

		const sum_debounce = debounce(
			(a: number, b: number) => {
				result = a + b
			},
			4,
			{ maxWait: 2 }
		)

		sum_debounce(1, 2)

		vitest.advanceTimersByTime(2000)

		expect(result).toBe(3)
	})
})
