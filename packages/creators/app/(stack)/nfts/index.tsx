import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function NFTs() {
  const nfts = [
    {
      id: 1,
      title: "Faithful Listener Badge",
      image:
        "https://i.pinimg.com/736x/f1/b3/2a/f1b32a9f819e34389b0eea04a81fdbb3.jpg",
    },
    {
      id: 2,
      title: "Top Supporter Award",
      image:
        "https://i.pinimg.com/736x/89/7f/0b/897f0bda68186b2b2823b1c2c8c79b9b.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold mb-4">My NFTs</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {nfts.map((nft) => (
            <View
              key={nft.id}
              className="bg-[#1a1a1a] w-[48%] rounded-2xl p-2 mb-4"
            >
              <Image
                source={{ uri: nft.image }}
                className="w-full h-36 rounded-xl mb-2"
              />
              <Text className="text-white text-sm font-medium text-center">
                {nft.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
