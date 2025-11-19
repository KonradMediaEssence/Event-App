import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderNews from "./RenderNews";
import RenderNewsBig from "./RenderNewsBig";
import { fetchNews } from "@/api";
import type { News } from "@/types";

export default function NewsComponent() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchNews();
      setItems(data);
    } catch (e: any) {
      console.warn("News load error:", e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SafeAreaView
      className="bg-night-dark flex-1 items-center px-4"
      edges={["top", "left", "right"]}
    >
      <View className="flex w-full items-center">
        <Text className="text-2xl font-bold text-light-base tracking-tight mt-2">
          Zobacz ostatnie wieści
        </Text>
        <Text className="text-sm text-light-subtle mt-2">
          Bądź na bieżąco z najnowszymi informacjami
        </Text>
      </View>

      <View className="flex-1 w-full mt-4">
        {loading ? (
          <View className="py-8 items-center">
            <ActivityIndicator />
            <Text className="mt-2 text-light-subtle">Ładowanie newsów…</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) =>
              index === 0 ? (
                <RenderNewsBig item={item} />
              ) : (
                <RenderNews item={item} />
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  load();
                }}
              />
            }
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center py-24">
                <Text className="text-light-subtle">
                  Brak dostępnych wiadomości.
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#222831" }}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
