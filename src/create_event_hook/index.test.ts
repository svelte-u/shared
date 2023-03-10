import { describe, expect, it, vitest } from "vitest"

import { create_event_hook } from "."

describe("create_event_hook", () => {
	it("should be defined", () => {
		expect(create_event_hook).toBeDefined()
	})

	it("should trigger event", () => {
		const my_function = () => {
			const result_event = create_event_hook<string>()
			const exec = () => result_event.trigger("Hello World")
			return {
				exec,
				on_result: result_event.on,
			}
		}

		const { exec, on_result } = my_function()

		on_result((result) => {
			expect(result).toBe("Hello World")
		})
		exec()
	})

	it("should trigger event with payload", () => {
		const my_function = () => {
			const result_event = create_event_hook<string>()
			const exec = (payload: string) => result_event.trigger(payload)
			return {
				exec,
				on_result: result_event.on,
			}
		}

		const { exec, on_result } = my_function()

		on_result((result) => {
			expect(result).toBe("Hello World")
		})

		exec("Hello World")
	})

	it("should add and remove event listener", () => {
		const listener = vitest.fn()
		const { on, off, trigger } = create_event_hook<string>()

		on(listener)

		trigger("xxx")

		expect(listener).toHaveBeenCalledTimes(1)

		off(listener)

		trigger("xxx")

		expect(listener).toHaveBeenCalledTimes(1)

		const { off: remove } = on(listener)

		trigger("xxx")

		expect(listener).toHaveBeenCalledTimes(2)

		remove()

		trigger("xxx")

		expect(listener).toHaveBeenCalledTimes(2)
	})

	it("should await trigger", async () => {
		let message = ""

		const my_function = () => {
			const result_event = create_event_hook<string>()
			const exec = () => result_event.trigger("Hello World")
			return {
				exec,
				on_result: result_event.on,
			}
		}

		const { exec, on_result } = my_function()
		on_result(
			(result) =>
				new Promise<number>((resolve) => {
					setTimeout(() => {
						message = result
						resolve(2)
					}, 100)
				})
		)
		const result = await exec()

		expect(message).toBe("Hello World")
		expect(result).toEqual([2])
	})

	it("the same listener should fire only once", () => {
		const listener = vitest.fn()
		const { on, trigger, off } = create_event_hook<string>()

		on(listener)

		on(listener)

		trigger("xxx")

		off(listener)

		expect(listener).toBeCalledTimes(1)
	})
})
