import "../../global.css"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
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
	)
}
