import "../global.css"
import { Stack } from "expo-router"
import { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import * as SystemUI from "expo-system-ui"

export default function Layout() {
	useEffect(() => {
		SystemUI.setBackgroundColorAsync("#222831")
	}, [])

	return (
		<>
			<StatusBar style='light' />

			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#222831" },
				}}>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
		</>
	)
}
