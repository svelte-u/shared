import { describe, expect, it } from "vitest"

import { create_singleton_promise } from "."

describe("create_singleton_promise", () => {
	it("should be defined", () => {
		expect(create_singleton_promise).toBeDefined()
	})

	it("should create singleton as promise", () => {
		const my_function = () => {
			const result = create_singleton_promise(() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve("Hello World")
					}, 1000)
				})
			})

			return {
				result,
			}
		}

		const { result } = my_function()

		expect(result()).toBeInstanceOf(Promise)
	})
})
