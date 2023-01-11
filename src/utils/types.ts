import type { Readable, Writable } from "svelte/store"

/**
 * Maybe it's a Readable, or a plain value.
 *
 * ```ts
 * type Readable = T | Readable<T>
 * ```
 */
export type MaybeReadable<T> = T | Readable<T>

/**
 * Maybe it's a Writable, or a plain value.
 *
 * ```ts
 * type Writable = T | Writable<T>
 * ```
 */
export type MaybeWritable<T> = T | Writable<T>

/**
 * Maybe it's a Store, or a plain value.
 *
 * ```ts
 * type Store = T | Readable<T> | Writable<T>
 * ```
 */
export type MaybeStore<T> = T | Readable<T> | Writable<T>

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * Void function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

export type Awaitable<T> = Promise<T> | T

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

export type PromisifyFn<T extends AnyFn> = (
	...args: ArgumentsType<T>
) => Promise<ReturnType<T>>

export interface Stoppable {
	/**A an indicate whether a stoppable instance is executing*/
	pending: Readable<boolean>

	/**Stop the effect from executing*/
	stop: Fn

	/**Start the effect*/
	start: Fn
}

export interface Pauseable {
	/**A an indicate whether a pauseable instance is active*/
	active: Readable<boolean>

	/**Temporary pause the effect from executing*/
	pause: Fn

	/**Resume the effects*/
	resume: Fn
}

export interface PartialWritable {
	/**The set function in writable stores. */
	set: (value: any) => void

	/** The subscribe function in writable stores. */
	subscribe: (
		run: (value: any) => void,
		invalidate?: (value?: any) => void
	) => () => void
}
