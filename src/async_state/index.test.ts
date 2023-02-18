import { get } from "svelte/store"

import { describe, expect, it } from "vitest"

import { async_state } from "."
import { sleep } from "../sleep"

describe("async_state", () => {
	it("should be defined", () => {
		expect(async_state).toBeDefined()
	})

	it("should return a state", async () => {
		const { state, ready, loading } = async_state(
			() => Promise.resolve(1),
			0
		)

		expect(get(state)).toBe(0)

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(true)

		await sleep(0)

		expect(get(ready)).toBe(true)

		expect(get(loading)).toBe(false)

		expect(get(state)).toBe(1)
	})

	it("should not execute immediately", async () => {
		const { state, ready, loading, execute } = async_state(
			() => Promise.resolve(1),
			0,
			{ immediate: false }
		)

		expect(get(state)).toBe(0)

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(false)

		await sleep(0)

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(false)

		expect(get(state)).toBe(0)

		await execute()

		expect(get(ready)).toBe(true)

		expect(get(loading)).toBe(false)

		expect(get(state)).toBe(1)
	})

	it("should execute with delay", async () => {
		const { state, ready, loading, execute } = async_state(
			() => Promise.resolve(1),
			0,
			{ delay: 1 }
		)

		expect(get(state)).toBe(0)

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(true)

		await sleep(0)

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(true)

		expect(get(state)).toBe(0)

		await execute(0.2)

		expect(get(ready)).toBe(true)

		expect(get(loading)).toBe(false)

		expect(get(state)).toBe(1)
	})

	it("should reset state on execute", async () => {
		const { state, ready, loading, execute } = async_state(
			() => Promise.resolve(1),
			0,
			{ reset_on_execute: true }
		)

		expect(get(state)).toBe(0)

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(true)

		await sleep(0)

		expect(get(ready)).toBe(true)

		expect(get(loading)).toBe(false)

		expect(get(state)).toBe(1)

		execute()

		expect(get(ready)).toBe(false)

		expect(get(loading)).toBe(true)

		expect(get(state)).toBe(0)
	})
})
