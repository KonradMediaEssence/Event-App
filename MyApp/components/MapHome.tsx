import { router } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

const mockEvents = [
	{
		id: "1",
		title: "Koncert",
		latitude: 52.2297,
		longitude: 21.0122,
	},
	{
		id: "2",
		title: "Stand-up",
		latitude: 52.4064,
		longitude: 16.9252,
	},
]

const MapHome = () => {
	return (
		<View className=' px-4'>
			<View className='w-full flex-row items-center justify-between rounded-2xl px-4 pb-3 pt-7'>
				<Text className='text-3xl font-semibold text-light-base'>Mapa</Text>
				<Text
					onPress={() => router.push("/(tabs)/map")}
					suppressHighlighting
					className='font-semibold text-light-base'>
					Zobacz więcej!
				</Text>
			</View>

			<View style={styles.mapCard} className='bg-dark-card'>
				<MapView
					style={StyleSheet.absoluteFillObject}
					initialRegion={{
						latitude: 52.2297,
						longitude: 21.0122,
						latitudeDelta: 3,
						longitudeDelta: 3,
					}}>
					{mockEvents.map(event => (
						<Marker
							key={event.id}
							coordinate={{
								latitude: event.latitude,
								longitude: event.longitude,
							}}
							title={event.title}
						/>
					))}
				</MapView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mapCard: {
		height: 250,
		borderRadius: 18,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
	},
})

export default MapHome
