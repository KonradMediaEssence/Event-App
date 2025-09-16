import { SafeAreaView } from "react-native-safe-area-context"
import { Image, Pressable, Text, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { EventList } from "@/DummyData/Data"
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function EventDetails() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const event = EventList.find(e => e.id === id)

	if (!event) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center bg-white'>
				<Text className='text-base text-gray-600'>
					Nie znaleziono wydarzenia.
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
					{event.title}
				</Text>
			</View>
			<View className='mt-4 w-full'>
				<Image
					source={event.src}
					className='w-full h-[45vh] rounded-xl'
					resizeMode='cover'
				/>
			</View>

			<View className='mt-4'>
				<Text className='text-2xl font-bold text-gray-900'>
					Evenet nr. {id}
				</Text>
				<Text className='text-gray-500 mt-1'>
					{event.date instanceof Date
						? event.date.toLocaleDateString("pl-PL")
						: event.date}
				</Text>
			</View>
		</SafeAreaView>
	)
}
