import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at?: string;
};

const UserScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);

        const { data: userData, error: userErr } =
          await supabase.auth.getUser();

        if (!mounted) return;

        if (userErr || !userData.user) {
          console.log("auth getUser error:", userErr?.message);
          setUser(null);
          setProfile(null);
          return;
        }

        setUser(userData.user);

        const { data: prof, error: profErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single();

        if (!mounted) return;

        if (profErr && profErr.code !== "PGRST116") {
          console.log("profiles select error:", profErr.message);
        }

        if (!prof) {
          const fallbackName = userData.user.email?.split("@")[0] ?? "";
          setProfile({
            id: userData.user.id,
            display_name: fallbackName,
            avatar_url: null,
          });
          setDisplayName(fallbackName);
        } else {
          setProfile(prof as Profile);
          setDisplayName((prof as Profile).display_name ?? "");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      if (!session?.user) {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const avatarUri = profile?.avatar_url ?? null;
  const greetingName =
    profile?.display_name || user?.email?.split("@")[0] || "Użytkowniku";

  const handleChangeAvatar = async () => {
    if (!user) return;

    try {
      setAvatarUploading(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Brak uprawnień",
          "Musisz zezwolić na dostęp do galerii, aby zmienić zdjęcie.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      const uri = asset.uri;

      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();

      const ext = asset.fileName?.split(".").pop()?.toLowerCase() || "jpg";
      const mime =
        asset.mimeType ?? (ext === "png" ? "image/png" : "image/jpeg");
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `${user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, arrayBuffer, {
          upsert: true,
          contentType: mime,
        });

      console.log("UPLOAD DATA:", uploadData);
      if (uploadError || !uploadData) {
        console.log("UPLOAD ERROR:", uploadError);
        Alert.alert(
          "Błąd",
          uploadError?.message ||
            "Nie udało się przesłać zdjęcia. Spróbuj ponownie.",
        );
        return;
      }

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;
      console.log("PUBLIC URL:", publicUrl);

      const { error: profErr } = await supabase.from("profiles").upsert({
        id: user.id,
        avatar_url: publicUrl,
      });

      if (profErr) {
        console.log("PROFILE UPDATE ERROR:", profErr);
        Alert.alert(
          "Błąd",
          profErr.message || "Nie udało się zapisać zdjęcia w profilu.",
        );
        return;
      }

      setProfile((prev) =>
        prev
          ? { ...prev, avatar_url: publicUrl }
          : { id: user.id, display_name: fallbackNam, avatar_url: publicUrl },
      );
    } catch (e: any) {
      console.log("change avatar error", e);
      Alert.alert(
        "Błąd",
        e?.message || "Nie udało się przesłać zdjęcia. Spróbuj ponownie.",
      );
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const trimmed = displayName.trim();
    if (!trimmed) {
      Alert.alert("Błąd", "Imię nie może być puste.");
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: trimmed,
        avatar_url: profile?.avatar_url ?? null,
      });

      if (error) {
        console.log("save profile error:", error);
        Alert.alert("Błąd", error.message || "Nie udało się zapisać profilu.");
        return;
      }

      setProfile((prev) =>
        prev
          ? { ...prev, display_name: trimmed }
          : { id: user.id, display_name: trimmed, avatar_url: null },
      );
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = () => {
    setEditing(true);
    setDisplayName(profile?.display_name ?? "");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(tabs)/loginScreen");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-night-dark">
        <ActivityIndicator size="large" color="#00ADB5" />
        <Text className="mt-3 text-light-subtle">Ładowanie profilu...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-night-dark px-6">
        <Text className="text-lg font-semibold text-light-base mb-2">
          Nie jesteś zalogowany.
        </Text>
        <Text className="text-light-subtle text-center">
          Zaloguj się, aby zobaczyć swój profil.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-night-dark">
      <ScrollView
        style={{ backgroundColor: "#222831" }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        <View className="mb-6">
          <Text className="text-light-subtle text-sm mb-1">
            Witaj ponownie, 👋
          </Text>
          <Text className="text-3xl font-extrabold text-light-base">
            {greetingName}
          </Text>
        </View>

        <View className="bg-night-gray rounded-2xl p-4 mb-4 border border-white/10 shadow-lg flex-row items-center">
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="h-16 w-16 rounded-full bg-night-dark mr-4"
            />
          ) : (
            <View className="h-16 w-16 rounded-full bg-night-dark mr-4 items-center justify-center border border-white/10">
              <Text className="text-xl font-bold text-light-base">
                {greetingName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <View className="flex-1">
            <Text className="text-light-base font-semibold text-lg">
              {profile?.display_name || "Brak imienia"}
            </Text>
            <Text className="text-light-subtle text-xs mt-1">{user.email}</Text>

            <Pressable
              onPress={handleChangeAvatar}
              disabled={avatarUploading}
              className="mt-2 self-start px-3 py-1 rounded-full bg-black/30 border border-white/10"
            >
              {avatarUploading ? (
                <ActivityIndicator size="small" color="#EEEEEE" />
              ) : (
                <Text className="text-xs font-semibold text-accent-teal">
                  Zmień zdjęcie
                </Text>
              )}
            </Pressable>
          </View>
        </View>

        <View className="bg-night-gray rounded-2xl p-4 border border-white/10 shadow-lg mb-4">
          <Text className="text-light-base font-semibold mb-3 text-lg">
            Profil
          </Text>

          <Text className="text-light-subtle text-xs mb-1">Imię</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            editable={editing}
            placeholder="Twoje imię"
            placeholderTextColor="#EEEEEE88"
            className={`rounded-xl px-4 py-3 bg-night-dark/60 border text-light-base ${
              editing ? "border-accent-teal" : "border-white/10"
            }`}
          />

          <View className="flex-row justify-end mt-3 space-x-3">
            {editing ? (
              <Pressable
                onPress={handleSaveProfile}
                disabled={saving}
                className={`px-4 py-2 rounded-xl bg-accent-teal items-center justify-center ${
                  saving ? "opacity-60" : ""
                }`}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-sm font-semibold">
                    Zapisz zmiany
                  </Text>
                )}
              </Pressable>
            ) : (
              <Pressable
                onPress={handleStartEdit}
                className="px-4 py-2 rounded-xl bg-accent-teal/20 border border-accent-teal/60"
              >
                <Text className="text-accent-teal text-sm font-semibold">
                  Edytuj profil
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        <Pressable
          onPress={() => router.navigate("/(tabs)/addEvents")}
          className="mt-auto mb-4 bg-accent-teal rounded-xl py-3 items-center justify-center shadow-md shadow-black/40"
        >
          <Text className="text-white text-base font-bold">Dodaj Event</Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate("/(tabs)/addNews")}
          className="mt-auto mb-4 bg-accent-teal rounded-xl py-3 items-center justify-center shadow-md shadow-black/40"
        >
          <Text className="text-white text-base font-bold">Dodaj News</Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          className="mt-auto mb-4 bg-accent-teal rounded-xl py-3 items-center justify-center shadow-md shadow-black/40"
        >
          <Text className="text-white text-base font-bold">Wyloguj się</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;
