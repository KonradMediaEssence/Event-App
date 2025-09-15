import RenderEventHome from "@/components/RenderEventHome"
import Weather from "@/components/Weather"
import { EventList } from "@/DummyData/Data"
import { router } from "expo-router"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Tab() {
	return (
		<SafeAreaView
			className='flex flex-1 bg-white'
			edges={["top", "left", "right"]}>
			<Weather city='Kalisz' />
			<View className='w-full flex-row items-center justify-between rounded-2xl px-4 pb-3 pt-7'>
				<Text className='text-3xl font-semibold text-gray-900'>
					Nie przegap!
				</Text>
				<Text
					onPress={() => router.push("/events")}
					suppressHighlighting
					className='font-semibold text-gray-900'>
					Zobacz więcej!
				</Text>
			</View>
			<View className='w-full'>
				<FlatList
					className='pb-7'
					data={EventList}
					renderItem={({ item }) => <RenderEventHome item={item} />}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					ItemSeparatorComponent={() => <View className='w-3' />}
					horizontal={true}
					contentContainerStyle={{
						paddingHorizontal: 16,
						alignItems: "flex-start",
					}}
				/>
			</View>
			<View className='px-4'>
				<Text>esadsadsa</Text>
				<Text>esadsadsa</Text>
				<Text>esadsadsa</Text>
				<Text>esadsadsa</Text>
				<Text>esadsadsa</Text>
			</View>
		</SafeAreaView>
	)
}
