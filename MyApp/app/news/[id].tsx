import { SafeAreaView } from "react-native-safe-area-context"
import { Image, Pressable, ScrollView, Text, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { NewsList } from "@/DummyData/Data"
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function NewsDetails() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const news = NewsList.find(e => e.id === id)

	if (!news) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center bg-night-dark'>
				<Text className='text-base text-gray-600'>
					Nie znaleziono wiadomości.
				</Text>
			</SafeAreaView>
		)
	}

	const formattedDate =
		news.date instanceof Date
			? news.date.toLocaleDateString("pl-PL", {
					day: "numeric",
					month: "long",
					year: "numeric",
				})
			: news.date

	return (
		<View className='flex-1 bg-night-dark'>
			{/* Górny pasek */}
			<SafeAreaView edges={["top"]} className='bg-night-gray'>
				<View className='relative w-full items-center justify-center pb-4 px-4'>
					<Pressable
						onPress={() => router.back()}
						className='absolute left-4 top-[6px]'>
						<FontAwesome name='chevron-left' size={20} color='#eee' />
					</Pressable>

					<Text
						className='mt-2 text-center text-2xl font-bold text-light-base tracking-tight'
						numberOfLines={1}>
						{news.title}
					</Text>
				</View>
			</SafeAreaView>

			{/* Główna zawartość */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: "#222831" }}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
				<View className='mt-4 w-full'>
					<Image
						source={news.src}
						className='w-full h-[45vh] rounded-xl'
						resizeMode='cover'
					/>
				</View>

				<View className='mt-4 flex-row justify-between items-start'>
					<View className='flex-1 pr-3'>
						<Text className='text-4xl font-bold text-light-base'>
							{news.title}
						</Text>
						<Text className='mt-1 text-light-subtle'>{formattedDate}</Text>
					</View>

					{/* Badge informacyjny — opcjonalny */}
					<View className='bg-blue-600 rounded-full py-2 px-4'>
						<Text className='text-white font-bold'>News</Text>
					</View>
				</View>

				<View className='mt-4 pb-10'>
					<Text className='text-base font-bold text-light-subtle leading-relaxed'>
						{news.desc}
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}
