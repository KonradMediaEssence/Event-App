import { SafeAreaView } from "react-native-safe-area-context"
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
	Animated,
	ActivityIndicator,
	Alert,
} from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useEffect, useMemo, useRef, useState } from "react"
import { supabase, publicUrl } from "@/lib/supabase"
import type { Event } from "@/types"
import type { User } from "@supabase/supabase-js"

export default function EventDetails() {
	const { id } = useLocalSearchParams<{ id: string }>()

	const [event, setEvent] = useState<Event | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [isFavourite, setIsFavourite] = useState(false)
	const [favSaving, setFavSaving] = useState(false)

	const scale = useRef(new Animated.Value(1)).current

	useEffect(() => {
		if (!id) return

		let mounted = true

		const load = async () => {
			try {
				setLoading(true)

				const { data: userData } = await supabase.auth.getUser()
				if (!mounted) return
				setUser(userData.user ?? null)

				const { data, error } = await supabase
					.from("events")
					.select("*")
					.eq("id", id)
					.single()

				if (!mounted) return

				if (error || !data) {
					setEvent(null)
					setIsFavourite(false)
					return
				}

				setEvent(data as Event)

				if (userData.user) {
					const { data: fav, error: favErr } = await supabase
						.from("event_favourites")
						.select("id")
						.eq("user_id", userData.user.id)
						.eq("event_id", data.id)
						.maybeSingle()

					if (!mounted) return

					if (favErr) {
						setIsFavourite(false)
					} else {
						setIsFavourite(!!fav)
					}
				} else {
					setIsFavourite(false)
				}
			} finally {
				if (mounted) setLoading(false)
			}
		}

		load()

		return () => {
			mounted = false
		}
	}, [id])

	const imgUri = useMemo(() => publicUrl(event?.src ?? null), [event?.src])

	const handleToggleFavourite = async () => {
		if (!event) return
		if (favSaving) return // blokada spamu clicków

		if (!user) {
			Alert.alert("Logowanie wymagane", "Zaloguj się, aby dodać do ulubionych.")
			return
		}

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

		const next = !isFavourite
		setIsFavourite(next)

		try {
			setFavSaving(true)

			if (next) {
				const { error } = await supabase.from("event_favourites").insert({
					user_id: user.id,
					event_id: event.id,
				})

				if (error) throw error
			} else {
				const { error } = await supabase
					.from("event_favourites")
					.delete()
					.eq("user_id", user.id)
					.eq("event_id", event.id)

				if (error) throw error
			}
		} catch (e: any) {
			Alert.alert(
				"Błąd",
				e?.message || "Nie udało się zaktualizować ulubionych."
			)
			setIsFavourite(!next)
		} finally {
			setFavSaving(false)
		}
	}

	if (loading) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center bg-night-dark'>
				<ActivityIndicator />
				<Text className='mt-2 text-gray-400'>Ładowanie…</Text>
			</SafeAreaView>
		)
	}

	if (!event) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center bg-night-dark'>
				<Text className='text-base text-gray-400'>
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
						onPress={handleToggleFavourite}
						className='absolute right-4 top-[6px]'>
						<Animated.View style={{ transform: [{ scale }] }}>
							<FontAwesome
								name={isFavourite ? "heart" : "heart-o"}
								size={25}
								color={isFavourite ? "red" : "#eee"}
							/>
						</Animated.View>
					</Pressable>
				</View>
			</SafeAreaView>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: "#222831" }}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
				<View className='mt-4 w-full'>
					{imgUri ? (
						<Image
							source={{ uri: imgUri }}
							className='w-full h-[45vh] rounded-xl'
							resizeMode='cover'
						/>
					) : (
						<View className='w-full h-[45vh] rounded-xl bg-black/30 items-center justify-center'>
							<Text className='text-gray-400'>brak zdjęcia</Text>
						</View>
					)}
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
						className={`${
							event.cost !== 0 ? "bg-orange-600" : "bg-green-600"
						} rounded-full py-2 px-4`}>
						<Text className='text-white font-bold'>
							{event.cost === 0 ? "Darmowy" : `${event.cost} zł`}
						</Text>
					</View>
				</View>

				<View className='mt-4 pb-10'>
					{!!event.desc && (
						<Text className='text-base font-bold text-light-subtle'>
							{event.desc}
						</Text>
					)}
				</View>
			</ScrollView>

			<SafeAreaView edges={["bottom"]} className='bg-night-gray'>
				<View className='pt-3 px-4 bg-night-gray'>
					<Pressable
						onPress={() =>
							Alert.alert(
								"Zapisano",
								isFavourite
									? "To wydarzenie jest w Twoich ulubionych ❤️"
									: "Dodaj do ulubionych, aby mieć je pod ręką."
							)
						}
						className='rounded-xl bg-accent-teal py-3 items-center justify-center'>
						<Text className='text-white text-lg font-bold'>Zapisz się</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	)
}
