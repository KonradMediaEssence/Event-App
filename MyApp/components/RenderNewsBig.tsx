import type { News } from "@/types";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = { item: Pick<News, "id" | "title" | "date" | "src"> };

export default function RenderNewsBig({ item }: Props) {
  const uri =
    typeof item.src === "string" && item.src.startsWith("http")
      ? item.src
      : null;

  const dateLabel = new Date(item.date).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/news/[id]", params: { id: item.id } })
      }
      android_ripple={{ color: "rgba(255,255,255,0.06)" }}
      className="w-full rounded-2xl p-4 mb-4 mt-4 bg-night-gray border border-white/10 shadow-lg"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.97 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View className="rounded-2xl overflow-hidden">
        {uri ? (
          <Image source={{ uri }} className="w-full h-96" resizeMode="cover" />
        ) : (
          <View className="w-full h-96 bg-black/20 items-center justify-center">
            <Text className="text-gray-400">brak zdjęcia</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-2xl font-bold text-light-base" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-base text-light-subtle">{dateLabel}</Text>
      </View>
    </Pressable>
  );
}
