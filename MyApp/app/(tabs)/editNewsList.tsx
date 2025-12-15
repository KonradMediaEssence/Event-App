import { supabase } from "@/lib/supabase"
import { useFocusEffect } from "@react-navigation/native"
import { router } from "expo-router"
import { useCallback, useState } from "react"
import { ActivityIndicator, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type NewsRow = {
	id: string
	title: string
	date: string
	desc?: string | null
	src?: string | null
}

export default function EditNewsList() {
	const [news, setNews] = useState<NewsRow[]>([])
	const [loading, setLoading] = useState(true)

	const load = useCallback(async () => {
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from("news")
				.select("id,title,date,desc,src")
				.order("date", { ascending: false })

			if (error) throw error
			setNews((data ?? []) as NewsRow[])
		} catch (e: any) {
			console.log("NEWS LIST LOAD ERROR:", e?.message ?? e)
			setNews([])
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
					Edycja Newsów
				</Text>
				<Text className='text-sm text-light-subtle mt-1'>
					Kliknij news aby go edytować
				</Text>
			</View>

			{loading ? (
				<View className='py-6 items-center'>
					<ActivityIndicator />
					<Text className='mt-2 text-light-subtle'>Ładowanie…</Text>
				</View>
			) : (
				<View className='mt-4 gap-3'>
					{news.map(n => (
						<Pressable
							key={String(n.id)}
							onPress={() =>
								router.push({
									pathname: "/editNews/[id]",
									params: { id: String(n.id) },
								})
							}
							className='rounded-2xl bg-night-gray border border-white/10 p-4'>
							<Text className='text-light-base text-lg font-bold'>
								{n.title}
							</Text>
							<Text className='text-light-subtle mt-1'>{String(n.date)}</Text>
							{!!n.desc && (
								<Text className='text-light-subtle mt-1' numberOfLines={2}>
									{n.desc}
								</Text>
							)}
						</Pressable>
					))}

					{!news.length && (
						<Text className='text-light-subtle mt-6 text-center'>
							Brak newsów.
						</Text>
					)}
				</View>
			)}
		</SafeAreaView>
	)
}
