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
import { Edit, Trash2, Play } from "lucide-react-native";
import { Link, router } from "expo-router";

export default function Sermons() {
  const sermons = [
    {
      id: 1,
      title: "Faith That Overcomes Fear",
      plays: "3.2k",
      likes: "1.1k",
      date: "Oct 10, 2025",
      image:
        "https://i.pinimg.com/736x/43/f9/d3/43f9d3111ec3a86a0f3a9b8e26b93cd8.jpg",
    },
    {
      id: 2,
      title: "Grace and Growth",
      plays: "2.8k",
      likes: "970",
      date: "Oct 6, 2025",
      image:
        "https://i.pinimg.com/736x/27/9a/25/279a25bff54a9826e7d61a44b139f3a3.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-white">My Sermons</Text>
        <Link href="/sermons/upload" asChild>
          <TouchableOpacity className="px-4 py-2 bg-purple-700 rounded-full">
            <Text className="text-sm font-medium text-white">+ New Sermon</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {sermons.map((sermon) => (
          <View
            key={sermon.id}
            className="flex-row items-center bg-[#1a1a1a] rounded-2xl mb-4 p-3"
          >
            <Image
              source={{ uri: sermon.image }}
              className="w-20 h-20 mr-3 rounded-xl"
            />
            <View className="flex-1">
              <Text className="font-medium text-white" numberOfLines={1}>
                {sermon.title}
              </Text>
              <Text className="text-xs text-gray-400">
                {sermon.date} • {sermon.plays} plays
              </Text>
              <View className="flex-row gap-3 mt-2">
                <TouchableOpacity className="flex-row items-center px-3 py-1 bg-purple-700 rounded-full">
                  <Play color="white" size={14} />
                  <Text className="ml-1 text-xs text-white">Play</Text>
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
