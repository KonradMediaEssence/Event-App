export const getCategoryColor = (category: string) => {
	switch (category) {
		case "Muzyka":
			return "bg-purple-500"
		case "Teatr":
			return "bg-pink-500"
		case "Sztuka":
			return "bg-red-400"
		case "Kino":
			return "bg-gray-700"
		case "Literatura":
			return "bg-indigo-500"
		case "Sport":
			return "bg-green-500"
		case "Festiwal":
			return "bg-yellow-500"
		case "Targi":
			return "bg-orange-500"
		case "Rodzina":
			return "bg-teal-500"
		case "Kulinaria":
			return "bg-rose-500"
		case "Stand-up":
			return "bg-blue-400"
		case "Taniec":
			return "bg-fuchsia-500"
		case "Edukacja":
			return "bg-cyan-500"
		case "Biznes":
			return "bg-emerald-600"
		case "Kultura":
			return "bg-lime-600"
		case "Religia":
			return "bg-amber-600"
		case "Technologia":
			return "bg-sky-600"
		case "Plener":
			return "bg-green-700"
		case "Święto":
			return "bg-red-600"
		default:
			return "bg-gray-400" // fallback
	}
}
