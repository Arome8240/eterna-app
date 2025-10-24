import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft, Play, Share2 } from "lucide-react-native";
import { Bitcoin, UserAdd } from "iconsax-react-nativejs";
import { router, useLocalSearchParams } from "expo-router";

export default function PreacherProfile() {
  const { id } = useLocalSearchParams();

  const preacher = {
    id,
    name: "Pastor Ifeanyi Umeh",
    faith: "Christianity",
    followers: 1250,
    image:
      "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    bio: "Pastor Ifeanyi is a passionate preacher known for delivering inspiring sermons on faith, purpose, and spiritual growth. His teachings blend modern insight with timeless biblical wisdom.",
    sermons: [
      {
        id: 1,
        title: "Faith That Moves Mountains",
        duration: "12:45",
        image:
          "https://i.pinimg.com/736x/f1/b3/2a/f1b32a9f819e34389b0eea04a81fdbb3.jpg",
      },
      {
        id: 2,
        title: "The Power of Consistent Prayer",
        duration: "10:22",
        image:
          "https://i.pinimg.com/736x/89/7f/0b/897f0bda68186b2b2823b1c2c8c79b9b.jpg",
      },
      {
        id: 3,
        title: "Overcoming Fear Through Faith",
        duration: "08:55",
        image:
          "https://i.pinimg.com/736x/3a/0a/4b/3a0a4b9cb2e179e9b98c8f30ff5b08b2.jpg",
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="white" size={22} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Share2 color="white" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: preacher.image }}
            className="w-32 h-32 rounded-full mb-4"
          />
          <Text className="text-white text-2xl font-bold mb-1">
            {preacher.name}
          </Text>
          <Text className="text-gray-400 text-sm mb-1">{preacher.faith}</Text>
          <Text className="text-gray-500 text-xs mb-3">
            {preacher.followers.toLocaleString()} Followers
          </Text>

          {/* Action Buttons */}
          <View className="flex-row gap-x-3">
            <TouchableOpacity className="bg-purple-700 px-5 py-2 rounded-full flex-row items-center">
              <UserAdd color="white" size={18} />
              <Text className="text-white text-sm font-medium ml-2">
                Follow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-700 px-5 py-2 rounded-full flex-row items-center">
              <Bitcoin color="white" size={18} />
              <Text className="text-white text-sm font-medium ml-2">
                Tip Preacher
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bio */}
        <Text className="text-gray-300 text-sm leading-6 mb-6">
          {preacher.bio}
        </Text>

        {/* Sermons */}
        <Text className="text-white text-lg font-semibold mb-3">Sermons</Text>
        {preacher.sermons.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center mb-4 bg-[#1a1a1a] rounded-2xl p-3"
          >
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-xl mr-3"
            />
            <View className="flex-1">
              <Text className="text-white font-medium" numberOfLines={1}>
                {item.title}
              </Text>
              <Text className="text-gray-400 text-xs">{item.duration}</Text>
            </View>
            <TouchableOpacity className="bg-purple-700 w-8 h-8 rounded-full items-center justify-center">
              <Play color="white" size={16} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },
});
