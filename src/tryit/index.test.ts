import { beforeEach, describe, expect, it, vitest } from "vitest"

import { atryit, tryit } from "."

describe("tryit", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})
	it("should work atryit", async () => {
		async function fn() {
			return "hello"
		}

		const { result, error } = await atryit(fn)()

		expect(result).toBe("hello")

		expect(error).toBe(null)
	})

	it("should work atryit with error", async () => {
		async function fn() {
			throw new Error("hello")
		}

		const Fnx = atryit(fn)

		const { result, error } = await Fnx()

		expect(result).toBe(null)

		expect(error).toBeInstanceOf(Error)

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(error?.message).toBe("hello")
	})
	it("should work tryit", () => {
		function fn() {
			return "hello"
		}

		const { result, error } = tryit(fn)()

		expect(result).toBe("hello")

		expect(error).toBe(null)
	})

	it("should work atryit with error", () => {
		function fn() {
			throw new Error("hello")
		}

		const Fnx = tryit(fn)

		const { result, error } = Fnx()

		expect(result).toBe(null)

		expect(error).toBeInstanceOf(Error)

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(error?.message).toBe("hello")
	})
})
