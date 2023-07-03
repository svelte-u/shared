import { beforeEach, describe, expect, it, vitest } from "vitest"

import { timeoutFn } from "."
import { unstore } from "../utils"

describe("timeoutFn", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should timeout", () => {
		const spy = vitest.fn()

		timeoutFn(() => {
			spy()
		}, 1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)
	})

	it("should timeout with immediate off", () => {
		const spy = vitest.fn()

		const timeout = timeoutFn(
			() => {
				spy()
			},
			1,
			{ immediate: false }
		)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(0)

		expect(unstore(timeout.active)).toBe(false)

		timeout.resume()

		expect(unstore(timeout.active)).toBe(true)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)

		timeout.resume()

		expect(unstore(timeout.active)).toBe(true)

		vitest.advanceTimersByTime(0.5)

		expect(spy).toHaveBeenCalledTimes(1)

		timeout.pause()

		expect(unstore(timeout.active)).toBe(false)
	})

	it("should timeout with immediateCallback on", () => {
		const spy = vitest.fn()

		timeoutFn(
			() => {
				spy()
			},
			1,
			{ immediateCallback: true }
		)

		expect(spy).toHaveBeenCalledTimes(1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(2)
	})
})
