import { sleep } from "../sleep"
import { toWritable } from "../utils"
import { toReadable } from "../utils"
import { noop } from "../utils"
import type { AsyncStateOptions } from "../utils"

/**
 * A function that executes a promise and returns a state.
 *
 * @param promise - The promise to execute.
 *
 * @param initialState - The initial state of the state.
 *
 * @param options - The options.
 * - `delay` - Delay for executing the promise. In second.
 * - `immediate` - Execute the promise right after the function is invoked.
 * - `on_error` - Callback when error is caught.
 * - `resetOnExecute` - Sets the state to initial state before executing the promise.
 * - `throwError` - An error is thrown when executing the execute function.
 *
 * @example
 * ```ts
 * const { state, ready, loading, error, execute } = asyncState(
 * 	() => Promise.resolve(1),
 * 	0,
 * 	{ immediate: false }
 * )
 * ```
 *
 * @returns An object with the following properties:
 * - `state` - The state.
 * - `ready` - A boolean that indicates if the promise has been resolved.
 * - `loading` - A boolean that indicates if the promise is being executed.
 * - `error` - The error that was caught.
 * - `execute` - A function that executes the promise manually.
 */
export function asyncState<T, Params extends any[] = []>(
	promise: Promise<T> | ((...args: Params) => Promise<T>),
	initialState: T,
	options: AsyncStateOptions = {}
) {
	const {
		immediate = true,
		delay = 0,
		onError = noop,
		onSuccess = noop,
		resetOnExecute = true,
		throwError,
	} = options ?? {}

	const state = toWritable(initialState)

	const ready = toWritable(false)

	const loading = toWritable(false)

	const error = toWritable<unknown | undefined>(undefined)

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
		if (resetOnExecute) state.set(initialState)

		error.set(undefined)

		ready.set(false)

		loading.set(true)

		if (delay > 0) await sleep(delay)

		const _promise =
			typeof promise === "function"
				? promise(...(args as Params))
				: promise

		try {
			const data = await _promise

			state.set(data)

			ready.set(true)
			onSuccess(data)
		} catch (e) {
			error.set(e)
			onError(e)
			if (throwError) throw error
		} finally {
			loading.set(false)
		}

		return state as T
	}

	if (immediate) execute(delay)

	return {
		state: toReadable(state),
		ready: toReadable(ready),
		loading: toReadable(loading),
		error: toReadable(error),
		execute,
	}
}
