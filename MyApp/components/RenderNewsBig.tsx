import { router } from "expo-router"
import { Pressable, Text } from "react-native"

const RenderNewsBig = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string }
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/news/[id]", params: { id: item.id } })
			}
			className='w-full bg-gray-200 rounded-2xl p-6 mb-4 mt-4 '>
			<Text className='text-2xl font-bold text-gray-900 mb-2'>
				{item.title}
			</Text>
			<Text className='text-base text-gray-600'>
				{item.date instanceof Date
					? item.date.toLocaleDateString("pl-PL")
					: item.date}
			</Text>
		</Pressable>
	)
}

export default RenderNewsBig
