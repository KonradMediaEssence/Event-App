import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

const RenderNewsBig = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string; src: string | any }
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/news/[id]", params: { id: item.id } })
			}
			className='w-full bg-gray-200 rounded-2xl p-6 mb-4 mt-4 '>
			<View>
				<Image source={item.src} className='w-full h-96 rounded-2xl' />
			</View>
			<View className=' flex flex-row items-center justify-between mt-4'>
				<Text className='text-2xl font-bold text-gray-900 mb-2'>
					{item.title}
				</Text>
				<Text className='text-base text-gray-600 '>
					{item.date instanceof Date
						? item.date.toLocaleDateString("pl-PL")
						: item.date}
				</Text>
			</View>
		</Pressable>
	)
}

export default RenderNewsBig
