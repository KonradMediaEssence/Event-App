import { useCallback, useEffect, useState } from "react"
import {
	View,
	Text,
	Pressable,
	Platform,
	UIManager,
	LayoutAnimation,
	ActivityIndicator,
	RefreshControl,
	ScrollView,
} from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { fetchFaq } from "@/api"
import type { Faq as FaqType } from "@/types"

export default function Faq() {
	const [openId, setOpenId] = useState<string | number | null>(null)
	const [items, setItems] = useState<FaqType[]>([])
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (
			Platform.OS === "android" &&
			UIManager.setLayoutAnimationEnabledExperimental
		) {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])

	const load = useCallback(async () => {
		try {
			const data = await fetchFaq()
			setItems(data)
		} catch (e: any) {
			console.warn("FAQ load error:", e.message)
		} finally {
			setLoading(false)
			setRefreshing(false)
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	const toggle = (id: string | number) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		setOpenId(prev => (prev === id ? null : id))
	}

	return (
		<View className='px-4 mb-10'>
			<View className='w-full flex-row items-center justify-between rounded-2xl pb-5 pt-7'>
				<Text className='text-3xl font-semibold text-white'>
					Pytania i odpowiedzi
				</Text>
			</View>

			{loading ? (
				<View className='py-6 items-center'>
					<ActivityIndicator />
					<Text className='mt-2 text-light-subtle'>Ładowanie…</Text>
				</View>
			) : (
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true)
								load()
							}}
						/>
					}
					showsVerticalScrollIndicator={false}>
					<View className='gap-3'>
						{items.length === 0 ? (
							<View className='py-8 items-center'>
								<Text className='text-light-subtle'>Brak pytań w bazie.</Text>
							</View>
						) : (
							items.map(item => {
								const isOpen = openId === item.id
								return (
									<View
										key={item.id}
										className='rounded-2xl bg-night-gray border border-white/10 shadow-lg overflow-hidden'>
										<Pressable
											onPress={() => toggle(item.id)}
											android_ripple={{
												color: "rgba(255,255,255,0.06)",
												borderless: false,
											}}
											accessibilityRole='button'
											accessibilityState={{ expanded: isOpen }}
											className='flex-row items-center justify-between px-4 py-3'
											style={({ pressed }) => ({
												opacity: pressed ? 0.97 : 1,
												transform: [{ scale: pressed ? 0.98 : 1 }],
											})}>
											<Text
												className='flex-1 pr-3 text-lg font-semibold text-light-base tracking-tight'
												numberOfLines={2}>
												{item.title}
											</Text>

											<View className='h-9 w-9 items-center justify-center rounded-full bg-black/30 border border-white/10'>
												<FontAwesome
													name='chevron-down'
													size={12}
													color='#EEEEEE'
													style={{
														transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
													}}
												/>
											</View>
										</Pressable>

										{isOpen && (
											<View className='px-4 pb-4'>
												<View className='mt-2 rounded-xl bg-black/30 border border-white/10 p-3'>
													<Text className='text-base leading-6 text-light-base'>
														{item.desc}
													</Text>
												</View>
											</View>
										)}
									</View>
								)
							})
						)}
					</View>
				</ScrollView>
			)}
		</View>
	)
}
