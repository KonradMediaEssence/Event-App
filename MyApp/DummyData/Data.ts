export interface Event {
	id: string
	title: string
	date: Date | string
	src: string | any
	category: string
	cost: string | number
	time: string
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
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "2",
		title: "Event Two",
		date: "2025-10-05",
		src: require("../assets/images/img-2.jpg"),
		category: "Teatr",
		cost: 20,
		time: "21:00",
	},
	{
		id: "3",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Sztuka",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "4",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Kino",
		cost: 70,
		time: "22:00",
	},
	{
		id: "5",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Literatura",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "6",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
		cost: 14,
		time: "18:00",
	},
	{
		id: "7",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Festiwal",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "8",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Targi",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "9",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Rodzina",
		cost: 99,
		time: "18:00",
	},
	{
		id: "10",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Kulinaria",
		cost: 120,
		time: "18:00",
	},
	{
		id: "11",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Stand-up",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "12",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Taniec",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "13",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Edukacja",
		cost: 19,
		time: "18:00",
	},
	{
		id: "14",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Biznes",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "17",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Kultura",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "18",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Religia",
		cost: 88,
		time: "18:00",
	},
	{
		id: "19",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Technologia",
		cost: 47,
		time: "18:00",
	},
	{
		id: "20",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Plener",
		cost: "Darmowy",
		time: "18:00",
	},
	{
		id: "21",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Święto",
		cost: "Darmowy",
		time: "18:00",
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
