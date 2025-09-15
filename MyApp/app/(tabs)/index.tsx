import Weather from "@/components/Weather"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Tab() {
	return (
		<SafeAreaView
			className='flex flex-1 items-center px-4 bg-white'
			edges={["top", "left", "right"]}>
			<Weather city='Kalisz' />
		</SafeAreaView>
	)
}
