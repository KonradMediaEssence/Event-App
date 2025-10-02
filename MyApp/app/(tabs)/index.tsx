import Faq from "@/components/Faq"
import HomeNewsComponent from "@/components/HomeNewsComponent"
import RenderEventHome from "@/components/RenderEventHome"
import Weather from "@/components/Weather"
import { EventList } from "@/DummyData/Data"
import { router } from "expo-router"
import { FlatList, Text, View, Dimensions, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")
const SIDE_PADDING = 13
const CARD_SPACING = 14
const PEEK = 20
const CARD_WIDTH = width - SIDE_PADDING * 2 - PEEK

export default function Tab() {
	return (
		<SafeAreaView
			className='flex flex-1 bg-night-dark'
			edges={["top", "left", "right"]}>
			<Weather city='Czajków' />
			<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
				<View className='w-full flex-row items-center justify-between rounded-2xl px-4 pb-3 pt-7'>
					<Text className='text-3xl font-semibold text-light-base'>
						Nie przegap!
					</Text>
					<Text
						onPress={() => router.push("/events")}
						suppressHighlighting
						className='font-semibold text-light-base'>
						Zobacz więcej!
					</Text>
				</View>
				<View className='w-full'>
					<FlatList
						horizontal
						data={EventList}
						keyExtractor={item => item.id}
						showsHorizontalScrollIndicator={false}
						decelerationRate='fast'
						snapToAlignment='start'
						snapToInterval={Math.round(CARD_WIDTH + CARD_SPACING)}
						disableIntervalMomentum
						contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
						ItemSeparatorComponent={() => (
							<View style={{ width: CARD_SPACING }} />
						)}
						ListFooterComponent={<View style={{ width: PEEK }} />}
						renderItem={({ item }) => (
							<View style={{ width: CARD_WIDTH }}>
								<RenderEventHome item={item} />
							</View>
						)}
					/>
				</View>
				<HomeNewsComponent />
				<Faq />
			</ScrollView>
		</SafeAreaView>
	)
}
