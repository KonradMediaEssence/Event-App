import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import RenderEvent from "./RenderEvent"
import { useEffect, useState, useCallback } from "react"
import { fetchUpcomingEventsNoLimit } from "@/api"
import type { Event } from "@/types"

const HomeComponent = () => {
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

	return (
		<SafeAreaView
			edges={["top", "left", "right"]}
			className='flex flex-1 items-center px-4 bg-night-dark'>
			<View className='flex w-full items-center'>
				<Text className='text-2xl font-bold text-light-base tracking-tight mt-2'>
					Zbliżające się wydarzenia
				</Text>
				<Text className='text-sm text-light-subtle mt-2'>
					Sprawdź, co już wkrótce się odbędzie
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
						data={events}
						renderItem={({ item }) => <RenderEvent item={item} />}
						keyExtractor={item => item.id}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						style={{ backgroundColor: "#222831" }}
						contentContainerStyle={{ paddingBottom: 24 }}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

export default HomeComponent
