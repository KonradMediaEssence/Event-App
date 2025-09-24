import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

const RenderNewsBig = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string; src: string | any }
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
			className='w-full rounded-2xl p-4 mb-4 mt-4 bg-night-gray border border-white/10 shadow-lg'
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.97 : 1,
					transform: [{ scale: pressed ? 0.98 : 1 }],
				},
			]}>
			{/* Obrazek z pewnym clipem rogów */}
			<View className='rounded-2xl overflow-hidden'>
				<Image source={item.src} className='w-full h-96' resizeMode='cover' />
			</View>

			<View className='flex-row items-center justify-between mt-4'>
				<Text className='text-2xl font-bold text-light-base'>{item.title}</Text>
				<Text className='text-base text-light-subtle'>{dateLabel}</Text>
			</View>
		</Pressable>
	)
}

export default RenderNewsBig
