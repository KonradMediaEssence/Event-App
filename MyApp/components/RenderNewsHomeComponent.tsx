import { Image, Pressable, Text, View } from "react-native";
import type { News } from "@/types";
import { publicUrl } from "@/lib/supabase";

type Props = {
  item: Pick<News, "id" | "title" | "date" | "src">;
  onPress: () => void;
};

const getNewsImageUri = (src: string | null | undefined) => {
  if (!src) return null;

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return publicUrl(src);
};

export default function RenderNewsHomeComponent({ item, onPress }: Props) {
  const uri = getNewsImageUri(item.src);

  const dateLabel = new Date(item.date).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.06)" }}
      className="mr-3 w-64 rounded-2xl bg-night-gray border border-white/10 shadow-md"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.97 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View className="rounded-t-2xl overflow-hidden">
        {uri ? (
          <Image source={{ uri }} className="w-full h-32" resizeMode="cover" />
        ) : (
          <View className="w-full h-32 bg-black/20 items-center justify-center">
            <Text className="text-gray-400 text-xs">brak zdjęcia</Text>
          </View>
        )}
      </View>

      <View className="p-3">
        <Text
          className="text-base font-semibold text-light-base"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text className="mt-1 text-xs text-light-subtle">{dateLabel}</Text>
      </View>
    </Pressable>
  );
}
