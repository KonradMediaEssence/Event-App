import { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";

const NEWS_BUCKET = "uploads";
const NEWS_FOLDER = "news";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const [saving, setSaving] = useState(false);

  const [imageLocalUri, setImageLocalUri] = useState<string | null>(null);
  const [imageRemoteUrl, setImageRemoteUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const subtle = "#EEEEEECC";

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Brak uprawnień",
          "Musisz zezwolić na dostęp do galerii, aby dodać zdjęcie.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      setImageLocalUri(asset.uri);
      setImageRemoteUrl(null);
    } catch (e: any) {
      console.log("news pick image error:", e);
      Alert.alert(
        "Błąd",
        e?.message || "Nie udało się wybrać zdjęcia. Spróbuj ponownie.",
      );
    }
  };

  const uploadImageIfNeeded = async (): Promise<string | null> => {
    if (!imageLocalUri) return imageRemoteUrl;
    if (imageRemoteUrl) return imageRemoteUrl;

    try {
      setImageUploading(true);

      const response = await fetch(imageLocalUri);
      const arrayBuffer = await response.arrayBuffer();

      const ext = "jpg";
      const mime = "image/jpeg";
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `${NEWS_FOLDER}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(NEWS_BUCKET)
        .upload(filePath, arrayBuffer, {
          contentType: mime,
          upsert: true,
        });

      console.log("NEWS UPLOAD DATA:", uploadData);

      if (uploadError || !uploadData) {
        console.log("news image upload error:", uploadError);
        Alert.alert(
          "Błąd",
          uploadError?.message ||
            "Nie udało się przesłać zdjęcia. Spróbuj ponownie.",
        );
        return null;
      }

      const { data: publicData } = supabase.storage
        .from(NEWS_BUCKET)
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;
      setImageRemoteUrl(publicUrl);
      return publicUrl;
    } catch (e: any) {
      console.log("news image upload exception:", e);
      Alert.alert(
        "Błąd",
        e?.message || "Nie udało się przesłać zdjęcia. Spróbuj ponownie.",
      );
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleAddNews = async () => {
    if (!title.trim() || !date.trim()) {
      Alert.alert("Błąd", "Tytuł i data są wymagane.");
      return;
    }

    try {
      setSaving(true);

      const finalImageUrl = await uploadImageIfNeeded();
      const newId = Date.now().toString();

      const { error } = await supabase.from("news").insert([
        {
          id: newId,
          title: title.trim(),
          date,
          src: finalImageUrl || null,
          desc: desc.trim() || null,
        },
      ]);

      if (error) {
        console.log("add news error:", error);
        Alert.alert("Błąd", error.message || "Nie udało się dodać newsa.");
        return;
      }

      Alert.alert("Sukces", "News został dodany 🎉");

      setTitle("");
      setDate("");
      setDesc("");
      setImageLocalUri(null);
      setImageRemoteUrl(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-night-dark">
      <ScrollView
        style={{ backgroundColor: "#222831" }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-3xl font-extrabold text-light-base mb-4">
          Dodaj news
        </Text>

        {/* Tytuł */}
        <View className="mb-4">
          <Text className="mb-2 text-light-subtle">Tytuł*</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Nagłówek newsa"
            placeholderTextColor={subtle}
            className="rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base"
          />
        </View>

        {/* Data */}
        <View className="mb-4">
          <Text className="mb-2 text-light-subtle">Data* (YYYY-MM-DD)</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="2025-11-16"
            placeholderTextColor={subtle}
            className="rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base"
          />
        </View>

        {/* Zdjęcie */}
        <View className="mb-4">
          <Text className="mb-2 text-light-subtle">Zdjęcie newsa</Text>

          <View className="bg-night-gray rounded-2xl border border-white/10 p-3">
            {imageLocalUri || imageRemoteUrl ? (
              <Image
                source={{ uri: imageLocalUri || (imageRemoteUrl as string) }}
                className="w-full h-40 rounded-xl mb-3"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-24 rounded-xl mb-3 bg-night-dark/60 border border-dashed border-white/20 items-center justify-center">
                <Text className="text-light-subtle text-xs">
                  Brak zdjęcia – dodaj obrazek newsa
                </Text>
              </View>
            )}

            <Pressable
              onPress={handlePickImage}
              disabled={imageUploading}
              className="self-start px-4 py-2 rounded-xl bg-accent-teal/20 border border-accent-teal/70"
            >
              {imageUploading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-accent-teal text-sm font-semibold">
                  {imageLocalUri || imageRemoteUrl
                    ? "Zmień zdjęcie"
                    : "Dodaj zdjęcie"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* Opis */}
        <View className="mb-6">
          <Text className="mb-2 text-light-subtle">Treść / opis</Text>
          <TextInput
            value={desc}
            onChangeText={setDesc}
            placeholder="Krótki opis lub treść newsa..."
            placeholderTextColor={subtle}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="rounded-xl px-4 py-3 bg-night-gray border border-white/10 text-light-base"
          />
        </View>

        {/* PRZYCISK */}
        <Pressable
          onPress={handleAddNews}
          disabled={saving || imageUploading}
          className={`rounded-xl bg-accent-teal py-3 items-center justify-center shadow-lg shadow-black/40 ${
            saving || imageUploading ? "opacity-60" : ""
          }`}
        >
          {saving || imageUploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-base font-bold">Dodaj news</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNews;
