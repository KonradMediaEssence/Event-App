import { SafeAreaView } from "react-native-safe-area-context"
import { Pressable, Text, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { EventList, NewsList } from "@/DummyData/Data"
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function NewsDetails() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const news = NewsList.find(e => e.id === id)

	if (!news) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center bg-white'>
				<Text className='text-base text-gray-600'>
					Nie znaleziono wiadomości.
				</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className='flex-1 bg-white px-4'>
			<View className='relative flex w-full items-center justify-center'>
				<Pressable
					onPress={() => router.back()}
					className='absolute left-0 top-[11px]'>
					<FontAwesome name='chevron-left' size={20} color='#111827' />
				</Pressable>
				<Text className='text-center text-2xl font-bold text-gray-800 tracking-tight mt-2'>
					{news.title}
				</Text>
			</View>
			<View className='mt-4'>
				<Text className='text-2xl font-bold text-gray-900'>News nr. {id}</Text>
				<Text className='text-gray-500 mt-1'>
					{news.date instanceof Date
						? news.date.toLocaleDateString("pl-PL")
						: news.date}
				</Text>
			</View>
		</SafeAreaView>
	)
}
