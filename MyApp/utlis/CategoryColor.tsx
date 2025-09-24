export const getCategoryColor = (category: string) => {
	switch (category) {
		case "Muzyka":
			return "bg-category-music"
		case "Teatr":
			return "bg-category-theatre"
		case "Sztuka":
			return "bg-category-art"
		case "Kino":
			return "bg-category-cinema"
		case "Literatura":
			return "bg-category-literature"
		case "Sport":
			return "bg-category-sport"
		case "Festiwal":
			return "bg-category-festival"
		case "Targi":
			return "bg-category-fair"
		case "Rodzina":
			return "bg-category-family"
		case "Kulinaria":
			return "bg-category-food"
		case "Stand-up":
			return "bg-category-standup"
		case "Taniec":
			return "bg-category-dance"
		case "Edukacja":
			return "bg-category-education"
		case "Biznes":
			return "bg-category-business"
		case "Kultura":
			return "bg-category-culture"
		case "Religia":
			return "bg-category-religion"
		case "Technologia":
			return "bg-category-tech"
		case "Plener":
			return "bg-category-outdoor"
		case "Święto":
			return "bg-category-holiday"
		default:
			return "bg-gray-400"
	}
}
