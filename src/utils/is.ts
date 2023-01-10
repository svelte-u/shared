import type { Readable, Writable } from "svelte/store"

import { type } from "../type"
import type { MaybeStore } from "./types"

export const browser = typeof window !== "undefined"

export const is_ws = typeof WebSocket !== "undefined"

export function is_set<T>(value?: T): boolean {
	return type(value) === "set"
}

export function is_boolean<T>(value?: T): boolean {
	return type(value) === "boolean"
}

export function is_function<T>(value?: T): boolean {
	return type(value) === "function"
}

export function is_number<T>(value?: T): boolean {
	return type(value) === "number"
}

export function is_string<T>(value?: T): boolean {
	return type(value) === "string"
}

export function is_object<T>(value?: T): boolean {
	return type(value) === "object"
}

export function is_array<T>(value?: T): boolean {
	return type(value) === "array"
}

export function is_date<T>(value?: T): boolean {
	return type(value) === "date"
}

export function is_symbol<T>(value?: T): boolean {
	return type(value) === "symbol"
}

export function is_window<T>(value?: T): boolean {
	return typeof window !== "undefined" && type(value) === "window"
}

export function is_readable<T>(store: any): store is Readable<T> {
	return store && is_function(store?.subscribe)
}

export function is_writable<T>(store: any): store is Writable<T> {
	return store && ["subscribe", "set"].every((n) => is_function(store[n]))
}

export function is_store<T>(store: any): store is MaybeStore<T> {
	return is_readable(store) || is_writable(store)
}

export function is_empty(value: any) {
	if (value === true || value === false) return true

	if (value === null || value === undefined) return true

	if (is_number(value)) return parseInt(value) === 0

	if (is_date(value)) return isNaN(value)

	if (is_function(value)) return false

	if (is_symbol(value)) return false

	const length = (value as any).length

	if (is_number(length)) return length === 0

	const size = (value as any).size

	if (is_number(size)) return size === 0

	const keys = Object.keys(value).length

	return keys === 0
}

export function is_equal<T, U>(x: T, y: U): boolean {
	if (Object.is(x, y)) return true

	if (x instanceof Date && y instanceof Date)
		return x.getTime() === y.getTime()

	if (x instanceof RegExp && y instanceof RegExp)
		return x.toString() === y.toString()

	if (!is_object(x) || x === null || !is_object(y) || y === null) return false

	const keys_x = Reflect.ownKeys(x as unknown as object)

	const keys_y = Reflect.ownKeys(y as unknown as object)

	if (keys_x.length !== keys_y.length) return false

	for (let i = 0; i < keys_x.length; i++) {
		if (!Reflect.has(y as unknown as object, keys_x[i])) return false
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//   @ts-ignore
		if (!is_equal(x[keys_x[i]], y[keys_x[i]])) return false
	}
	return true
}
