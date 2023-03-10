import { sleep } from "../sleep"
import { to_readable } from "../to_readable"
import { to_writable } from "../to_writable"
import { noop } from "../utils"
import type { AsyncStateOptions } from "../utils"

/**
 * A function that executes a promise and returns a state.
 *
 * @param promise - The promise to execute.
 *
 * @param initial_state - The initial state of the state.
 *
 * @param options - The options.
 * - `delay` - Delay for executing the promise. In second.
 * - `immediate` - Execute the promise right after the function is invoked.
 * - `on_error` - Callback when error is caught.
 * - `reset_on_execute` - Sets the state to initial state before executing the promise.
 * - `throw_error` - An error is thrown when executing the execute function.
 *
 * @returns An object with the following properties:
 * - `state` - The state.
 * - `ready` - A boolean that indicates if the promise has been resolved.
 * - `loading` - A boolean that indicates if the promise is being executed.
 * - `error` - The error that was caught.
 * - `execute` - A function that executes the promise manually.
 */
export function async_state<T>(
	promise: Promise<T> | ((...args: any[]) => Promise<T>),
	initial_state: T,
	options: AsyncStateOptions = {}
) {
	const {
		immediate = true,
		delay = 0,
		on_error = noop,
		reset_on_execute = true,
		throw_error,
	} = options ?? {}

	const state = to_writable(initial_state)

	const ready = to_writable(false)

	const loading = to_writable(false)

	const error = to_writable<unknown | undefined>(undefined)

	/**
	 * Executes the promise.
	 *
	 * @param delay - Delay for executing the promise. In second. default: 0
	 *
	 * @param args - The arguments to pass to the promise.
	 *
	 * @returns The state.
	 */
	async function execute(delay = 0, ...args: any[]) {
		if (reset_on_execute) state.set(initial_state)

		error.set(undefined)

		ready.set(false)

		loading.set(true)

		if (delay > 0) await sleep(delay)

		const _promise =
			typeof promise === "function" ? promise(...args) : promise

		try {
			const data = await _promise

			state.set(data)

			ready.set(true)
		} catch (e) {
			error.set(e)
			on_error(e)
			if (throw_error) throw error
		} finally {
			loading.set(false)
		}

		return state as T
	}

	if (immediate) execute(delay)

	return {
		state: to_readable(state),
		ready: to_readable(ready),
		loading: to_readable(loading),
		error: to_readable(error),
		execute,
	}
}
