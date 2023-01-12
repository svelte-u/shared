import { describe, expect, it } from "vitest"

import { template } from "."

describe("template", () => {
	it("should be defined", () => {
		expect(template).toBeDefined()
	})

	it("should work", () => {
		const result = template("Hello {{name}}", { name: "John" })
		expect(result).toBe("Hello John")
	})

	it("should work with custom regex", () => {
		const result = template(
			"Hello {{name}}",
			{ name: "John" },
			/{{(.+?)}}/g
		)
		expect(result).toBe("Hello John")
	})

	it("should work with custom regex and custom delimiters", () => {
		const result = template("Hello {name}", { name: "John" }, /{(.+?)}/g)
		expect(result).toBe("Hello John")
	})

	it("should work with custom regex and custom $", () => {
		const result = template("Hello $name ", { name: "John" }, /\$(.+?) /g)
		expect(result).toBe("Hello John")
	})

	it("should replace all occurrences", () => {
		const result = template("Hello {{name}}, your age is: {{age}}", {
			name: "John",
			age: 20,
		})
		expect(result).toBe("Hello John, your age is: 20")
	})
})
