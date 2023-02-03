import { get } from "svelte/store"

import { beforeEach, describe, expect, it, vitest } from "vitest"

import { timeout } from "."

describe("timeout", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})
	it("should be defined", () => {
		expect(timeout).toBeDefined()
	})

	it("should work", () => {
		const ready = timeout()

		expect(get(ready)).toEqual(false)

		vitest.advanceTimersByTime(1000)

		expect(get(ready)).toEqual(true)
	})

	it("should work with controls", () => {
		const { pending, ready, stop, start } = timeout(1, {
			controls: true,
		})

		expect(get(ready)).toEqual(false)

		stop()

		expect(get(ready)).toEqual(true)

		expect(get(pending)).toEqual(false)

		start()

		expect(get(ready)).toEqual(false)

		expect(get(pending)).toEqual(true)
	})

	it("should work with controls and callback", () => {
		const spy = vitest.fn()

		const { pending, ready, stop, start } = timeout(1, {
			controls: true,
			callback: spy,
		})

		expect(get(ready)).toEqual(false)

		expect(spy).toHaveBeenCalledTimes(0)

		stop()

		expect(get(ready)).toEqual(true)

		expect(get(pending)).toEqual(false)

		start()

		expect(get(ready)).toEqual(false)

		expect(get(pending)).toEqual(true)

		expect(spy).toHaveBeenCalledTimes(0)

		vitest.advanceTimersByTime(1000)

		expect(get(ready)).toEqual(true)

		expect(get(pending)).toEqual(false)

		expect(spy).toHaveBeenCalledTimes(1)
	})
})
