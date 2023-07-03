import { beforeEach, describe, expect, it, vitest } from "vitest"

import { createFilterWrapper, debounceFilter, throttleFilter } from "."

describe("utils/filters", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should debounce", () => {
		const spy = vitest.fn()

		const filter = createFilterWrapper(debounceFilter(1), spy)

		setTimeout(filter, 200)

		vitest.advanceTimersByTime(1300)

		expect(spy).toHaveBeenCalled()
	})

	it("should debounce twice", () => {
		const spy = vitest.fn()

		const filter = createFilterWrapper(debounceFilter(0.5), spy)

		setTimeout(filter, 500)

		vitest.advanceTimersByTime(500)

		setTimeout(filter, 1000)

		vitest.advanceTimersByTime(2000)

		expect(spy).toHaveBeenCalledTimes(2)
	})

	it("should throttle", () => {
		const spy = vitest.fn()
		const filter = createFilterWrapper(throttleFilter(1), spy)

		setTimeout(filter, 500)
		setTimeout(filter, 500)
		setTimeout(filter, 500)
		setTimeout(filter, 500)

		vitest.runAllTimers()

		expect(spy).toHaveBeenCalledTimes(2)
	})

	it("should throttle evenly", () => {
		const spy = vitest.fn()
		const filter = createFilterWrapper(throttleFilter(1), spy)

		setTimeout(() => filter(1), 500)

		setTimeout(() => filter(2), 1000)

		setTimeout(() => filter(3), 2000)

		vitest.advanceTimersByTime(600)
		expect(spy).toHaveBeenCalledTimes(1)

		vitest.advanceTimersByTime(900)
		expect(spy).toHaveBeenCalledTimes(2)

		vitest.advanceTimersByTime(1000)
		expect(spy).toHaveBeenCalledTimes(3)
	})

	it("should not duplicate single event", () => {
		const spy = vitest.fn()

		const filter = createFilterWrapper(throttleFilter(1), spy)

		setTimeout(filter, 500)

		vitest.runAllTimers()

		expect(spy).toHaveBeenCalledTimes(1)
	})
})
