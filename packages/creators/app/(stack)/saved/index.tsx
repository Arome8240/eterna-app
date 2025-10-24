import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Play } from "lucide-react-native";
import { router } from "expo-router";

export default function Saved() {
  const saved = [
    {
      id: 1,
      title: "Finding Hope in Trials",
      preacher: "Rev. Adeolu Ogunyemi",
      image:
        "https://i.pinimg.com/736x/f5/63/37/f56337e3ed1e6544e923bba0ff0a04b1.jpg",
    },
    {
      id: 2,
      title: "Peaceful Living",
      preacher: "Venerable Tashi",
      image:
        "https://i.pinimg.com/736x/3d/71/77/3d7177c57dfb7e80f845dbf88e62425d.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold mb-4">Saved Sermons</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {saved.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center mb-4 bg-[#1a1a1a] rounded-2xl p-3"
          >
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-xl mr-3"
            />
            <View className="flex-1">
              <Text className="text-white font-medium">{item.title}</Text>
              <Text className="text-gray-400 text-sm">{item.preacher}</Text>
            </View>
            <TouchableOpacity className="bg-purple-700 w-8 h-8 rounded-full items-center justify-center">
              <Play color="white" size={16} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
