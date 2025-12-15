import { supabase } from "@/lib/supabase"
import type { Event } from "@/types"
import * as ImagePicker from "expo-image-picker"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import {
	ActivityIndicator,
	Alert,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"
import MapView, { MapPressEvent, Marker } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"

const EVENT_BUCKET = "uploads"

const CATEGORY_OPTIONS = [
	"Muzyka",
	"Teatr",
	"Sztuka",
	"Kino",
	"Literatura",
	"Sport",
	"Festiwal",
	"Targi",
	"Rodzina",
	"Kulinaria",
	"Stand-up",
	"Taniec",
	"Edukacja",
	"Biznes",
	"Kultura",
	"Religia",
	"Technologia",
	"Plener",
	"Święto",
]

export default function EditEvent() {
	const { id } = useLocalSearchParams<{ id: string }>()

	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [deleting, setDeleting] = useState(false)

	const [title, setTitle] = useState("")
	const [date, setDate] = useState("")
	const [time, setTime] = useState("")
	const [category, setCategory] = useState("")
	const [cost, setCost] = useState("")
	const [desc, setDesc] = useState("")

	const [placeName, setPlaceName] = useState("")
	const [address, setAddress] = useState("")
	const [latitude, setLatitude] = useState<string>("")
	const [longitude, setLongitude] = useState<string>("")

	const [categoryModalVisible, setCategoryModalVisible] = useState(false)

	const [imageLocalUri, setImageLocalUri] = useState<string | null>(null)
	const [imagePath, setImagePath] = useState<string | null>(null)
	const [imageUploading, setImageUploading] = useState(false)

	const subtle = "#EEEEEECC"

	useEffect(() => {
		if (!id) return
		let mounted = true

		const load = async () => {
			try {
				setLoading(true)

				const { data, error } = await supabase
					.from("events")
					.select("*")
					.eq("id", id)

				if (!mounted) return

				if (error) {
					console.log("LOAD ERROR:", error)
					Alert.alert(
						"Błąd",
						error.message || "Nie udało się wczytać wydarzenia."
					)
					router.back()
					return
				}

				const row = (data ?? [])[0]
				if (!row) {
					Alert.alert("Błąd", "Nie znaleziono wydarzenia.")
					router.back()
					return
				}

				const ev = row as any as Event & any

				setTitle(ev.title ?? "")
				setDate(ev.date ?? "")
				setTime(String(ev.time ?? "").slice(0, 5))
				setCategory(ev.category ?? "")
				setCost(typeof ev.cost === "number" ? String(ev.cost) : (ev.cost ?? ""))
				setDesc(ev.desc ?? "")

				setPlaceName(ev.place_name ?? "")
				setAddress(ev.address ?? "")
				setLatitude(ev.latitude != null ? String(ev.latitude) : "")
				setLongitude(ev.longitude != null ? String(ev.longitude) : "")

				setImagePath(ev.src ?? null)
				setImageLocalUri(null)
			} catch (e: any) {
				console.log("LOAD CATCH:", e?.message ?? e)
				Alert.alert("Błąd", e?.message || "Nie udało się wczytać wydarzenia.")
				router.back()
			} finally {
				if (mounted) setLoading(false)
			}
		}

		load()
		return () => {
			mounted = false
		}
	}, [id])

	const handlePickImage = async () => {
		try {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
			if (status !== "granted") {
				Alert.alert(
					"Brak uprawnień",
					"Zezwól na dostęp do galerii, aby zmienić zdjęcie."
				)
				return
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.8,
			})

			if (result.canceled) return
			const asset = result.assets[0]
			setImageLocalUri(asset.uri)
		} catch (e: any) {
			Alert.alert("Błąd", e?.message || "Nie udało się wybrać zdjęcia.")
		}
	}

	const uploadImageIfNeeded = async (): Promise<string | null> => {
		if (!imageLocalUri) return imagePath ?? null

		try {
			setImageUploading(true)

			const response = await fetch(imageLocalUri)
			const arrayBuffer = await response.arrayBuffer()

			const ext = "jpg"
			const mime = "image/jpeg"
			const fileName = `${Date.now()}.${ext}`
			const filePath = `events/${fileName}`

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from(EVENT_BUCKET)
				.upload(filePath, arrayBuffer, { contentType: mime, upsert: true })

			if (uploadError || !uploadData) {
				console.log("UPLOAD ERROR:", uploadError)
				Alert.alert(
					"Błąd",
					uploadError?.message || "Nie udało się przesłać zdjęcia."
				)
				return null
			}

			setImagePath(filePath)
			return filePath
		} catch (e: any) {
			console.log("UPLOAD CATCH:", e?.message ?? e)
			Alert.alert("Błąd", e?.message || "Nie udało się przesłać zdjęcia.")
			return null
		} finally {
			setImageUploading(false)
		}
	}

	const getPreviewUrl = () => {
		if (imageLocalUri) return imageLocalUri
		if (imagePath) {
			const { data } = supabase.storage
				.from(EVENT_BUCKET)
				.getPublicUrl(imagePath)
			return data.publicUrl
		}
		return null
	}

	const handleMapPress = (e: MapPressEvent) => {
		const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate
		setLatitude(String(lat))
		setLongitude(String(lng))
	}

	const handleSave = async () => {
		if (!id) return

		if (!title.trim() || !date.trim() || !time.trim()) {
			Alert.alert("Błąd", "Tytuł, data i godzina są wymagane.")
			return
		}

		const normalizedCost = cost.replace(",", ".")
		const costNumber = normalizedCost ? Number(normalizedCost) : 0
		if (normalizedCost && Number.isNaN(costNumber)) {
			Alert.alert("Błąd", "Cena musi być liczbą.")
			return
		}

		const latStr = latitude.trim().replace(",", ".")
		const lngStr = longitude.trim().replace(",", ".")

		const latNumber =
			latStr.length > 0 && !Number.isNaN(Number(latStr)) ? Number(latStr) : null
		const lngNumber =
			lngStr.length > 0 && !Number.isNaN(Number(lngStr)) ? Number(lngStr) : null

		if ((latStr && latNumber === null) || (lngStr && lngNumber === null)) {
			Alert.alert("Błąd", "Nieprawidłowe współrzędne (np. 52.2297 / 21.0122).")
			return
		}

		try {
			setSaving(true)

			const finalImagePath = await uploadImageIfNeeded()
			if (imageLocalUri && !finalImagePath) return

			const payload = {
				title: title.trim(),
				date,
				time: time.length === 5 ? `${time}:00` : time,
				src: finalImagePath || null,
				category: category.trim() || null,
				cost: costNumber,
				desc: desc.trim() || null,
				place_name: placeName.trim() || null,
				address: address.trim() || null,
				latitude: latNumber,
				longitude: lngNumber,
			}

			const { data: updatedRows, error } = await supabase
				.from("events")
				.update(payload)
				.eq("id", id)
				.select("*")

			if (error) {
				console.log("UPDATE ERROR:", error)
				Alert.alert(
					"Błąd zapisu",
					error.message || "Nie udało się zapisać zmian."
				)
				return
			}

			if (!updatedRows || updatedRows.length === 0) {
				Alert.alert(
					"Błąd zapisu",
					"Nie zaktualizowano żadnego rekordu (0). Najczęściej: RLS/policies blokują UPDATE albo id nie pasuje."
				)
				return
			}

			if (updatedRows.length > 1) {
				Alert.alert(
					"Błąd struktury danych",
					`Zaktualizowano ${updatedRows.length} rekordy. Masz duplikaty id w events — ustaw UNIQUE/PRIMARY KEY na events.id.`
				)
				return
			}

			Alert.alert("Sukces", "Zapisano zmiany ✅")
			router.back()
		} catch (e: any) {
			console.log("UPDATE CATCH:", e?.message ?? e)
			Alert.alert("Błąd", e?.message || "Nie udało się zapisać zmian.")
		} finally {
			setSaving(false)
		}
	}

	const handleDeleteEvent = async () => {
		if (!id) return
		if (deleting) return

		Alert.alert("Usuń wydarzenie?", "Tej operacji nie da się cofnąć.", [
			{ text: "Anuluj", style: "cancel" },
			{
				text: "Usuń",
				style: "destructive",
				onPress: async () => {
					try {
						setDeleting(true)

						const { error: delErr } = await supabase
							.from("events")
							.delete()
							.eq("id", id)
						if (delErr) {
							console.log("DELETE ERROR:", delErr)
							Alert.alert(
								"Błąd",
								delErr.message || "Nie udało się usunąć wydarzenia."
							)
							return
						}

						if (imagePath) {
							const { error: storageErr } = await supabase.storage
								.from(EVENT_BUCKET)
								.remove([imagePath])

							if (storageErr) {
								console.log("STORAGE REMOVE ERROR (ignored):", storageErr)
							}
						}

						Alert.alert("Usunięto", "Wydarzenie zostało usunięte.")
						router.back()
					} catch (e: any) {
						console.log("DELETE CATCH:", e?.message ?? e)
						Alert.alert(
							"Błąd",
							e?.message || "Nie udało się usunąć wydarzenia."
						)
					} finally {
						setDeleting(false)
					}
				},
			},
		])
	}

	const previewUrl = getPreviewUrl()

	if (loading) {
		return (
			<SafeAreaView className='flex-1 bg-night-dark items-center justify-center'>
				<ActivityIndicator />
				<Text className='mt-2 text-light-subtle'>Ładowanie…</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className='flex-1 bg-night-dark'>
			<ScrollView
				style={{ backgroundColor: "#222831" }}
				contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
				keyboardShouldPersistTaps='handled'>
				<Text className='text-3xl font-extrabold text-light-base mb-4'>
					Edytuj wydarzenie
				</Text>

				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>Tytuł*</Text>
					<TextInput
						value={title}
						onChangeText={setTitle}
						placeholder='Nazwa wydarzenia'
						placeholderTextColor={subtle}
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
					/>
				</View>

				<View className='mb-4 flex-row gap-3'>
					<View className='flex-1'>
						<Text className='mb-2 text-light-subtle'>Data* (YYYY-MM-DD)</Text>
						<TextInput
							value={date}
							onChangeText={setDate}
							placeholder='2025-11-16'
							placeholderTextColor={subtle}
							className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
						/>
					</View>

					<View className='flex-1'>
						<Text className='mb-2 text-light-subtle'>Godzina* (HH:MM)</Text>
						<TextInput
							value={time}
							onChangeText={setTime}
							placeholder='18:00'
							placeholderTextColor={subtle}
							className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
						/>
					</View>
				</View>

				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>Zdjęcie wydarzenia</Text>

					<View className='bg-night-gray rounded-2xl border border-white/10 p-3'>
						{previewUrl ? (
							<Image
								source={{ uri: previewUrl }}
								className='w-full h-40 rounded-xl mb-3'
								resizeMode='cover'
							/>
						) : (
							<View className='w-full h-24 rounded-xl mb-3 bg-night-dark/60 border border-dashed border-white/20 items-center justify-center'>
								<Text className='text-light-subtle text-xs'>Brak zdjęcia</Text>
							</View>
						)}

						<Pressable
							onPress={handlePickImage}
							disabled={imageUploading}
							className='self-start px-4 py-2 rounded-xl bg-accent-teal/20 border border-accent-teal/70'>
							{imageUploading ? (
								<ActivityIndicator size='small' color='#FFFFFF' />
							) : (
								<Text className='text-accent-teal text-sm font-semibold'>
									{previewUrl ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
								</Text>
							)}
						</Pressable>
					</View>
				</View>

				<View className='mb-4 flex-row gap-3'>
					<View className='flex-1'>
						<Text className='mb-2 text-light-subtle'>Kategoria</Text>

						<Pressable
							onPress={() => setCategoryModalVisible(true)}
							className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 flex-row items-center justify-between'>
							<Text
								className={`text-base ${category ? "text-light-base" : "text-light-subtle"}`}>
								{category || "Wybierz kategorię..."}
							</Text>
						</Pressable>
					</View>

					<View className='w-28'>
						<Text className='mb-2 text-light-subtle'>Cena (zł)</Text>
						<TextInput
							value={cost}
							onChangeText={setCost}
							placeholder='0 / 50'
							placeholderTextColor={subtle}
							keyboardType='numeric'
							className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
						/>
					</View>
				</View>

				<View className='mb-6'>
					<Text className='mb-2 text-light-subtle'>Opis</Text>
					<TextInput
						value={desc}
						onChangeText={setDesc}
						placeholder='Krótki opis wydarzenia...'
						placeholderTextColor={subtle}
						multiline
						numberOfLines={4}
						textAlignVertical='top'
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
					/>
				</View>

				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>Miejsce (nazwa)</Text>
					<TextInput
						value={placeName}
						onChangeText={setPlaceName}
						placeholder='Np. Hala Stulecia...'
						placeholderTextColor={subtle}
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base mb-3'
					/>

					<Text className='mb-2 text-light-subtle'>Adres</Text>
					<TextInput
						value={address}
						onChangeText={setAddress}
						placeholder='Np. ul. Długa 5, Warszawa'
						placeholderTextColor={subtle}
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
					/>
				</View>

				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>
						Lokalizacja (kliknij na mapie)
					</Text>

					<View className='flex-row gap-3 mb-3'>
						<View className='flex-1'>
							<Text className='text-light-subtle text-xs mb-1'>
								Szerokość (lat)
							</Text>
							<TextInput
								value={latitude}
								onChangeText={setLatitude}
								placeholder='52.2297'
								placeholderTextColor={subtle}
								keyboardType='decimal-pad'
								className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
							/>
						</View>
						<View className='flex-1'>
							<Text className='text-light-subtle text-xs mb-1'>
								Długość (lng)
							</Text>
							<TextInput
								value={longitude}
								onChangeText={setLongitude}
								placeholder='21.0122'
								placeholderTextColor={subtle}
								keyboardType='decimal-pad'
								className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
							/>
						</View>
					</View>

					<View style={styles.mapCard}>
						<MapView
							style={StyleSheet.absoluteFillObject}
							initialRegion={{
								latitude:
									latitude && !Number.isNaN(Number(latitude))
										? Number(latitude)
										: 52.2297,
								longitude:
									longitude && !Number.isNaN(Number(longitude))
										? Number(longitude)
										: 21.0122,
								latitudeDelta: 3,
								longitudeDelta: 3,
							}}
							onPress={handleMapPress}>
							{latitude &&
								longitude &&
								!Number.isNaN(Number(latitude)) &&
								!Number.isNaN(Number(longitude)) && (
									<Marker
										coordinate={{
											latitude: Number(latitude),
											longitude: Number(longitude),
										}}
										title={placeName || title || "Lokalizacja wydarzenia"}
									/>
								)}
						</MapView>
					</View>
				</View>

				<Pressable
					onPress={handleSave}
					disabled={saving || imageUploading || deleting}
					className={`rounded-xl bg-accent-teal py-3 items-center justify-center ${
						saving || imageUploading || deleting ? "opacity-60" : ""
					}`}>
					{saving || imageUploading ? (
						<ActivityIndicator color='#FFFFFF' />
					) : (
						<Text className='text-white text-base font-bold'>
							Zapisz zmiany
						</Text>
					)}
				</Pressable>

				<Pressable
					onPress={handleDeleteEvent}
					disabled={saving || imageUploading || deleting}
					className={`mt-3 rounded-xl bg-red-600/90 py-3 items-center justify-center ${
						saving || imageUploading || deleting ? "opacity-60" : ""
					}`}>
					{deleting ? (
						<ActivityIndicator color='#FFFFFF' />
					) : (
						<Text className='text-white text-base font-bold'>Usuń event</Text>
					)}
				</Pressable>
			</ScrollView>

			<Modal
				visible={categoryModalVisible}
				transparent
				animationType='fade'
				onRequestClose={() => setCategoryModalVisible(false)}>
				<View className='flex-1 bg-black/60 justify-center px-8'>
					<View className='bg-night-gray rounded-2xl border border-white/10 p-4 max-h-[70%]'>
						<Text className='text-light-base text-lg font-semibold mb-3'>
							Wybierz kategorię
						</Text>

						<ScrollView className='mb-3'>
							{CATEGORY_OPTIONS.map(cat => (
								<TouchableOpacity
									key={cat}
									onPress={() => {
										setCategory(cat)
										setCategoryModalVisible(false)
									}}
									className='py-2 px-2 rounded-lg flex-row items-center justify-between'>
									<Text
										className={`text-base ${category === cat ? "text-accent-teal" : "text-light-base"}`}>
										{cat}
									</Text>
									{category === cat && (
										<Text className='text-accent-teal text-sm font-semibold'>
											✓
										</Text>
									)}
								</TouchableOpacity>
							))}
						</ScrollView>

						<Pressable
							onPress={() => setCategoryModalVisible(false)}
							className='mt-1 rounded-xl bg-accent-teal py-2 items-center justify-center'>
							<Text className='text-white font-semibold'>Zamknij</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	mapCard: {
		height: 220,
		borderRadius: 18,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
		marginTop: 4,
	},
})
