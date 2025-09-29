import { SafeAreaView } from "react-native-safe-area-context"
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
	Animated,
} from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { EventList } from "@/DummyData/Data"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useRef, useState } from "react"

export default function EventDetails() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const event = EventList.find(e => e.id === id)

	const [liked, setLiked] = useState(false)

	const scale = useRef(new Animated.Value(1)).current

	const handlePress = () => {
		Animated.sequence([
			Animated.spring(scale, {
				toValue: 1.3,
				useNativeDriver: true,
				speed: 40,
				bounciness: 0,
			}),
			Animated.spring(scale, {
				toValue: 1,
				friction: 3,
				useNativeDriver: true,
			}),
		]).start()

		setLiked(!liked)
	}

	if (!event) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center bg-night-dark'>
				<Text className='text-base text-gray-600'>
					Nie znaleziono wydarzenia.
				</Text>
			</SafeAreaView>
		)
	}

	return (
		<View className='flex-1 bg-night-dark'>
			<SafeAreaView edges={["top"]} className='bg-night-gray'>
				<View className='relative w-full items-center justify-center pb-4 px-4'>
					<Pressable
						onPress={() => router.back()}
						className='absolute left-4 top-[6px]'>
						<FontAwesome name='chevron-left' size={20} color='#eee' />
					</Pressable>
					<Text className='mt-2 text-center text-2xl font-bold text-light-base tracking-tight'>
						{event.title}
					</Text>
					<Pressable
						onPress={handlePress}
						className='absolute right-4 top-[6px]'>
						<Animated.View style={{ transform: [{ scale }] }}>
							<FontAwesome
								name={liked ? "heart" : "heart-o"}
								size={25}
								color={liked ? "red" : "#eee"}
							/>
						</Animated.View>
					</Pressable>
				</View>
			</SafeAreaView>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: "#222831" }} // bg-night-dark
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
				<View className='mt-4 w-full'>
					<Image
						source={event.src}
						className='w-full h-[45vh] rounded-xl'
						resizeMode='cover'
					/>
				</View>

				<View className='mt-4 flex-row justify-between items-center'>
					<View>
						<Text className='text-4xl font-bold text-light-base'>
							{event.title}
						</Text>
						<Text className='mt-1 text-light-subtle'>
							{new Date(event.date).toLocaleDateString("pl-PL", {
								day: "numeric",
								month: "long",
							})}{" "}
							• {event.time}
						</Text>
					</View>

					<View
						className={`${event.cost !== 0 ? "bg-orange-600" : "bg-green-600"} rounded-full py-2 px-4`}>
						<Text className='text-white font-bold'>
							{event.cost === 0 ? "Darmowy" : `${event.cost} zł`}
						</Text>
					</View>
				</View>

				<View className='mt-4 pb-10'>
					<Text className='text-base font-bold text-light-subtle'>
						{event.desc}
					</Text>
				</View>
			</ScrollView>

			<SafeAreaView edges={["bottom"]} className='bg-night-gray'>
				<View className='pt-3 px-4 bg-night-gray'>
					<Pressable
						onPress={() => alert("Zapisano na wydarzenie!")}
						className='rounded-xl bg-accent-teal py-3 items-center justify-center'>
						<Text className='text-white text-lg font-bold'>Zapisz się</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	)
}
