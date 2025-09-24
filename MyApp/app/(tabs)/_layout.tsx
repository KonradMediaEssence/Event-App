import { Tabs } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { StatusBar } from "react-native"
import { Dimensions, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")
const guidelineBaseWidth = 375
const scale = (size: number) => (width / guidelineBaseWidth) * size
const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor

export default function TabLayout() {
	const insets = useSafeAreaInsets()

	const isSmall = width < 360
	const labelSize = Math.round(moderateScale(11))
	const iconSize = Math.round(moderateScale(24))

	const baseBarHeight = Math.round(moderateScale(56))
	const barHeight = Math.max(50, Math.min(64, baseBarHeight))
	const paddingTop = Platform.select({ ios: 6, android: 4 })!
	const paddingBottom = Math.max(insets.bottom, 6)

	return (
		<>
			<StatusBar backgroundColor='#0B1328' animated translucent={false} />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: "#00ADB5",
					tabBarInactiveTintColor: "#EEEEEE",
					tabBarShowLabel: !isSmall,
					tabBarStyle: {
						backgroundColor: "#393E46",
						borderTopColor: "white/10",
						height: barHeight + paddingBottom,
						paddingTop,
						paddingBottom,
					},
					tabBarLabelStyle: {
						fontSize: labelSize,
						marginBottom: 2,
					},
					tabBarItemStyle: { paddingVertical: 0 },
					tabBarIconStyle: { marginTop: 0 },
				}}>
				<Tabs.Screen
					name='news'
					options={{
						title: "News",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={iconSize} name='newspaper-o' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='events'
					options={{
						title: "Wydarzenia",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={iconSize} name='calendar' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='index'
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={iconSize} name='home' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='fav'
					options={{
						title: "Ulubione",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={iconSize} name='heart-o' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='loginScreen'
					options={{
						title: "Logowanie",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={iconSize} name='user-o' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='register'
					options={{
						href: null,
						headerShown: false,
					}}
				/>
			</Tabs>
		</>
	)
}
