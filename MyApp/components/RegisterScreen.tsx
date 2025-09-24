import { useState } from "react"
import {
	Platform,
	KeyboardAvoidingView,
	Pressable,
	Text,
	TextInput,
	View,
	ScrollView,
	Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const RegisterScreen = () => {
	const router = useRouter()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [pass1, setPass1] = useState("")
	const [pass2, setPass2] = useState("")

	const [secure1, setSecure1] = useState(true)
	const [secure2, setSecure2] = useState(true)

	const [error, setError] = useState<string | null>(null)

	const subtle = "#EEEEEECC"

	const isValidEmail = (v: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

	const canSubmit =
		name.trim().length > 1 &&
		isValidEmail(email) &&
		pass1.length >= 6 &&
		pass1 === pass2

	const onRegister = () => {
		if (!canSubmit) {
			if (!name.trim()) return setError("Podaj imię.")
			if (!isValidEmail(email)) return setError("Nieprawidłowy email.")
			if (pass1.length < 6) return setError("Hasło min. 6 znaków.")
			if (pass1 !== pass2) return setError("Hasła nie są takie same.")
			return
		}
		setError(null)
		// tu podłączisz realne API; na razie nawigacja:
		Alert.alert("Sukces", "Konto utworzone!")
		router.replace("/(tabs)")
	}

	return (
		<SafeAreaView className='flex-1 bg-night-dark'>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className='flex-1'>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
					style={{ backgroundColor: "#222831" }}>
					<View className='flex-1 px-5 justify-center'>
						{/* Header */}
						<View className='items-center mb-8'>
							<View className='h-16 w-16 rounded-full bg-night-gray items-center justify-center shadow-lg border border-white/10'>
								<Ionicons name='person-add' size={28} color='#00ADB5' />
							</View>
							<Text className='mt-4 text-3xl font-extrabold text-light-base tracking-tight'>
								Zarejestruj się
							</Text>
						</View>
						<View className='bg-night-gray rounded-2xl p-5 shadow-lg border border-white/10'>
							<View className='mb-4'>
								<Text className='mb-2 text-light-subtle'>Imię</Text>
								<TextInput
									value={name}
									onChangeText={setName}
									placeholder='Jan'
									placeholderTextColor={subtle}
									className='rounded-xl px-4 py-3 bg-night-dark/60 border border-white/10 text-light-base'
								/>
							</View>

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

							{/* Hasło */}
							<View className='mb-4'>
								<Text className='mb-2 text-light-subtle'>Hasło</Text>
								<View className='flex-row items-center rounded-xl bg-night-dark/60 border border-white/10 px-4'>
									<TextInput
										value={pass1}
										onChangeText={setPass1}
										placeholder='••••••••'
										placeholderTextColor={subtle}
										secureTextEntry={secure1}
										className='flex-1 py-3 text-light-base'
									/>
									<Pressable onPress={() => setSecure1(!secure1)} hitSlop={8}>
										<Ionicons
											name={secure1 ? "eye-off" : "eye"}
											size={22}
											color={subtle}
										/>
									</Pressable>
								</View>
								<Text className='mt-1 text-[11px] text-light-subtle'>
									Min. 6 znaków
								</Text>
							</View>

							{/* Powtórz hasło */}
							<View className='mb-2'>
								<Text className='mb-2 text-light-subtle'>Powtórz hasło</Text>
								<View className='flex-row items-center rounded-xl bg-night-dark/60 border border-white/10 px-4'>
									<TextInput
										value={pass2}
										onChangeText={setPass2}
										placeholder='••••••••'
										placeholderTextColor={subtle}
										secureTextEntry={secure2}
										className='flex-1 py-3 text-light-base'
									/>
									<Pressable onPress={() => setSecure2(!secure2)} hitSlop={8}>
										<Ionicons
											name={secure2 ? "eye-off" : "eye"}
											size={22}
											color={subtle}
										/>
									</Pressable>
								</View>
							</View>

							{/* Error */}
							{error ? (
								<Text className='mt-2 text-[12px] text-rose-400'>{error}</Text>
							) : null}

							{/* CTA */}
							<Pressable
								onPress={onRegister}
								disabled={!canSubmit}
								className={`mt-5 rounded-xl bg-accent-teal py-3 items-center justify-center shadow-lg shadow-black/40 ${
									!canSubmit ? "opacity-50" : ""
								}`}>
								<Text className='text-white text-base font-bold'>
									Zarejestruj się
								</Text>
							</Pressable>

							{/* Secondary */}
							<View className='mt-4 flex-row justify-center'>
								<Text className='text-light-subtle'>Masz już konto? </Text>
								<Pressable onPress={() => router.push("/(tabs)/loginScreen")}>
									<Text className='font-semibold text-accent-teal'>
										Zaloguj się
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			{/* Jeśli chcesz, możesz dodać: <SafeAreaView edges={["bottom"]} className="bg-night-gray" /> */}
		</SafeAreaView>
	)
}

export default RegisterScreen
