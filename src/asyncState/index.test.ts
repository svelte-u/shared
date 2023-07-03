import { get } from "svelte/store"

import { describe, expect, it } from "vitest"

import { asyncState } from "."
import { sleep } from "../sleep"

describe("asyncState", () => {
	it("should be defined", () => {
		expect(asyncState).toBeDefined()
	})

	it("should return a state", async () => {
		const { state, ready, loading } = asyncState(
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
		const { state, ready, loading, execute } = asyncState(
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
		const { state, ready, loading, execute } = asyncState(
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
		const { state, ready, loading, execute } = asyncState(
			() => Promise.resolve(1),
			0,
			{ resetOnExecute: true }
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
