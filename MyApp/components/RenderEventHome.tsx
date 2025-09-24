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
	const dateLabel =
		item.date instanceof Date
			? item.date.toLocaleDateString("pl-PL", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				})
			: item.date

	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/event/[id]", params: { id: item.id } })
			}
			android_ripple={{ color: "rgba(255,255,255,0.06)", borderless: false }}
			className='rounded-2xl bg-night-gray shadow-lg border border-white/10 my-2'
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.97 : 1,
					transform: [{ scale: pressed ? 0.98 : 1 }],
				},
			]}>
			<View className='gap-4 p-4'>
				<View className='w-full rounded-2xl overflow-hidden'>
					<ImageBackground
						source={item.src}
						resizeMode='cover'
						className='h-56'
						imageStyle={{ borderRadius: 16 }}>
						<View className='flex-1 justify-end'>
							<BlurView intensity={30} tint='dark' className='w-full p-4 pt-2'>
								<Text
									className='text-xl font-bold text-light-base tracking-tight'
									numberOfLines={2}>
									{item.title}
								</Text>

								<View className='self-start mt-2 rounded-full bg-black/30 px-3 py-[2px] border border-white/10'>
									<Text className='text-light-subtle text-[12px] font-semibold'>
										{dateLabel}
									</Text>
								</View>
							</BlurView>
						</View>
					</ImageBackground>
				</View>

				<View className='flex flex-row justify-between'>
					<View className='mt-2 bg-accent-teal rounded-full flex-row py-2 px-4 items-center self-start shadow shadow-black/30'>
						<Text className='text-white font-bold pr-2'>Dołącz!</Text>
						<FontAwesome size={10} name='chevron-right' color='#EEEEEE' />
					</View>

					<View
						className={`mt-2 ${getCategoryColor(
							item.category
						)} rounded-full flex-row py-2 px-4 items-center self-start border border-white/10`}>
						<Text className='text-white font-bold'>{item.category}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

export default RenderEventHome
