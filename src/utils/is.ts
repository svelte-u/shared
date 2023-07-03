import type { Readable, Writable } from "svelte/store"

import { type } from "./helpers"
import type { MaybeStore } from "./types"

export const browser = typeof window !== "undefined"

export const isWs = typeof WebSocket !== "undefined"

/**
 * Check if the value is a function
 *
 * @param value - The value to check
 *
 * @returns Whether the value is a function or not
 */
export function isFunction<T>(value?: T): boolean {
	return type(value, true) === "[object Function]"
}

/**
 * Check if the value is a number
 *
 * @param value - The value to check
 *
 * @returns Whether the value is a number or not
 */
function isNumber(value: unknown): value is number {
	return type(value, true) === "[object Number]"
}

/**
 * Check if the value is a date
 *
 * @param value - The value to check
 *
 * @returns Whether the value is a date or not
 */
function isDate(value: unknown): value is Date {
	return type(value, true) === "[object Date]"
}

/**
 * Check if the value is a symbol
 *
 * @param value - The value to check
 *
 * @returns Whether the value is a symbol or not
 */
function isSymbol(value: unknown): value is symbol {
	return type(value, true) === "[object Symbol]"
}

/**
 * Check if the value is readable store, if return the subscribe function
 *
 * @param value - The value to check
 *
 * @returns Whether the value is readable store or not
 */
export function isReadable<T>(value: any): value is Readable<T> {
	return value && isFunction(value?.subscribe)
}

/**
 * Check if the value is writable store, if return the set, update and subscribe function
 *
 * @param value - The value to check
 *
 * @returns Whether the value is writable store or not
 */
export function isWritable<T>(value: any): value is Writable<T> {
	return (
		value &&
		["subscribe", "set", "update"].every((n) => isFunction(value[n]))
	)
}

/**
 * Check if the value is partial writable store, if return the set and subscribe function
 *
 * @param value - The value to check
 *
 * @returns Whether the value is partial writable store or not
 *
 */
export function isPartialWritable<T>(value: any): value is Writable<T> {
	return value && ["subscribe", "set"].every((n) => isFunction(value[n]))
}

/**
 * Check if the value is readable only store, that only return the subscribe function without set and update
 *
 * @param value - The value to check
 *
 * @returns Whether the value is readable only store or not
 */
export function isReadableOnly<T>(value: any): value is Readable<T> {
	return (
		value &&
		isFunction(value?.subscribe) &&
		!isWritable(value) &&
		!isPartialWritable(value)
	)
}

/**
 * Check if the value is svelte store.
 *
 * @param value - The value to check
 *
 * @returns Whether the value is svelte store or not
 */
export function isStore<T>(value: any): value is MaybeStore<T> {
	return isReadable(value) || isWritable(value)
}

/**
 * Check if the value is empty
 *
 * @param value - The value to check
 *
 * @returns Whether the value is empty or not
 *
 */
export function isEmpty(value: unknown) {
	if (value === true || value === false) return true

	if (value === null || value === undefined) return true

	if (isNumber(value)) return value === 0

	if (isDate(value)) return isNaN(value.getTime())

	if (isFunction(value)) return false

	if (isSymbol(value)) return false

	const length = (value as any).length

	if (isNumber(length)) return length === 0

	const size = (value as any).size

	if (isNumber(size)) return size === 0

	const keys = Object.keys(value).length

	return keys === 0
}

/**
 * check if the two values are equal
 *
 * @param x - The first value to check
 *
 * @param y - The second value to check
 *
 * @returns Whether the two values are equal or not
 */
export function isEqual<T, U>(x: T, y: U): boolean {
	if (Object.is(x, y)) return true

	if (x instanceof Date && y instanceof Date)
		return x.getTime() === y.getTime()

	if (x instanceof RegExp && y instanceof RegExp)
		return x.toString() === y.toString()

	if (
		typeof x !== "object" ||
		x === null ||
		typeof y !== "object" ||
		y === null
	) {
		return false
	}

	const keysX = Reflect.ownKeys(x as unknown as object)

	const keysY = Reflect.ownKeys(y as unknown as object)

	if (keysX.length !== keysY.length) return false

	for (let i = 0; i < keysX.length; i++) {
		if (!Reflect.has(y as unknown as object, keysX[i])) return false
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//   @ts-ignore
		if (!isEqual(x[keysX[i]], y[keysX[i]])) return false
	}
	return true
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}
