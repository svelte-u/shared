import { describe, expect, it } from "vitest"

import { watchable } from "."

describe("watchable", () => {
	it("should be defined", () => {
		expect(watchable).toBeDefined()
	})

	it("should work with string", () => {
		function callable(o: string, n: string) {
			expect(o).toBe("123.345")
			expect(n).toBe("123.456")
		}

		const w = watchable<string>("123.345", callable)

		w.set("123.456")
	})

	it("should work with number", () => {
		function callable(o: number, n: number) {
			expect(o).toBe(123.345)
			expect(n).toBe(123.456)
		}

		const w = watchable<number>(123.345, callable)

		w.set(123.456)
	})

	it("should work with boolean", () => {
		function callable(o: boolean, n: boolean) {
			expect(o).toBe(true)
			expect(n).toBe(false)
		}

		const w = watchable<boolean>(true, callable)

		w.set(false)
	})

	it("should call inline function", () => {
		const w = watchable<string>("123.345", (o, n) => {
			expect(o).toBe("123.345")
			expect(n).toBe("123.456")
		})

		w.set("123.456")
	})
})
