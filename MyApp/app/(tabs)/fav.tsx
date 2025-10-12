import { EventList } from "@/DummyData/Data"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, Text, View } from "react-native"
import RenderEvent from "@/components/RenderEvent"

export default function tab() {
	const favorites = EventList.filter(e => e.isFavourite)

	if (favorites.length === 0) {
		return (
			<SafeAreaView className='flex-1 items-center justify-center px-4 bg-night-dark'>
				<Text className='text-2xl text-light-base'>Brak ulubionych.</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView
			edges={["top", "left", "right"]}
			className='flex flex-1 items-center px-4 bg-night-dark'>
			<View className='w-full flex-row items-center justify-between py-4'>
				<Text className='text-3xl font-semibold text-center w-full text-light-base'>
					Ulubione
				</Text>
			</View>
			<View className='w-full flex-1 mt-4'>
				<FlatList
					data={favorites}
					renderItem={({ item }) => <RenderEvent item={item} />}
					keyExtractor={item => item.id}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={{ backgroundColor: "#222831" }} // night-dark
					contentContainerStyle={{ paddingBottom: 24 }}
				/>
			</View>
		</SafeAreaView>
	)
}
