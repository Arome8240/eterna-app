import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft, Upload, Video, Trash } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";

export default function PostReel() {
  const [caption, setCaption] = useState("");
  const [faith, setFaith] = useState("");
  const [video, setVideo] = useState<{ uri: string } | null>(null);

  const faithOptions = [
    "Christianity",
    "Islam",
    "Buddhism",
    "Hinduism",
    "Judaism",
  ];

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setVideo({ uri: file.uri });
    }
  };

  const handlePublish = () => {
    if (!video || !faith) {
      alert("Please select a faith and upload your reel.");
      return;
    }
    alert("🎬 Reel posted successfully!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-white">Post a Reel</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Faith Selection */}
        <View className="mb-5">
          <Text className="mb-2 text-gray-300">Select Faith</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {faithOptions.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFaith(f)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  faith === f ? "bg-purple-700" : "bg-[#1a1a1a]"
                }`}
              >
                <Text
                  className={`${
                    faith === f ? "text-white" : "text-gray-400"
                  } font-medium`}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upload Video */}
        <View className="mb-6">
          <Text className="mb-2 text-gray-300">Upload Short Reel</Text>
          {video ? (
            <View className="relative">
              <Image
                source={{ uri: video.uri }}
                className="w-full h-64 rounded-2xl"
              />
              <TouchableOpacity
                onPress={() => setVideo(null)}
                className="absolute p-2 rounded-full top-3 right-3 bg-black/60"
              >
                <Trash color="#ef4444" size={18} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={pickVideo}
              className="items-center justify-center p-8 border border-gray-700 rounded-xl"
            >
              <Upload color="#6b21a8" size={28} />
              <Text className="mt-2 text-gray-400">
                Tap to upload a 1-minute reel
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Caption */}
        <View className="mb-6">
          <Text className="mb-2 text-gray-300">Caption</Text>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption..."
            placeholderTextColor="#888"
            multiline
            className="bg-[#1a1a1a] text-white rounded-xl p-3 h-24"
          />
        </View>

        {/* Publish Button */}
        <TouchableOpacity
          onPress={handlePublish}
          className="items-center justify-center p-4 bg-purple-700 rounded-xl"
        >
          <Text className="text-base font-semibold text-white">
            Publish Reel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
