import { supabase } from "@/lib/supabase"
import * as ImagePicker from "expo-image-picker"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useMemo, useState } from "react"
import {
	ActivityIndicator,
	Alert,
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const NEWS_BUCKET = "uploads"
const NEWS_FOLDER = "news"

type NewsRow = {
	id: string
	title: string
	date: string
	desc?: string | null
	src?: string | null
}

function extractStoragePathFromPublicUrl(publicUrl: string) {
	const marker = `/storage/v1/object/public/${NEWS_BUCKET}/`
	const idx = publicUrl.indexOf(marker)
	if (idx === -1) return null
	return publicUrl.slice(idx + marker.length)
}

export default function EditNews() {
	const { id } = useLocalSearchParams<{ id: string }>()

	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [deleting, setDeleting] = useState(false)

	const [title, setTitle] = useState("")
	const [date, setDate] = useState("")
	const [desc, setDesc] = useState("")

	const [imageLocalUri, setImageLocalUri] = useState<string | null>(null)
	const [imageRemoteUrl, setImageRemoteUrl] = useState<string | null>(null)
	const [imageUploading, setImageUploading] = useState(false)

	const subtle = "#EEEEEECC"

	useEffect(() => {
		if (!id) return
		let mounted = true

		const load = async () => {
			try {
				setLoading(true)

				const { data, error } = await supabase
					.from("news")
					.select("*")
					.eq("id", id)

				if (!mounted) return

				if (error) {
					console.log("LOAD NEWS ERROR:", error)
					Alert.alert("Błąd", error.message || "Nie udało się wczytać newsa.")
					router.back()
					return
				}

				const row = (data ?? [])[0] as NewsRow | undefined
				if (!row) {
					Alert.alert("Błąd", "Nie znaleziono newsa.")
					router.back()
					return
				}

				setTitle(row.title ?? "")
				setDate(row.date ?? "")
				setDesc(row.desc ?? "")
				setImageRemoteUrl(row.src ?? null)
				setImageLocalUri(null)
			} catch (e: any) {
				console.log("LOAD NEWS CATCH:", e?.message ?? e)
				Alert.alert("Błąd", e?.message || "Nie udało się wczytać newsa.")
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
				Alert.alert("Brak uprawnień", "Musisz zezwolić na dostęp do galerii.")
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
		if (!imageLocalUri) return imageRemoteUrl

		try {
			setImageUploading(true)

			const response = await fetch(imageLocalUri)
			const arrayBuffer = await response.arrayBuffer()

			const ext = "jpg"
			const mime = "image/jpeg"
			const fileName = `${Date.now()}.${ext}`
			const filePath = `${NEWS_FOLDER}/${fileName}`

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from(NEWS_BUCKET)
				.upload(filePath, arrayBuffer, { contentType: mime, upsert: true })

			if (uploadError || !uploadData) {
				console.log("UPLOAD NEWS ERROR:", uploadError)
				Alert.alert(
					"Błąd",
					uploadError?.message || "Nie udało się przesłać zdjęcia."
				)
				return null
			}

			const { data: publicData } = supabase.storage
				.from(NEWS_BUCKET)
				.getPublicUrl(filePath)
			const publicUrl = publicData.publicUrl

			setImageRemoteUrl(publicUrl)
			return publicUrl
		} catch (e: any) {
			console.log("UPLOAD NEWS CATCH:", e?.message ?? e)
			Alert.alert("Błąd", e?.message || "Nie udało się przesłać zdjęcia.")
			return null
		} finally {
			setImageUploading(false)
		}
	}

	const previewUrl = useMemo(
		() => imageLocalUri || imageRemoteUrl,
		[imageLocalUri, imageRemoteUrl]
	)

	// -------- SAVE --------
	const handleSave = async () => {
		if (!id) return
		if (!title.trim() || !date.trim()) {
			Alert.alert("Błąd", "Tytuł i data są wymagane.")
			return
		}

		try {
			setSaving(true)

			const finalImageUrl = await uploadImageIfNeeded()
			if (imageLocalUri && !finalImageUrl) return

			const payload = {
				title: title.trim(),
				date,
				desc: desc.trim() || null,
				src: finalImageUrl || null,
			}

			const { data: updatedRows, error } = await supabase
				.from("news")
				.update(payload)
				.eq("id", id)
				.select("*")

			if (error) {
				console.log("NEWS UPDATE ERROR:", error)
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
					`Zaktualizowano ${updatedRows.length} rekordy. Masz duplikaty id w news — ustaw UNIQUE/PRIMARY KEY na news.id.`
				)
				return
			}

			Alert.alert("Sukces", "Zapisano zmiany ✅")
			router.back()
		} catch (e: any) {
			console.log("NEWS UPDATE CATCH:", e?.message ?? e)
			Alert.alert("Błąd", e?.message || "Nie udało się zapisać zmian.")
		} finally {
			setSaving(false)
		}
	}

	// -------- DELETE --------
	const handleDelete = async () => {
		if (!id) return
		if (deleting) return

		Alert.alert("Usuń news?", "Tej operacji nie da się cofnąć.", [
			{ text: "Anuluj", style: "cancel" },
			{
				text: "Usuń",
				style: "destructive",
				onPress: async () => {
					try {
						setDeleting(true)

						// zapamiętaj stare URL (żeby ewentualnie usunąć plik)
						const oldUrl = imageRemoteUrl

						const { error: delErr } = await supabase
							.from("news")
							.delete()
							.eq("id", id)
						if (delErr) {
							console.log("NEWS DELETE ERROR:", delErr)
							Alert.alert(
								"Błąd",
								delErr.message || "Nie udało się usunąć newsa."
							)
							return
						}

						// opcjonalnie: usuń plik ze storage
						if (oldUrl) {
							const path = extractStoragePathFromPublicUrl(oldUrl)
							if (path) {
								const { error: storageErr } = await supabase.storage
									.from(NEWS_BUCKET)
									.remove([path])
								if (storageErr)
									console.log(
										"NEWS STORAGE REMOVE ERROR (ignored):",
										storageErr
									)
							}
						}

						Alert.alert("Usunięto", "News został usunięty.")
						router.back()
					} catch (e: any) {
						console.log("NEWS DELETE CATCH:", e?.message ?? e)
						Alert.alert("Błąd", e?.message || "Nie udało się usunąć newsa.")
					} finally {
						setDeleting(false)
					}
				},
			},
		])
	}

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
					Edytuj news
				</Text>

				{/* Tytuł */}
				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>Tytuł*</Text>
					<TextInput
						value={title}
						onChangeText={setTitle}
						placeholder='Nagłówek newsa'
						placeholderTextColor={subtle}
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
					/>
				</View>

				{/* Data */}
				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>Data* (YYYY-MM-DD)</Text>
					<TextInput
						value={date}
						onChangeText={setDate}
						placeholder='2025-11-16'
						placeholderTextColor={subtle}
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
					/>
				</View>

				{/* Zdjęcie */}
				<View className='mb-4'>
					<Text className='mb-2 text-light-subtle'>Zdjęcie newsa</Text>

					<View className='bg-night-gray rounded-2xl border border-white/10 p-3'>
						{previewUrl ? (
							<Image
								source={{ uri: previewUrl }}
								className='w-full h-40 rounded-xl mb-3'
								resizeMode='cover'
							/>
						) : (
							<View className='w-full h-24 rounded-xl mb-3 bg-night-dark/60 border border-dashed border-white/20 items-center justify-center'>
								<Text className='text-light-subtle text-xs'>
									Brak zdjęcia – dodaj obrazek newsa
								</Text>
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

				{/* Opis */}
				<View className='mb-6'>
					<Text className='mb-2 text-light-subtle'>Treść / opis</Text>
					<TextInput
						value={desc}
						onChangeText={setDesc}
						placeholder='Krótki opis lub treść newsa...'
						placeholderTextColor={subtle}
						multiline
						numberOfLines={4}
						textAlignVertical='top'
						className='rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base'
					/>
				</View>

				{/* ZAPISZ */}
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
					onPress={handleDelete}
					disabled={saving || imageUploading || deleting}
					className={`mt-3 rounded-xl bg-red-600/90 py-3 items-center justify-center ${
						saving || imageUploading || deleting ? "opacity-60" : ""
					}`}>
					{deleting ? (
						<ActivityIndicator color='#FFFFFF' />
					) : (
						<Text className='text-white text-base font-bold'>Usuń news</Text>
					)}
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	)
}
