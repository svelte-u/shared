import { beforeEach, describe, expect, it, vitest } from "vitest"

import { timeoutfn } from "."
import { unstore } from "../unstore"

describe("timeoutfn", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should timeout", () => {
		const spy = vitest.fn()

		timeoutfn(() => {
			spy()
		}, 1)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)
	})

	it("should timeout with immediate off", () => {
		const spy = vitest.fn()

		const timeout = timeoutfn(
			() => {
				spy()
			},
			1,
			{ immediate: false }
		)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(0)

		expect(unstore(timeout.pending)).toBe(false)

		timeout.start()

		expect(unstore(timeout.pending)).toBe(true)

		vitest.advanceTimersByTime(1000)

		expect(spy).toHaveBeenCalledTimes(1)

		timeout.start()

		expect(unstore(timeout.pending)).toBe(true)

		vitest.advanceTimersByTime(0.5)

		expect(spy).toHaveBeenCalledTimes(1)

		timeout.stop()

		expect(unstore(timeout.pending)).toBe(false)
	})
})
