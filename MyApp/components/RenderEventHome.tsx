import { router } from "expo-router"
import { Pressable, Text, View, ImageBackground } from "react-native"
import { BlurView } from "expo-blur"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { getCategoryColor } from "@/utlis/CategoryColor"

const RenderEventHome = ({
	item,
}: {
	item: {
		id: string
		title: string
		date: Date | string
		src: string | any
		category: string
	}
}) => {
	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/event/[id]", params: { id: item.id } })
			}
			className='rounded-xl bg-white shadow my-2'
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.95 : 1,
					transform: [{ scale: pressed ? 0.98 : 1 }],
				},
			]}>
			<View className='flex gap-4 p-4'>
				<View className='w-full'>
					<ImageBackground
						source={item.src}
						resizeMode='cover'
						className='h-56 rounded-xl overflow-hidden'>
						<View className='flex-1 justify-end'>
							<BlurView intensity={25} tint='dark' className='w-full  p-4'>
								<Text
									className='text-xl font-bold text-white w-full'
									numberOfLines={2}>
									{item.title}
								</Text>
								<Text className='self-start rounded-full text-base font-bold text-white'>
									{item.date instanceof Date
										? item.date.toLocaleDateString("pl-PL", {
												day: "2-digit",
												month: "short",
												year: "numeric",
											})
										: item.date}
								</Text>
							</BlurView>
						</View>
					</ImageBackground>
					<View className='flex flex-row justify-between'>
						<View className='mt-4 bg-slate-600 rounded-full flex flex-row py-2 px-4 items-center justify-between self-start'>
							<Text className=' text-white font-bold  pr-2'>Dołącz!</Text>
							<FontAwesome size={10} name='chevron-right' color='#fff' />
						</View>
						<View
							className={`mt-4 ${getCategoryColor(item.category)} rounded-full flex flex-row py-2 px-4 items-center justify-between self-start`}>
							<Text className=' text-white font-bold'>{item.category}</Text>
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

export default RenderEventHome
