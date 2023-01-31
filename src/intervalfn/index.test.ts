import { beforeEach, describe, expect, it, vitest } from "vitest"

import { intervalfn } from "."
import { unstore } from "../unstore"

describe("intervalfn", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should interval", () => {
		const spy = vitest.fn()

		intervalfn(() => {
			spy()
		}, 1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(2)
	})

	it("should interval with immediate off", () => {
		const spy = vitest.fn()

		const interval = intervalfn(
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
