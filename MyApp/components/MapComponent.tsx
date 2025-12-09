import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"

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

const MapComponent = () => {
	const [loading, setIsLoading] = useState(false)

	return (
		<SafeAreaView
			edges={["top", "left", "right"]}
			className='flex flex-1 items-center px-4 bg-night-dark'>
			<View className='flex w-full items-center'>
				<Text className='text-2xl font-bold text-light-base tracking-tight mt-2'>
					Zbliżające się wydarzenia
				</Text>
				<Text className='text-sm text-light-subtle mt-2'>
					Sprawdź, wydarzenia na mapie!
				</Text>
			</View>

			<View className='w-full flex-1 mt-4'>
				{loading ? (
					<View className='py-6 items-center'>
						<ActivityIndicator />
						<Text className='mt-2 text-light-subtle'>Ładowanie wydarzeń…</Text>
					</View>
				) : (
					<View style={styles.mapCard} className='bg-dark-card mb-4'>
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
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	mapCard: {
		flex: 1,
		borderRadius: 18,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
	},
})

export default MapComponent
