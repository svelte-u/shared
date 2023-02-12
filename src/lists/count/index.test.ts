import { describe, expect, it } from "vitest"

import { count } from "."

const users = [
	{
		created_at: "2022-05-10",
	},
	{
		created_at: "2022-05-14",
	},
	{
		created_at: "2022-05-15",
	},
	{
		created_at: "2022-05-18",
	},
	{
		created_at: "2022-05-18",
	},
	{
		created_at: "2022-05-20",
	},
	{
		created_at: "2022-05-21",
	},
	{
		created_at: "2022-05-23",
	},
	{
		created_at: "2022-05-27",
	},
	{
		created_at: "2022-05-27",
	},
	{
		created_at: "2022-05-28",
	},
	{
		created_at: "2022-05-28",
	},
	{
		created_at: "2022-06-02",
	},
	{
		created_at: "2022-06-02",
	},
	{
		created_at: "2022-06-02",
	},
	{
		created_at: "2022-06-03",
	},
	{
		created_at: "2022-06-04",
	},
	{
		created_at: "2022-06-16",
	},
	{
		created_at: "2022-07-05",
	},
	{
		created_at: "2022-07-14",
	},
	{
		created_at: "2022-07-25",
	},
	{
		created_at: "2022-08-05",
	},
	{
		created_at: "2022-08-14",
	},
	{
		created_at: "2022-08-18",
	},
	{
		created_at: "2022-08-19",
	},
	{
		created_at: "2022-08-22",
	},
	{
		created_at: "2022-08-22",
	},
	{
		created_at: "2022-08-23",
	},
	{
		created_at: "2022-08-23",
	},
	{
		created_at: "2022-08-24",
	},
	{
		created_at: "2022-08-24",
	},
	{
		created_at: "2022-08-24",
	},
	{
		created_at: "2022-08-26",
	},
	{
		created_at: "2022-08-28",
	},
	{
		created_at: "2022-08-30",
	},
	{
		created_at: "2022-09-01",
	},
	{
		created_at: "2022-09-06",
	},
	{
		created_at: "2021-09-06",
	},
]

describe("count", () => {
	it("should be defined", () => {
		expect(count).toBeDefined()
	})

	it("should work with daily user", () => {
		expect(count(users, (u) => u.created_at)).toEqual({
			"2021-09-06": 1,
			"2022-05-10": 1,
			"2022-05-14": 1,
			"2022-05-15": 1,
			"2022-05-18": 2,
			"2022-05-20": 1,
			"2022-05-21": 1,
			"2022-05-23": 1,
			"2022-05-27": 2,
			"2022-05-28": 2,
			"2022-06-02": 3,
			"2022-06-03": 1,
			"2022-06-04": 1,
			"2022-06-16": 1,
			"2022-07-05": 1,
			"2022-07-14": 1,
			"2022-07-25": 1,
			"2022-08-05": 1,
			"2022-08-14": 1,
			"2022-08-18": 1,
			"2022-08-19": 1,
			"2022-08-22": 2,
			"2022-08-23": 2,
			"2022-08-24": 3,
			"2022-08-26": 1,
			"2022-08-28": 1,
			"2022-08-30": 1,
			"2022-09-01": 1,
			"2022-09-06": 1,
		})
	})

	it("should work with monthly user", () => {
		const monthly_user = users.filter((user) => {
			user.created_at = user.created_at.split("-").slice(0, 2).join("-")
			return true
		})

		expect(count(monthly_user, (u) => u.created_at)).toEqual({
			"2021-09": 1,
			"2022-05": 12,
			"2022-06": 6,
			"2022-07": 3,
			"2022-08": 14,
			"2022-09": 2,
		})
	})

	it("should work with yearly user", () => {
		const yearly_user = users.filter((user) => {
			user.created_at = user.created_at.split("-").slice(0, 1).join("-")
			return true
		})

		expect(count(yearly_user, (u) => u.created_at)).toEqual({
			"2022": 37,
			"2021": 1,
		})
	})
})
