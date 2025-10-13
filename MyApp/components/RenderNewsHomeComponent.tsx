import { publicUrl } from "@/lib/supabase"
import { News } from "@/types"
import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

type Props = { item: Pick<News, "id" | "title" | "date" | "src"> }

const RenderNewsHomeComponent = ({ item }: Props) => {
	const uri = item.src ? publicUrl(item.src) : null

	return (
		<Pressable
			onPress={() =>
				router.push({ pathname: "/news/[id]", params: { id: item.id } })
			}
			className='mr-4 rounded-2xl bg-night-gray p-4 border border-white/10'>
			<View className='gap-2 items-center'>
				{uri ? (
					<View>
						<Image
							source={{ uri }}
							className='w-32 h-24 rounded-lg'
							resizeMode='cover'
						/>
					</View>
				) : (
					<View className='w-32 h-24 rounded-lg bg-black/20 items-center justify-center'>
						<Text className='text-gray-400 text-xs'>brak zdjęcia</Text>
					</View>
				)}
				<View>
					<Text className='text-white'>{item.title}</Text>
				</View>
			</View>
		</Pressable>
	)
}

export default RenderNewsHomeComponent
