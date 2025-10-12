export interface Event {
	id: string
	title: string
	date: Date | string
	src: string | any
	category: string
	cost: string | number
	time: string
	desc: string
	isFavourite: boolean
}

export interface News {
	id: string
	title: string
	date: Date | string
	src: string | any
	desc: string
}

export interface FaqList {
	id: string
	title: string
	desc: string
}

export const EventList: Event[] = [
	{
		id: "1",
		title: "Event mój",
		date: "2025-11-16",
		src: require("../assets/images/goiczi.jpeg"),
		category: "Muzyka",
		cost: 250,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: true,
	},
	{
		id: "2",
		title: "Event Two",
		date: "2025-10-05",
		src: require("../assets/images/img-2.jpg"),
		category: "Teatr",
		cost: 20,
		time: "21:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: true,
	},
	{
		id: "3",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Sztuka",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "4",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Kino",
		cost: 70,
		time: "22:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "5",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Literatura",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "6",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Sport",
		cost: 14,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "7",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Festiwal",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "8",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Targi",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "9",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Rodzina",
		cost: 99,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "10",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Kulinaria",
		cost: 120,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "11",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Stand-up",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "12",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Taniec",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "13",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Edukacja",
		cost: 19,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "14",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Biznes",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "17",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Kultura",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "18",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Religia",
		cost: 88,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "19",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Technologia",
		cost: 47,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "20",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img-2.jpg"),
		category: "Plener",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
	{
		id: "21",
		title: "Event Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		category: "Święto",
		cost: 0,
		time: "18:00",
		desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		isFavourite: false,
	},
]

export const NewsList: News[] = [
	{
		id: "1",
		title: "News One",
		date: "2025-10-01",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "2",
		title: "News Two",
		date: "2025-10-05",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "3",
		title: "News Three",
		date: "2025-10-10",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "4",
		title: "News Four",
		date: "2025-10-15",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "5",
		title: "News Five",
		date: "2025-10-20",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "6",
		title: "News Six",
		date: "2025-10-25",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "7",
		title: "News Seven",
		date: "2025-10-30",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "8",
		title: "News Eight",
		date: "2025-11-04",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: "9",
		title: "News Nine",
		date: "2025-11-09",
		src: require("../assets/images/img.jpg"),
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
]

export const FaqItem: FaqList[] = [
	{
		id: "1",
		title: "Czym jest ta aplikacja i do czego służy?",
		desc: "Aplikacja pokazuje aktualne wydarzenia, imprezy, koncerty i inne atrakcje w Twoim mieście. Dzięki niej łatwo znajdziesz coś ciekawego do zrobienia w wolnym czasie.",
	},
	{
		id: "2",
		title: "Czy korzystanie z aplikacji jest darmowe?",
		desc: "Tak, podstawowe funkcje aplikacji są całkowicie darmowe. Niektóre wydarzenia mogą być płatne, ale ich ceny ustalają organizatorzy.",
	},
	{
		id: "3",
		title: "Czy mogę zapisać wydarzenie, żeby o nim nie zapomnieć?",
		desc: "Tak! Każde wydarzenie możesz dodać do ulubionych lub włączyć przypomnienie, aby otrzymać powiadomienie przed jego rozpoczęciem.",
	},
	{
		id: "4",
		title: "Skąd pochodzą informacje o wydarzeniach?",
		desc: "Dane pochodzą bezpośrednio od organizatorów, oficjalnych stron wydarzeń oraz zaufanych partnerów, dzięki czemu są aktualne i wiarygodne.",
	},
	{
		id: "5",
		title: "Jak włączyć lub wyłączyć powiadomienia o nowych wydarzeniach?",
		desc: "Możesz to zrobić w ustawieniach aplikacji. Tam wybierzesz, czy chcesz otrzymywać powiadomienia o wszystkich wydarzeniach, tylko wybranych kategoriach, albo je wyłączyć.",
	},
	{
		id: "6",
		title: "Czy mogę dodać własne wydarzenie do aplikacji?",
		desc: "Tak! W sekcji „Dodaj wydarzenie” możesz zgłosić własne wydarzenie — po weryfikacji pojawi się ono w aplikacji.",
	},
	{
		id: "7",
		title: "Zapomniałem hasła – co mam zrobić?",
		desc: "Na ekranie logowania kliknij „Nie pamiętasz hasła?” i postępuj zgodnie z instrukcjami, aby je zresetować.",
	},
	{
		id: "8",
		title: "Jak mogę skontaktować się z pomocą techniczną?",
		desc: "W zakładce „Pomoc” znajdziesz formularz kontaktowy lub adres e-mail, na który możesz napisać w razie problemów.",
	},
]
