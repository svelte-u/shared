import { describe, expect, it } from "vitest"

import { create_event_hook } from "."

describe("create_event_hook", () => {
	it("should be defined", () => {
		expect(create_event_hook).toBeDefined()
	})

	it("should trigger event", () => {
		const myFunction = () => {
			const resultEvent = create_event_hook<string>()
			const exec = () => resultEvent.trigger("Hello World")
			return {
				exec,
				on_result: resultEvent.on,
			}
		}

		const { exec, on_result } = myFunction()

		on_result((result) => {
			expect(result).toBe("Hello World")
		})
		exec()
	})

	it("should trigger event with payload", () => {
		const myFunction = () => {
			const resultEvent = create_event_hook<string>()
			const exec = (payload: string) => resultEvent.trigger(payload)
			return {
				exec,
				on_result: resultEvent.on,
			}
		}

		const { exec, on_result } = myFunction()

		on_result((result) => {
			expect(result).toBe("Hello World")
		})

		exec("Hello World")
	})
})
