import { supabase } from "@/lib/supabase"
import type { Event } from "@/types"
import { router } from "expo-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

function toEventDateTime(date?: string | null, time?: string | null) {
	if (!date) return null
	const t = (time ?? "00:00").slice(0, 5)
	const dt = new Date(`${date}T${t}:00`)
	return isNaN(dt.getTime()) ? null : dt
}

export default function MapHome() {
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setLoading] = useState(true)

	const mapRef = useRef<MapView>(null)

	useEffect(() => {
		let mounted = true

		const load = async () => {
			try {
				setLoading(true)

				const { data, error } = await supabase
					.from("events")
					.select("id,title,desc,latitude,longitude,date,time") // ważne: date + time
					.not("latitude", "is", null)
					.not("longitude", "is", null)
					.order("date", { ascending: true }) // rosnąco, żeby łatwiej wybrać najbliższy
					.order("time", { ascending: true })

				if (!mounted) return
				if (error) throw error

				setEvents((data ?? []) as Event[])
			} catch {
				if (mounted) setEvents([])
			} finally {
				if (mounted) setLoading(false)
			}
		}

		load()
		return () => {
			mounted = false
		}
	}, [])

	const nextEvent = useMemo(() => {
		if (!events.length) return null

		const now = new Date()

		// najbliższy przyszły
		const upcoming = events
			.map(e => ({
				e,
				dt: toEventDateTime((e as any).date, (e as any).time),
			}))
			.filter(x => !!x.dt)
			.sort((a, b) => a.dt!.getTime() - b.dt!.getTime())
			.find(x => x.dt!.getTime() >= now.getTime())

		if (upcoming) return upcoming.e

		// jeśli nie ma przyszłych -> weź ostatni (najpóźniejszy)
		const last = events[events.length - 1]
		return last ?? null
	}, [events])

	const initialRegion = useMemo(() => {
		return {
			latitude: nextEvent?.latitude ?? 52.2297,
			longitude: nextEvent?.longitude ?? 21.0122,
			latitudeDelta: 3,
			longitudeDelta: 3,
		}
	}, [nextEvent])

	// animacja do najbliższego eventu po załadowaniu
	useEffect(() => {
		if (!nextEvent?.latitude || !nextEvent?.longitude) return

		mapRef.current?.animateToRegion(
			{
				latitude: nextEvent.latitude,
				longitude: nextEvent.longitude,
				latitudeDelta: 0.5,
				longitudeDelta: 0.5,
			},
			650
		)
	}, [nextEvent?.id])

	return (
		<View className='px-4'>
			<View className='w-full flex-row items-center justify-between rounded-2xl px-4 pb-3 pt-7'>
				<Text className='text-3xl font-semibold text-light-base'>Mapa</Text>
				<Text
					onPress={() => router.push("/(tabs)/map")}
					suppressHighlighting
					className='font-semibold text-light-base'>
					Zobacz więcej!
				</Text>
			</View>

			<View style={styles.mapCard} className='bg-dark-card'>
				<MapView
					ref={mapRef}
					style={StyleSheet.absoluteFillObject}
					initialRegion={initialRegion}>
					{events.map(event => (
						<Marker
							key={String(event.id)}
							coordinate={{
								latitude: event.latitude!,
								longitude: event.longitude!,
							}}
							title={event.title}
							description={event.desc ?? undefined}
							// opcjonalnie: wyróżnij najbliższy event
							pinColor={nextEvent?.id === event.id ? "orange" : undefined}
						/>
					))}
				</MapView>

				{loading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator />
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mapCard: {
		height: 250,
		borderRadius: 18,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
})
