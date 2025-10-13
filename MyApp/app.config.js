import "dotenv/config"

export default {
	expo: {
		name: "MyApp",
		slug: "MyApp",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/goiczi.jpeg",
		scheme: "myapp",
		userInterfaceStyle: "dark",
		androidStatusBar: {
			backgroundColor: "#222831",
			barStyle: "light-content",
			translucent: false,
		},
		androidNavigationBar: {
			backgroundColor: "#222831",
			barStyle: "light-content",
			visible: "sticky-immersive",
		},
		newArchEnabled: true,
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				backgroundColor: "#222831",
				foregroundImage: "./assets/images/android-icon-foreground.png",
				backgroundImage: "./assets/images/android-icon-background.png",
				monochromeImage: "./assets/images/android-icon-monochrome.png",
			},
			edgeToEdgeEnabled: true,
			predictiveBackGestureEnabled: false,
		},
		web: {
			output: "static",
			favicon: "./assets/images/goiczi.jpeg",
			bundler: "metro",
		},
		plugins: [
			"expo-router",
			[
				"expo-splash-screen",
				{
					image: "./assets/images/splash-icon.png",
					imageWidth: 200,
					resizeMode: "contain",
					backgroundColor: "#222831",
					dark: { backgroundColor: "#222831" },
				},
			],
		],
		experiments: { typedRoutes: true, reactCompiler: true },

		extra: {
			EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
			EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
		},
	},
}
