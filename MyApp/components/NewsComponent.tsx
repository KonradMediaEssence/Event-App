import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import RenderNews from "./RenderNews"
import { NewsList } from "@/DummyData/Data"
import RenderNewsBig from "./RenderNewsBig"

const NewsComponent = () => {
	return (
		<SafeAreaView
			className='bg-night-dark flex-1 items-center px-4'
			edges={["top", "left", "right"]}>
			<View className='flex w-full items-center'>
				<Text className='text-2xl font-bold text-light-base tracking-tight mt-2'>
					Zobacz ostatnie wieści
				</Text>
				<Text className='text-sm text-light-subtle mt-2'>
					Bądź na bieżąco z najnowszymi informacjami
				</Text>
			</View>

			<View className='flex-1 w-full mt-4'>
				{NewsList.length === 0 && (
					<View className='flex-1 justify-center items-center'>
						<Text className='text-light-subtle'>
							Brak dostępnych wiadomości.
						</Text>
					</View>
				)}

				<FlatList
					data={NewsList}
					renderItem={({ item, index }) =>
						index === 0 ? (
							<RenderNewsBig item={item} />
						) : (
							<RenderNews item={item} />
						)
					}
					keyExtractor={item => item.id}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={{ backgroundColor: "#222831" }}
					contentContainerStyle={{ paddingBottom: 24 }}
				/>
			</View>
		</SafeAreaView>
	)
}

export default NewsComponent
