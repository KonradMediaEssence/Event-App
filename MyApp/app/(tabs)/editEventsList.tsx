import { supabase } from "@/lib/supabase"
import type { Event } from "@/types"
import { useFocusEffect } from "@react-navigation/native"
import { router } from "expo-router"
import { useCallback, useState } from "react"
import { ActivityIndicator, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function EventsAdminList() {
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setLoading] = useState(true)

	const load = useCallback(async () => {
		try {
			setLoading(true)

			const { data, error } = await supabase
				.from("events")
				.select("id,title,date,time,category,cost")
				.order("date", { ascending: true })
				.order("time", { ascending: true })

			if (error) throw error
			setEvents((data ?? []) as Event[])
		} catch (e: any) {
			console.log("LIST LOAD ERROR:", e?.message ?? e)
			setEvents([])
		} finally {
			setLoading(false)
		}
	}, [])

	useFocusEffect(
		useCallback(() => {
			load()
		}, [load])
	)

	return (
		<SafeAreaView
			className='flex-1 bg-night-dark px-4'
			edges={["top", "left", "right"]}>
			<View className='mt-2'>
				<Text className='text-2xl font-bold text-light-base'>
					Edycja Eventów
				</Text>
				<Text className='text-sm text-light-subtle mt-1'>
					Kliknij event aby go edytować
				</Text>
			</View>

			{loading ? (
				<View className='py-6 items-center'>
					<ActivityIndicator />
					<Text className='mt-2 text-light-subtle'>Ładowanie…</Text>
				</View>
			) : (
				<View className='mt-4 gap-3'>
					{events.map(e => (
						<Pressable
							key={String(e.id)}
							onPress={() =>
								router.push({
									pathname: "/editEvents/[id]",
									params: { id: String(e.id) },
								})
							}
							className='rounded-2xl bg-night-gray border border-white/10 p-4'>
							<Text className='text-light-base text-lg font-bold'>
								{e.title}
							</Text>
							<Text className='text-light-subtle mt-1'>
								{String((e as any).date)} • {String((e as any).time ?? "")}
							</Text>
							{!!(e as any).category && (
								<Text className='text-light-subtle mt-1'>
									Kategoria: {(e as any).category}
								</Text>
							)}
						</Pressable>
					))}

					{!events.length && (
						<Text className='text-light-subtle mt-6 text-center'>
							Brak wydarzeń.
						</Text>
					)}
				</View>
			)}
		</SafeAreaView>
	)
}
