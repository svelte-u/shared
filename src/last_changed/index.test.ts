import { get } from "svelte/store"

import { beforeEach, describe, expect, it, vitest } from "vitest"

import { last_changed } from "."

describe("last_changed", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	it("should be defined", () => {
		expect(last_changed).toBeDefined()
	})

	it("should work", async () => {
		const { value: last_changedStore, timestamp } = last_changed("hello")

		expect(get(last_changedStore)).toEqual("hello")

		const past = +Date.now()

		last_changedStore.set("Hello World")

		expect(get(last_changedStore)).toEqual("Hello World")

		vitest.advanceTimersByTime(1000)

		expect(get(timestamp) < +Date.now()).toBeTruthy()

		expect(get(timestamp)).toBeGreaterThanOrEqual(past)
	})
})
