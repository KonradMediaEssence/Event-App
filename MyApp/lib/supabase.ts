import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
import { createClient } from "@supabase/supabase-js"
import Constants from "expo-constants"

const extra = Constants.expoConfig?.extra ?? {}
export const supabase = createClient(
	extra.EXPO_PUBLIC_SUPABASE_URL,
	extra.EXPO_PUBLIC_SUPABASE_ANON_KEY
)

export function publicUrl(path?: string | null) {
	if (!path) return null
	return supabase.storage.from("uploads").getPublicUrl(path).data.publicUrl
}
