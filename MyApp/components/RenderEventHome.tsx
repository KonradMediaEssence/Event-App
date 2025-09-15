import { router } from "expo-router"
import { Pressable, Text, View } from "react-native"

const RenderEventHome = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string }
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/event/[id]", params: { id: item.id } })
			}
			className='rounded-2xl bg-white border border-gray-200 shadow-sm self-start'
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.95 : 1,
					transform: [{ scale: pressed ? 0.98 : 1 }],
				},
			]}>
			<View className='flex gap-4 p-4 w-52'>
				<Text className='text-xl font-semibold text-gray-900' numberOfLines={2}>
					{item.title}
				</Text>

				<Text className='mt-2 self-start rounded-full bg-gray-100 px-2 py-0.5 text-base text-gray-600'>
					{item.date instanceof Date
						? item.date.toLocaleDateString("pl-PL", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})
						: item.date}
				</Text>
			</View>
		</Pressable>
	)
}

export default RenderEventHome
