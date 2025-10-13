export type Event = {
	id: string
	title: string
	date: string
	time: string
	src: string | null
	category: string
	cost: number
	desc: string | null
	is_favourite: boolean
}

export type News = {
	id: string
	title: string
	date: string
	src: string | null
	desc: string | null
}

export type Faq = {
	id: string
	title: string
	desc: string
}
