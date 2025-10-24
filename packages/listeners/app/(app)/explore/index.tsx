import { View, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Users } from "lucide-react-native";
import { Link, router } from "expo-router";

export default function Communities() {
  const communities = [
    {
      id: "1",
      name: "Christianity Group",
      description: "Discuss sermons, teachings, and faith stories.",
      members: 240,
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: "2",
      name: "Islamic Reflections",
      description: "Share khutbahs, duas, and daily inspiration.",
      members: 180,
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: "3",
      name: "Buddhist Wisdom",
      description: "Meditation, mindfulness, and compassion.",
      members: 95,
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-3">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-x-2">
          <Users color={"white"} />
          <Text className="text-white font-semibold text-xl">Communities</Text>
        </View>
      </View>

      {/* List of Communities */}
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <Link asChild href={`/explore/${item.id}`}>
            <TouchableOpacity className="bg-[#1a1a1a] rounded-2xl p-4 flex-row items-center">
              <Image
                source={{ uri: item.image }}
                className="w-14 h-14 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-white font-semibold text-base">
                  {item.name}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {item.description}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {item.members} members
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
