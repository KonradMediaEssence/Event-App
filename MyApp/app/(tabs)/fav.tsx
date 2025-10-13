import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import RenderEvent from "@/components/RenderEvent"
import { fetchUpcomingEventsNoLimit } from "@/api"
import type { Event } from "@/types"
import { useCallback, useEffect, useState } from "react"

export default function Fav() {
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setLoading] = useState(true)

	const load = useCallback(async () => {
		try {
			const data = await fetchUpcomingEventsNoLimit()
			setEvents(data)
		} catch (e: any) {
			console.warn("Events load error:", e.message)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	const favorites = events.filter(e => e.is_favourite)

	if (favorites.length === 0) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center px-4 bg-night-dark'>
				<Text className='text-2xl text-light-base'>Brak ulubionych.</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView
			edges={["top", "left", "right"]}
			className='flex flex-1 items-center px-4 bg-night-dark'>
			<View className='w-full flex-row items-center justify-between py-4'>
				<Text className='text-3xl font-semibold text-center w-full text-light-base'>
					Ulubione
				</Text>
			</View>
			<View className='w-full flex-1 mt-4'>
				{loading ? (
					<View className='py-6 items-center'>
						<ActivityIndicator />
						<Text className='mt-2 text-light-subtle'>Ładowanie wydarzeń…</Text>
					</View>
				) : (
					<FlatList
						data={favorites}
						renderItem={({ item }) => <RenderEvent item={item} />}
						keyExtractor={item => item.id}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						style={{ backgroundColor: "#222831" }} // night-dark
						contentContainerStyle={{ paddingBottom: 24 }}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}
