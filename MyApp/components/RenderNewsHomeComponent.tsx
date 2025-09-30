import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

const RenderNewsHomeComponent = ({
	item,
}: {
	item: {
		id: string
		title: string
		date: Date | string
		src: string | any
	}
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/news/[id]", params: { id: item.id } })
			}
			className='mr-4 rounded-2xl bg-night-gray p-4 border border-white/10'>
			<View className='gap-2 items-center'>
				<View>
					<Image
						source={item.src}
						className='w-32 h-24 rounded-lg'
						resizeMode='cover'
					/>
				</View>
				<View>
					<Text className='text-white'>{item.title}</Text>
				</View>
			</View>
		</Pressable>
	)
}

export default RenderNewsHomeComponent
