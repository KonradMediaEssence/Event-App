export interface Event {
	id: string
	title: string
	date: Date | string
	src: string | any
	category: string
}

export interface News {
	id: string
	title: string
	date: Date | string
}

export const EventList: Event[] = [
	{
		id: "1",
		title: "Event One",
		date: "2025-10-01",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "2",
		title: "Event Two",
		date: "2025-10-05",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "3",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "4",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "5",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "6",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "7",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "8",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "9",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "10",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "11",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "12",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "13",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "14",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "17",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "18",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
	{
		id: "19",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Muzyka",
	},
	{
		id: "20",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
	},
]

export const NewsList: News[] = [
	{ id: "1", title: "News One", date: "2025-10-01" },
	{ id: "2", title: "News Two", date: "2025-10-05" },
	{ id: "3", title: "News Three", date: "2025-10-10" },
	{ id: "4", title: "News Four", date: "2025-10-15" },
	{ id: "5", title: "News Five", date: "2025-10-20" },
	{ id: "6", title: "News Six", date: "2025-10-25" },
	{ id: "7", title: "News Seven", date: "2025-10-30" },
	{ id: "8", title: "News Eight", date: "2025-11-04" },
	{ id: "9", title: "News Nine", date: "2025-11-09" },
]
