import { router } from "expo-router"
import { Pressable, Text } from "react-native"

const RenderNews = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string }
}) => {
	const dateLabel =
		item.date instanceof Date
			? item.date.toLocaleDateString("pl-PL")
			: item.date

	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/news/[id]", params: { id: item.id } })
			}
			android_ripple={{ color: "rgba(255,255,255,0.06)" }}
			className='w-full bg-night-gray rounded-xl p-4 mb-3 border border-white/10 shadow-md'
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.97 : 1,
					transform: [{ scale: pressed ? 0.99 : 1 }],
				},
			]}>
			<Text className='text-lg font-semibold text-light-base'>
				{item.title}
			</Text>
			<Text className='text-sm text-light-subtle'>{dateLabel}</Text>
		</Pressable>
	)
}

export default RenderNews
