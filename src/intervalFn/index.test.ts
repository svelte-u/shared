import { beforeEach, describe, expect, it, vitest } from "vitest"

import { intervalFn } from "."
import { unstore } from "../utils"

describe("intervalFn", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should interval", () => {
		const spy = vitest.fn()

		intervalFn(() => {
			spy()
		}, 1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(2)
	})

	it("should interval with immediate off", () => {
		const spy = vitest.fn()

		const interval = intervalFn(
			() => {
				spy()
			},
			1,
			{ immediate: false }
		)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(0)

		expect(unstore(interval.active)).toBe(false)

		interval.resume()

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)

		expect(unstore(interval.active)).toBe(true)

		interval.pause()

		vitest.advanceTimersByTime(2000)

		expect(spy).toHaveBeenCalledTimes(1)
	})
})
