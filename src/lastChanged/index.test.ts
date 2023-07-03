import { get } from "svelte/store"

import { beforeEach, describe, expect, it, vitest } from "vitest"

import { lastChanged } from "."

describe("lastChanged", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should be defined", () => {
		expect(lastChanged).toBeDefined()
	})

	it("should work", async () => {
		const { value: lastChangedStore, timestamp } = lastChanged("hello")

		expect(get(lastChangedStore)).toEqual("hello")

		const past = +Date.now()

		lastChangedStore.set("Hello World")

		expect(get(lastChangedStore)).toEqual("Hello World")

		vitest.advanceTimersByTime(1000)

		expect(get(timestamp) < +Date.now()).toBeTruthy()

		expect(get(timestamp)).toBeGreaterThanOrEqual(past)
	})
})
