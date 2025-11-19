import type { News } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = { item: Pick<News, "id" | "title" | "date" | "src"> };

const RenderNews = ({ item }: Props) => {
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
      className="w-full bg-night-gray rounded-xl p-4 mb-3 border border-white/10 shadow-md flex-row items-center justify-between"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.97 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      <View className="flex-row items-center gap-4">
        {uri ? (
          <Image
            source={{ uri }}
            className="w-16 h-16 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-black/20 items-center justify-center">
            <Text className="text-gray-400 text-xs">brak zdjęcia</Text>
          </View>
        )}

        <View>
          <Text
            className="text-lg font-semibold text-light-base"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text className="text-sm text-light-subtle">{dateLabel}</Text>
        </View>
      </View>

      <FontAwesome size={15} name="chevron-right" color="#EEEEEE99" />
    </Pressable>
  );
};

export default RenderNews;
