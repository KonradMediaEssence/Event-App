import { useCallback, useEffect, useState } from "react"
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native"
import { router } from "expo-router"
import RenderNewsHomeComponent from "./RenderNewsHomeComponent"
import { fetchNews } from "@/api"
import type { News } from "@/types"

export default function HomeNewsComponent() {
	const [items, setItems] = useState<News[]>([])
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)

	const load = useCallback(async () => {
		try {
			const data = await fetchNews()
			setItems(data.slice(0, 5))
		} catch (e: any) {
			console.warn("HomeNews load error:", e.message)
		} finally {
			setLoading(false)
			setRefreshing(false)
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	return (
		<View className='px-4'>
			<View className='w-full flex-row items-center justify-between rounded-2xl pb-5 pt-7'>
				<Text className='text-3xl font-semibold text-light-base'>
					Aktualności
				</Text>
				<Text
					onPress={() => router.push("/news")}
					suppressHighlighting
					className='font-semibold text-light-base'>
					Zobacz więcej!
				</Text>
			</View>

			{loading ? (
				<View className='py-4'>
					<ActivityIndicator />
					<Text className='mt-2 text-light-subtle'>Ładowanie…</Text>
				</View>
			) : (
				<FlatList
					bounces={false}
					alwaysBounceVertical={false}
					overScrollMode='never'
					directionalLockEnabled
					decelerationRate='fast'
					horizontal
					data={items}
					keyExtractor={item => item.id}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <RenderNewsHomeComponent item={item} />}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true)
								load()
							}}
						/>
					}
					ListEmptyComponent={
						<View className='py-8'>
							<Text className='text-light-subtle'>
								Brak dostępnych wiadomości.
							</Text>
						</View>
					}
				/>
			)}
		</View>
	)
}
