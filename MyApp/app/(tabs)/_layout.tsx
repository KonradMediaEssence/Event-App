import "../../global.css"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { StatusBar } from "react-native"

export default function TabLayout() {
	return (
		<>
			<StatusBar backgroundColor='#0B132B' animated translucent={false} />
			<Tabs
				screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
				<Tabs.Screen
					name='news'
					options={{
						title: "News",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name='newspaper-o' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='index'
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name='home' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='events'
					options={{
						title: "Wydarzenia",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name='calendar' color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	)
}
