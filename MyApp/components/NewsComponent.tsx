import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import RenderNews from "./RenderNews"
import { NewsList } from "@/DummyData/Data"

const NewsComponent = () => {
	return (
		<SafeAreaView
			className='bg-white flex-1 items-center px-4'
			edges={["top", "left", "right"]}>
			<View className='flex w-full items-center'>
				<Text className='text-2xl font-bold text-gray-800 tracking-tight mt-2'>
					Zobacz ostatnie wieści
				</Text>
				<Text className='text-sm text-gray-500 mt-2'>
					Bądź na bieżąco z najnowszymi informacjami
				</Text>
			</View>
			<View className='w-full'>
				{NewsList.length === 0 && (
					<View className='flex-1 justify-center items-center'>
						<Text className='text-gray-500'>Brak dostępnych wiadomości.</Text>
					</View>
				)}
				<FlatList
					data={NewsList}
					renderItem={({ item }) => <RenderNews item={item} />}
					keyExtractor={item => item.id}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</SafeAreaView>
	)
}

export default NewsComponent
