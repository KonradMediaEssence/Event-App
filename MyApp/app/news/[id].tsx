import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useMemo, useState } from "react";
import { supabase, publicUrl } from "@/lib/supabase";
import type { News } from "@/types";

export default function NewsDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("news details load error:", error);
        setNews(null);
      } else {
        setNews(data as News);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  const imgUri = useMemo(() => {
    const src = news?.src;
    if (!src) return null;

    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    return publicUrl(src);
  }, [news?.src]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-night-dark">
        <ActivityIndicator />
        <Text className="mt-2 text-gray-400">Ładowanie…</Text>
      </SafeAreaView>
    );
  }

  if (!news) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-night-dark">
        <Text className="text-base text-gray-400">
          Nie znaleziono wiadomości.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-night-dark">
      <SafeAreaView edges={["top"]} className="bg-night-gray">
        <View className="relative w-full items-center justify-center pb-4 px-4">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-4 top-[6px]"
          >
            <FontAwesome name="chevron-left" size={20} color="#eee" />
          </Pressable>

          <Text
            className="mt-2 text-center text-2xl font-bold text-light-base tracking-tight"
            numberOfLines={1}
          >
            {news.title}
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#222831" }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <View className="mt-4 w-full">
          {imgUri ? (
            <Image
              source={{ uri: imgUri }}
              className="w-full h-[45vh] rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-[45vh] rounded-xl bg-black/30 items-center justify-center">
              <Text className="text-gray-400">brak zdjęcia</Text>
            </View>
          )}
        </View>

        <View className="mt-4 flex-row justify-between items-start">
          <View className="flex-1 pr-3">
            <Text className="text-4xl font-bold text-light-base">
              {news.title}
            </Text>
            <Text className="mt-1 text-light-subtle">
              {new Date(news.date).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>

          <View className="bg-blue-600 rounded-full py-2 px-4">
            <Text className="text-white font-bold">News</Text>
          </View>
        </View>

        <View className="mt-4 pb-10">
          {!!news.desc && (
            <Text className="text-base font-bold text-light-subtle leading-relaxed">
              {news.desc}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
