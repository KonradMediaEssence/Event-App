import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const RegisterScreen = () => {
	const [passwordSecure, setPasswordSecure] = useState(true)
	const router = useRouter()
	return (
		<SafeAreaView className='px-4 flex-1 justify-center'>
			<View className='items-center mb-6'>
				<Text className='text-3xl font-bold'>Zarejestruj się!</Text>
			</View>
			<View className='gap-4'>
				<TextInput className='border py-3 px-2 rounded' placeholder='Imię' />
				<TextInput className='border py-3 px-2 rounded' placeholder='Email' />
				<View className='flex-row items-center border rounded px-2'>
					<TextInput
						className='flex-1 py-3'
						placeholder='Hasło'
						secureTextEntry={passwordSecure}
					/>
					<Pressable onPress={() => setPasswordSecure(!passwordSecure)}>
						<Ionicons
							name={passwordSecure ? "eye-off" : "eye"}
							size={23}
							color='gray'
						/>
					</Pressable>
				</View>
				<View className='flex-row items-center border rounded px-2'>
					<TextInput
						className='flex-1 py-3'
						placeholder='Powtórz hasło'
						secureTextEntry={passwordSecure}
					/>
					<Pressable onPress={() => setPasswordSecure(!passwordSecure)}>
						<Ionicons
							name={passwordSecure ? "eye-off" : "eye"}
							size={23}
							color='gray'
						/>
					</Pressable>
				</View>
			</View>
			<View className='mt-4'>
				<Pressable className='bg-blue-600 py-3 rounded'>
					<Text className='text-center text-white font-semibold'>
						Zarejestruj się
					</Text>
				</Pressable>
				<Pressable
					className='mt-2'
					onPress={() => router.push("/(tabs)/loginScreen")}>
					<Text className='text-center text-blue-600 font-semibold'>
						Zaloguj się
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

export default RegisterScreen
