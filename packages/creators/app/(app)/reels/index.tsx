import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Edit, Trash2, Eye } from "lucide-react-native";
import { Link, router } from "expo-router";

export default function Reels() {
  const reels = [
    {
      id: 1,
      caption: "Faith moves mountains ⛰️",
      views: "8.4k",
      likes: "1.2k",
      date: "Oct 14, 2025",
      thumbnail:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: 2,
      caption: "Stay grounded in love ❤️",
      views: "6.9k",
      likes: "980",
      date: "Oct 8, 2025",
      thumbnail:
        "https://i.pinimg.com/736x/43/f9/d3/43f9d3111ec3a86a0f3a9b8e26b93cd8.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-white">My Reels</Text>
        <Link href="/reels/upload" asChild>
          <TouchableOpacity className="px-4 py-2 bg-purple-700 rounded-full">
            <Text className="text-sm font-medium text-white">+ New Reel</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {reels.map((reel) => (
          <View
            key={reel.id}
            className="bg-[#1a1a1a] rounded-2xl mb-4 overflow-hidden"
          >
            <Image
              source={{ uri: reel.thumbnail }}
              className="w-full h-48 rounded-t-2xl"
            />
            <View className="p-3">
              <Text className="font-medium text-white" numberOfLines={2}>
                {reel.caption}
              </Text>
              <Text className="text-xs text-gray-400">
                {reel.date} • {reel.views} views
              </Text>
              <View className="flex-row gap-3 mt-2">
                <TouchableOpacity className="flex-row items-center px-3 py-1 bg-purple-700 rounded-full">
                  <Eye color="white" size={14} />
                  <Text className="ml-1 text-xs text-white">View</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#333] px-3 py-1 rounded-full flex-row items-center">
                  <Edit color="#a78bfa" size={14} />
                  <Text className="ml-1 text-xs text-gray-300">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#333] px-3 py-1 rounded-full flex-row items-center">
                  <Trash2 color="#ef4444" size={14} />
                  <Text className="ml-1 text-xs text-gray-300">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
