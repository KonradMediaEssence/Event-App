import { useState } from "react"
import {
	Platform,
	KeyboardAvoidingView,
	Pressable,
	Text,
	TextInput,
	View,
	ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const LoginScreen = () => {
	const [passwordSecure, setPasswordSecure] = useState(true)
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const router = useRouter()

	const subtle = "#EEEEEECC" // z tailwinda: light.subtle (80%)

	return (
		<SafeAreaView className='flex-1 bg-night-dark'>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className='flex-1'>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
					style={{ backgroundColor: "#222831" }} // night-dark
				>
					<View className='flex-1 px-5 justify-center'>
						{/* Brand / header */}
						<View className='items-center mb-8'>
							<View className='h-16 w-16 rounded-full bg-night-gray items-center justify-center shadow-lg border border-white/10'>
								<Ionicons name='calendar' size={28} color='#00ADB5' />
							</View>
							<Text className='mt-4 text-3xl font-extrabold text-light-base tracking-tight'>
								Zaloguj się
							</Text>
						</View>

						{/* Card */}
						<View className='bg-night-gray rounded-2xl p-5 shadow-lg border border-white/10'>
							{/* Email */}
							<View className='mb-4'>
								<Text className='mb-2 text-light-subtle'>Email</Text>
								<TextInput
									value={email}
									onChangeText={setEmail}
									placeholder='twoj@email.com'
									placeholderTextColor={subtle}
									keyboardType='email-address'
									autoCapitalize='none'
									className='rounded-xl px-4 py-3 bg-night-dark/60 border border-white/10 text-light-base'
								/>
							</View>

							{/* Password */}
							<View className='mb-2'>
								<Text className='mb-2 text-light-subtle'>Hasło</Text>
								<View className='flex-row items-center rounded-xl bg-night-dark/60 border border-white/10 px-4'>
									<TextInput
										value={pass}
										onChangeText={setPass}
										placeholder='••••••••'
										placeholderTextColor={subtle}
										secureTextEntry={passwordSecure}
										className='flex-1 py-3 text-light-base'
									/>
									<Pressable
										onPress={() => setPasswordSecure(!passwordSecure)}
										hitSlop={8}>
										<Ionicons
											name={passwordSecure ? "eye-off" : "eye"}
											size={22}
											color={subtle}
										/>
									</Pressable>
								</View>
							</View>

							<Pressable className='self-end mt-2'>
								<Text className='text-xs text-light-subtle'>
									Zapomniałeś hasła?
								</Text>
							</Pressable>

							{/* CTA */}
							<Pressable
								onPress={() => router.replace("/(tabs)")}
								className='mt-5 rounded-xl bg-accent-teal py-3 items-center justify-center shadow-lg shadow-black/40'>
								<Text className='text-white text-base font-bold'>
									Zaloguj się
								</Text>
							</Pressable>

							{/* Secondary */}
							<View className='mt-4 flex-row justify-center'>
								<Text className='text-light-subtle'>Nie masz konta? </Text>
								<Pressable onPress={() => router.push("/(tabs)/register")}>
									<Text className='font-semibold text-accent-teal'>
										Zarejestruj się
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default LoginScreen
