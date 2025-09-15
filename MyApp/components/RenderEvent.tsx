import { router } from "expo-router"
import { Pressable, Text } from "react-native"

const RenderEvent = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string }
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/event/[id]", params: { id: item.id } })
			}
			className='w-full bg-gray-100 rounded-xl p-4 mb-3'>
			<Text className='text-lg font-semibold text-gray-900'>{item.title}</Text>
			<Text className='text-sm text-gray-500'>
				{item.date instanceof Date
					? item.date.toLocaleDateString("pl-PL")
					: item.date}
			</Text>
		</Pressable>
	)
}

export default RenderEvent
