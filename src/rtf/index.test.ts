import { beforeEach, describe, expect, it, vitest } from "vitest"

import { rtf } from "."
import { unstore } from "../utils"

describe("rtf", () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})
	it("should work", () => {
		const date = new Date()

		const readable = rtf(date)

		expect(unstore(readable)).toBe("now")

		vitest.advanceTimersByTime(60000)

		expect(unstore(readable)).toMatchInlineSnapshot('"1 minute ago"')

		vitest.advanceTimersByTime(60000)

		expect(unstore(readable)).toMatchInlineSnapshot('"2 minutes ago"')
	})
})
