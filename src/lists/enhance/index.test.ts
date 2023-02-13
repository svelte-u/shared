import { get } from "svelte/store"

import { describe, expect, it } from "vitest"

import { enhance } from "."

describe("enhance", () => {
	it("should be defined", () => {
		expect(enhance).toBeDefined()
	})

	it("should enhance an array", () => {
		const list = enhance([1, 2, 3])

		expect(get(list)).toEqual([1, 2, 3])
	})

	it("should append an item to the array", () => {
		const list = enhance([1, 2, 3])

		list.append(4)

		expect(get(list)).toEqual([1, 2, 3, 4])

		list.append([5, 6])

		expect(get(list)).toEqual([1, 2, 3, 4, 5, 6])
	})

	it("should clear the array", () => {
		const list = enhance([1, 2, 3])

		list.clear()

		expect(get(list)).toEqual([])
	})

	it("should count the number of items in the array", () => {
		const list = enhance([1, 2, 3, 2, 1])

		expect(list.count()).toEqual(5)

		expect(list.count(1)).toEqual(2)

		expect(list.count(2)).toEqual(2)

		expect(list.count(3)).toEqual(1)

		expect(list.count(4)).toEqual(0)
	})

	it("should copy the array", () => {
		const list = enhance([1, 2, 3])

		const copy = list.copy()

		expect(get(copy)).toEqual(get(list))

		copy.append(4)

		expect(get(copy)).not.toEqual(get(list))

		list.append(4)

		expect(get(copy)).toEqual(get(list))

		list.clear()

		expect(get(copy)).not.toEqual(get(list))
	})

	it("should return the index of an item in the array", () => {
		const list = enhance(["ant", "bison", "camel", "duck", "bison"])

		expect(list.index("bison")).toEqual(1)

		expect(list.index("bison", 2)).toEqual(4)

		expect(list.index("giraffe")).toEqual(-1)
	})

	it("should insert an item into the array", () => {
		const list = enhance([1, 2, 3])

		list.insert(4)

		expect(get(list)).toEqual([4, 1, 2, 3])

		list.insert(5, 1)

		expect(get(list)).toEqual([4, 5, 1, 2, 3])

		list.insert([8, 6], 2)

		expect(get(list)).toEqual([4, 5, 8, 6, 1, 2, 3])
	})

	it("should remove an item from the array", () => {
		const list = enhance([1, 2, 3, 4, 5])

		list.remove(1)

		expect(get(list)).toEqual([2, 3, 4, 5])

		list.remove(2)

		expect(get(list)).toEqual([3, 4, 5])

		list.remove(3)

		expect(get(list)).toEqual([4, 5])

		list.remove([4, 5])

		expect(get(list)).toEqual([])
	})

	it("should pop an item from the array", () => {
		const list = enhance([1, 2, 3, 4, 5])

		expect(list.pop()).toEqual(5)

		expect(get(list)).toEqual([1, 2, 3, 4])

		expect(list.pop(0)).toEqual(1)

		expect(get(list)).toEqual([2, 3, 4])
	})
	it("should sort", () => {
		const list = enhance([3, 2, 1])
		list.sort({ type: "number" })
		expect(get(list)).toEqual([1, 2, 3])
	})

	it("should sort reverse", () => {
		const list = enhance([1, 2, 3])
		list.sort({ type: "number", reverse: true })
		expect(get(list)).toEqual([3, 2, 1])
	})

	it("should sort strings", () => {
		const list = enhance(["c", "b", "a"])
		list.sort()
		expect(get(list)).toEqual(["a", "b", "c"])
	})

	it("should sort strings reverse", () => {
		const list = enhance(["a", "b", "c"])
		list.sort({ reverse: true })
		expect(get(list)).toEqual(["c", "b", "a"])
	})

	it("should sort objects", () => {
		const users_fullname = [
			{ name: "john", surname: "doe" },
			{ name: "jane", surname: "noah" },
			{ name: "erza", surname: "scarlet" },
		]

		const list = enhance(users_fullname)

		list.sort({ type: "object", sort_by: "surname" })

		expect(get(list)).toEqual([
			{ name: "john", surname: "doe" },
			{ name: "jane", surname: "noah" },
			{ name: "erza", surname: "scarlet" },
		])

		list.sort({ type: "object", sort_by: "name" })

		expect(get(list)).toEqual([
			{ name: "erza", surname: "scarlet" },
			{ name: "jane", surname: "noah" },
			{ name: "john", surname: "doe" },
		])

		list.sort({ type: "object", sort_by: "surname", reverse: true })

		expect(get(list)).toEqual([
			{ name: "erza", surname: "scarlet" },
			{ name: "jane", surname: "noah" },
			{ name: "john", surname: "doe" },
		])

		list.sort({ type: "object", sort_by: "name", reverse: true })

		expect(get(list)).toEqual([
			{ name: "john", surname: "doe" },
			{ name: "jane", surname: "noah" },
			{ name: "erza", surname: "scarlet" },
		])
	})
})
