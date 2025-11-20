import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import RenderEvent from "@/components/RenderEvent";
import type { Event } from "@/types";
import { fetchFavouriteEvents } from "@/api";

export default function Fav() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchFavouriteEvents();
      setEvents(data);
    } catch (e: any) {
      console.warn("Fav load error:", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      load();
    }, [load]),
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-night-dark">
        <ActivityIndicator />
        <Text className="mt-2 text-light-subtle">Ładowanie…</Text>
      </SafeAreaView>
    );
  }

  if (events.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4 bg-night-dark">
        <Text className="text-2xl text-light-base">Brak ulubionych.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex flex-1 items-center px-4 bg-night-dark"
    >
      <View className="w-full flex-row items-center justify-center py-4">
        <Text className="text-3xl font-semibold text-light-base">Ulubione</Text>
      </View>

      <View className="w-full flex-1">
        <FlatList
          data={events}
          renderItem={({ item }) => <RenderEvent item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#222831" }}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
}
