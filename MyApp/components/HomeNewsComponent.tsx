import { NewsList } from "@/DummyData/Data"
import { FlatList, Text, View } from "react-native"
import RenderNewsHomeComponent from "./RenderNewsHomeComponent"
import { router } from "expo-router"

const HomeNewsComponent = () => {
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
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				data={NewsList}
				renderItem={({ item }) => <RenderNewsHomeComponent item={item} />}
			/>
		</View>
	)
}

export default HomeNewsComponent
