import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft, Upload, Video, Music } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";

export default function UploadSermon() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faith, setFaith] = useState("");
  const [media, setMedia] = useState<{ uri: string; type: string } | null>(
    null
  );

  const faithOptions = [
    "Christianity",
    "Islam",
    "Buddhism",
    "Hinduism",
    "Judaism",
  ];

  const pickMedia = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["audio/*", "video/*"],
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setMedia({
        uri: file.uri,
        type: file.mimeType?.startsWith("video") ? "video" : "audio",
      });
    }
  };

  const handlePublish = () => {
    if (!title || !faith || !media) {
      alert("Please fill all fields and upload media.");
      return;
    }
    alert("✅ Sermon uploaded successfully!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-white">Upload Sermon</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View className="mb-4">
          <Text className="mb-2 text-gray-300">Sermon Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter sermon title"
            placeholderTextColor="#888"
            className="bg-[#1a1a1a] text-white rounded-xl p-3"
          />
        </View>

        {/* Faith Selection */}
        <View className="mb-4">
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

        {/* Description */}
        <View className="mb-4">
          <Text className="mb-2 text-gray-300">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Write a short description..."
            placeholderTextColor="#888"
            multiline
            className="bg-[#1a1a1a] text-white rounded-xl p-3 h-28"
          />
        </View>

        {/* Upload Media */}
        <View className="mb-6">
          <Text className="mb-2 text-gray-300">Upload Media</Text>
          {media ? (
            <View className="flex-row items-center bg-[#1a1a1a] p-3 rounded-xl justify-between">
              <View className="flex-row items-center">
                {media.type === "video" ? (
                  <Video color="#6b21a8" size={24} />
                ) : (
                  <Music color="#6b21a8" size={24} />
                )}
                <Text className="ml-3 text-white">
                  {media.uri.split("/").pop()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setMedia(null)}>
                <Text className="text-sm text-red-500">Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={pickMedia}
              className="items-center justify-center p-5 border border-gray-700 rounded-xl"
            >
              <Upload color="#6b21a8" size={28} />
              <Text className="mt-2 text-gray-400">
                Tap to upload audio/video
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Publish Button */}
        <TouchableOpacity
          onPress={handlePublish}
          className="items-center justify-center p-4 bg-purple-700 rounded-xl"
        >
          <Text className="text-base font-semibold text-white">
            Publish Sermon
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
