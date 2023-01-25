import { beforeEach, describe, expect, it, vitest } from "vitest"

import { throttle } from "."

describe("throttle", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})
	it("should throttle", () => {
		const spy = vitest.fn()

		const filter = throttle(spy, 1)

		filter()
		filter()
		filter()
		filter()
		filter()
		filter()

		vitest.advanceTimersByTime(2000)

		filter()

		expect(spy).toHaveBeenCalledTimes(2)
	})
})
