import { EventList } from "@/DummyData/Data"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import RenderEvent from "./RenderEvent"

const HomeComponent = () => {
	return (
		<SafeAreaView
			edges={["top", "left", "right"]}
			className='flex flex-1 items-center px-4 bg-night-dark'>
			<View className='flex w-full items-center'>
				<Text className='text-2xl font-bold text-light-base tracking-tight mt-2'>
					Zbliżające się wydarzenia
				</Text>
				<Text className='text-sm text-light-subtle mt-2'>
					Sprawdź, co już wkrótce się odbędzie
				</Text>
			</View>

			<View className='w-full flex-1 mt-4'>
				<FlatList
					data={EventList}
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

export default HomeComponent
