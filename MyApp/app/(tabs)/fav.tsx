import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 ">
      <View>
        <Text className="text-[2rem]">Ulubiony</Text>
      </View>
    </SafeAreaView>
  );
}
