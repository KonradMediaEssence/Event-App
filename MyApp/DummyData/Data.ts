export interface Event {
	id: string
	title: string
	date: Date | string
}

export interface News {
	id: string
	title: string
	date: Date | string
}

export const EventList: Event[] = [
	{ id: "1", title: "Event One", date: "2025-10-01" },
	{ id: "2", title: "Event Two", date: "2025-10-05" },
	{ id: "3", title: "Event Three", date: "2025-10-10" },
	{ id: "4", title: "Event Three", date: "2025-10-10" },
	{ id: "5", title: "Event Three", date: "2025-10-10" },
	{ id: "6", title: "Event Three", date: "2025-10-10" },
	{ id: "7", title: "Event Three", date: "2025-10-10" },
	{ id: "8", title: "Event Three", date: "2025-10-10" },
	{ id: "9", title: "Event Three", date: "2025-10-10" },
	{ id: "10", title: "Event Three", date: "2025-10-10" },
	{ id: "11", title: "Event Three", date: "2025-10-10" },
	{ id: "12", title: "Event Three", date: "2025-10-10" },
	{ id: "13", title: "Event Three", date: "2025-10-10" },
	{ id: "14", title: "Event Three", date: "2025-10-10" },
	{ id: "17", title: "Event Three", date: "2025-10-10" },
	{ id: "18", title: "Event Three", date: "2025-10-10" },
	{ id: "19", title: "Event Three", date: "2025-10-10" },
	{ id: "20", title: "Event Three", date: "2025-10-10" },
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
