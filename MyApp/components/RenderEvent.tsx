import FontAwesome from "@expo/vector-icons/FontAwesome"
import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

const RenderEvent = ({
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
				router.push({ pathname: "/event/[id]", params: { id: item.id } })
			}
			android_ripple={{ color: "rgba(255,255,255,0.06)" }}
			className='flex-row items-center justify-between w-full bg-night-gray rounded-xl p-4 mb-3 border border-white/10 shadow-md'
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.97 : 1,
					transform: [{ scale: pressed ? 0.99 : 1 }],
				},
			]}>
			<View className='flex-row items-center gap-4'>
				<Image
					source={item.src}
					className='w-16 h-16 rounded-lg'
					resizeMode='cover'
				/>
				<View>
					<Text
						className='text-lg font-semibold text-light-base'
						numberOfLines={1}>
						{item.title}
					</Text>
					<Text className='text-sm text-light-subtle'>{dateLabel}</Text>
				</View>
			</View>

			<FontAwesome size={15} name='chevron-right' color='#EEEEEE99' />
		</Pressable>
	)
}

export default RenderEvent
