import { describe, expect, it } from "vitest"

import { strftime } from "."

describe("strftime", () => {
	it("should be defined", () => {
		expect(strftime).toBeDefined()
	})
	it("should work with default", () => {
		const date = new Date("2021-01-01T00:00:00.000Z")

		const result = strftime(date, "%Y-%m-%d %H:%M:%S")

		expect(result).toMatchInlineSnapshot('"2021-01-01 3:00:00"')
	})

	it("should work current local", () => {
		const date = new Date("2021-01-01T00:00:00.000Z")

		const result = strftime(date, "%c")

		expect(result).toMatchInlineSnapshot('"1/1/2021, 3:00:00 AM"')
	})

	it("should work with local and timezone", () => {
		const date = new Date("2021-01-01T00:00:00.000Z")

		const result = strftime(date, "%c", {
			locales: "ja-JP",
			timeZone: "Asia/Tokyo",
		})

		expect(result).toMatchInlineSnapshot('"2021/1/1 9:00:00"')
	})

	it("should work with fully locals", () => {
		const date = new Date("2021-01-01T00:00:00.000Z")

		const result = strftime(date, "%c", {
			locales: "ja-JP",
			timeZone: "Asia/Tokyo",
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZoneName: "short",
		})

		expect(result).toMatchInlineSnapshot('"2021年1月1日金曜日 9:00:00 JST"')

		const de_result = strftime(date, "%c", {
			locales: "de-DE",
			timeZone: "Europe/Berlin",
			weekday: "short",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZoneName: "short",
		})

		expect(de_result).toMatchInlineSnapshot(
			'"Fr., 1. Januar 2021 um 1:00:00 MEZ"'
		)
	})
})
