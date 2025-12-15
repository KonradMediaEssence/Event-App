import { supabase } from "@/lib/supabase"
import type { Event } from "@/types"
import { useEffect, useMemo, useRef, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"

function toEventDateTime(date?: string | null, time?: string | null) {
	if (!date) return null
	const t = (time ?? "00:00").slice(0, 5) // HH:mm
	const dt = new Date(`${date}T${t}:00`)
	return isNaN(dt.getTime()) ? null : dt
}

const MapComponent = () => {
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setIsLoading] = useState(true)
	const mapRef = useRef<MapView>(null)

	useEffect(() => {
		let mounted = true

		const load = async () => {
			try {
				setIsLoading(true)

				const { data, error } = await supabase
					.from("events")
					.select("id,title,desc,latitude,longitude,date,time")
					.not("latitude", "is", null)
					.not("longitude", "is", null)
					.order("date", { ascending: true })
					.order("time", { ascending: true })

				if (!mounted) return
				if (error) throw error

				setEvents((data ?? []) as Event[])
			} catch {
				if (mounted) setEvents([])
			} finally {
				if (mounted) setIsLoading(false)
			}
		}

		load()
		return () => {
			mounted = false
		}
	}, [])

	// wybierz najbliższy przyszły event, a jak brak przyszłych -> ostatni
	const nextEvent = useMemo(() => {
		if (!events.length) return null
		const now = new Date()

		const upcoming = events
			.map(e => ({ e, dt: toEventDateTime((e as any).date, (e as any).time) }))
			.filter(x => !!x.dt)
			.sort((a, b) => a.dt!.getTime() - b.dt!.getTime())
			.find(x => x.dt!.getTime() >= now.getTime())

		return upcoming?.e ?? events[events.length - 1] ?? null
	}, [events])

	const initialRegion = useMemo(() => {
		return {
			latitude: nextEvent?.latitude ?? 52.2297,
			longitude: nextEvent?.longitude ?? 21.0122,
			latitudeDelta: 3,
			longitudeDelta: 3,
		}
	}, [nextEvent])

	// po załadowaniu danych animuj do najbliższego eventu
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
		<SafeAreaView
			edges={["top", "left", "right"]}
			className='flex flex-1 items-center px-4 bg-night-dark'>
			<View className='flex w-full items-center'>
				<Text className='text-2xl font-bold text-light-base tracking-tight mt-2'>
					Zbliżające się wydarzenia
				</Text>
				<Text className='text-sm text-light-subtle mt-2'>
					Sprawdź, wydarzenia na mapie!
				</Text>
			</View>

			<View className='w-full flex-1 mt-4'>
				{loading ? (
					<View className='py-6 items-center'>
						<ActivityIndicator />
						<Text className='mt-2 text-light-subtle'>Ładowanie wydarzeń…</Text>
					</View>
				) : (
					<View style={styles.mapCard} className='bg-dark-card mb-4'>
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

						{/* jak nie ma eventów */}
						{!events.length && (
							<View style={styles.emptyOverlay}>
								<Text className='text-light-subtle'>
									Brak wydarzeń z lokalizacją.
								</Text>
							</View>
						)}
					</View>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	mapCard: {
		flex: 1,
		borderRadius: 18,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
	},
	emptyOverlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
})

export default MapComponent
