import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft, Check, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "Sarah Daniels",
    bio: "Faith-driven listener and believer in love 🌿",
    faiths: ["Christianity", "Buddhism"],
    image:
      "https://i.pinimg.com/736x/50/ba/3b/50ba3b1b53a502c4a8911e04c83b6571.jpg",
  });

  const faiths = [
    { id: 1, name: "Christianity", color: "bg-purple-700" },
    { id: 2, name: "Islam", color: "bg-green-700" },
    { id: 3, name: "Buddhism", color: "bg-yellow-700" },
    { id: 4, name: "Hinduism", color: "bg-red-700" },
    { id: 5, name: "Judaism", color: "bg-blue-700" },
    { id: 6, name: "Traditional", color: "bg-orange-700" },
  ];

  const toggleFaith = (faith: string) => {
    setUser((prev) => {
      const isSelected = prev.faiths.includes(faith);
      return {
        ...prev,
        faiths: isSelected
          ? prev.faiths.filter((f) => f !== faith)
          : [...prev.faiths, faith],
      };
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={22} />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold ml-4">
            Edit Profile
          </Text>
        </View>

        {/* Profile Image */}
        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: user.image }}
              className="w-28 h-28 rounded-full border-2 border-purple-700"
            />
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-purple-700 p-2 rounded-full"
            >
              <Camera color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <View className="gap-5">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            className="bg-[#1a1a1a] text-white p-4 rounded-xl"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />

          <TextInput
            placeholder="Bio"
            placeholderTextColor="#9ca3af"
            className="bg-[#1a1a1a] text-white p-4 rounded-xl"
            multiline
            numberOfLines={3}
            value={user.bio}
            onChangeText={(text) => setUser({ ...user, bio: text })}
          />

          {/* Faith Selection */}
          <View className="mt-2">
            <Text className="text-gray-300 text-sm mb-2">Select Faith(s)</Text>
            <View className="flex-row flex-wrap gap-2">
              {faiths.map((f) => {
                const isSelected = user.faiths.includes(f.name);
                return (
                  <Pressable
                    key={f.id}
                    onPress={() => toggleFaith(f.name)}
                    className={`px-4 py-2 rounded-full border ${
                      isSelected ? f.color : "border-gray-600"
                    } flex-row items-center gap-2`}
                  >
                    {isSelected && <Check size={14} color="white" />}
                    <Text
                      className={`text-sm font-medium ${
                        isSelected ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {f.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-purple-700 py-4 rounded-xl mt-8"
        >
          <Text className="text-white text-center font-semibold">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
