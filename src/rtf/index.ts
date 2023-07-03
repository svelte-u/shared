import type { Readable } from "svelte/store"

import { intervalFn } from "../intervalFn"
import { toWritable } from "../utils"
import { toReadable } from "../utils"
import type { RTFOptions } from "../utils"

/**
 * A helper function to format the relative time.
 *
 * @param _rtf - The relative time formatter.
 *
 * @param time - The time to format.
 *
 * @returns The formatted time.
 */
function format(_rtf: Intl.RelativeTimeFormat, time: number): string {
	const delta_seconds = Math.round((time - Date.now()) / 1000)

	// Array representing one minute, hour, day, week, month, etc in seconds
	const cutoffs = [
		60,
		3600,
		86400,
		86400 * 7,
		86400 * 30,
		86400 * 365,
		Infinity,
	]

	const units: Intl.RelativeTimeFormatUnit[] = [
		"second",
		"minute",
		"hour",
		"day",
		"week",
		"month",
		"year",
	]

	const unit_index = cutoffs.findIndex(
		(cutoff) => cutoff > Math.abs(delta_seconds)
	)

	// Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
	// is one day in seconds, so we can divide our seconds by this to get the # of days
	const divisor = unit_index ? cutoffs[unit_index - 1] : 1

	return _rtf.format(Math.floor(delta_seconds / divisor), units[unit_index])
}

/**
 * Get the relative time string from a date.
 *
 * @param date - The date to format.
 *
 * @param options - The options to use.
 * - `locale` - The locale to use.
 * - `style` - The length of the internationalized message.
 * - `numeric` - The format of output message.
 * - `interval` - The interval to update the time. Defaults to 60 seconds.
 *
 * @example
 * ```ts
 * rtf(new Date()) // "in 1 minute"
 *
 * rtf(new Date(Date.now() - 1000 * 60 * 60 * 24)) // "1 day ago"
 *
 * rtf(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), {
 * 	locale: "ar",
 * }) // "بعد سنة"
 * ```
 *
 * @returns The relative time string.
 */
export function rtf(
	date: Date | number,
	options: RTFOptions = {}
): Readable<string> {
	const {
		locale = "en",
		style = "long",
		numeric = "auto",
		interval = 60,
	} = options

	const _rtf = new Intl.RelativeTimeFormat(locale, {
		style,
		numeric,
	})

	const time = typeof date === "number" ? date : date.getTime()

	const formatted = toWritable(format(_rtf, time))

	intervalFn(() => formatted.set(format(_rtf, time)), interval)

	return toReadable(formatted)
}
