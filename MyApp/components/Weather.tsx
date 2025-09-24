import { ActivityIndicator, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { Image } from "expo-image"

type WeatherResp = {
	name: string
	weather: { id: number; main: string; description: string; icon: string }[]
	main: { temp: number; feels_like: number; humidity: number }
}

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY

export default function Weather({ city = "Warsaw" }: { city?: string }) {
	const [data, setData] = useState<WeatherResp | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				setLoading(true)
				const url =
					`https://api.openweathermap.org/data/2.5/weather` +
					`?q=${encodeURIComponent(city)}&units=metric&lang=pl&appid=${API_KEY}`
				const res = await fetch(url)
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				const json: WeatherResp = await res.json()
				setData(json)
				setError(null)
			} catch (e: any) {
				setError(e.message ?? "Błąd pobierania pogody")
			} finally {
				setLoading(false)
			}
		}
		fetchWeather()
	}, [city])

	if (loading) return <ActivityIndicator />
	if (error) return <Text>Błąd: {error}</Text>
	if (!data) return null
	const icon = data.weather?.[0]?.icon
	const description = data.weather?.[0]?.description
	const prettyDesc = description
		? description[0].toUpperCase() + description.slice(1)
		: ""
	return (
		<View className='px-4 w-full flex-row items-center justify-between rounded-2xl py-3'>
			<View>
				<Text className='text-3xl font-semibold text-light-base'>
					{data.name}
				</Text>
				{!!prettyDesc && (
					<Text className='text-sm text-light-subtle mt-0.5'>{prettyDesc}</Text>
				)}
			</View>

			<View className='flex-row items-center'>
				{!!icon && (
					<Image
						source={`https://openweathermap.org/img/wn/${icon}@2x.png`}
						style={{ width: 44, height: 44, marginRight: 8 }}
						contentFit='contain'
						transition={150}
						cachePolicy='memory-disk'
					/>
				)}
				<Text className='text-2xl font-bold text-light-base'>
					{Math.round(data.main.temp)}°C
				</Text>
			</View>
		</View>
	)
}
