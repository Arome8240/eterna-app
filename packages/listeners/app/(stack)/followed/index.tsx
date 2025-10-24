import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Play } from "lucide-react-native";
import { router } from "expo-router";

export default function Followed() {
  const preachers = [
    {
      id: 1,
      name: "Pastor Ifeanyi",
      faith: "Christianity",
      image:
        "https://i.pinimg.com/736x/b2/ef/b5/b2efb5328147b1d2c196e8a9f7c7e9b8.jpg",
    },
    {
      id: 2,
      name: "Imam Yusuf",
      faith: "Islam",
      image:
        "https://i.pinimg.com/736x/23/1c/1b/231c1b3b8c0ff3c3b6e01538b3dc8842.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold mb-4">
        Followed Preachers
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {preachers.map((p) => (
          <View
            key={p.id}
            className="flex-row items-center mb-4 bg-[#1a1a1a] rounded-2xl p-3"
          >
            <Image
              source={{ uri: p.image }}
              className="w-16 h-16 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="text-white font-medium">{p.name}</Text>
              <Text className="text-gray-400 text-sm">{p.faith}</Text>
            </View>
            <TouchableOpacity className="bg-purple-700 px-4 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">Unfollow</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
