import FontAwesome from "@expo/vector-icons/FontAwesome"
import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

const RenderEvent = ({
	item,
}: {
	item: { id: string; title: string; date: Date | string; src: string | any }
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/event/[id]", params: { id: item.id } })
			}
			className='flex justify-between flex-row items-center w-full bg-gray-100 rounded-xl p-4 mb-3'>
			<View className='flex flex-row items-center gap-4'>
				<View>
					<Image
						source={item.src}
						className='w-[4rem] h-[4rem] rounded'
						resizeMode='cover'
					/>
				</View>
				<View>
					<Text className='text-lg font-semibold text-gray-900'>
						{item.title}
					</Text>
					<Text className='text-sm text-gray-500'>
						{item.date instanceof Date
							? item.date.toLocaleDateString("pl-PL")
							: item.date}
					</Text>
				</View>
			</View>
			<View>
				<FontAwesome size={15} name='chevron-right' color='#B2BEB5' />
			</View>
		</Pressable>
	)
}

export default RenderEvent
