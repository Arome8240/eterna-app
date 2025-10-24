import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function Verify() {
  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-3">Verify Account</Text>
      <Text className="text-gray-400 mb-8">
        Enter the 6-digit code sent to your email.
      </Text>

      <View className="flex-row justify-between mb-8">
        {[...Array(6)].map((_, i) => (
          <TextInput
            key={i}
            maxLength={1}
            keyboardType="numeric"
            className="w-12 h-14 bg-[#1a1a1a] text-white text-center rounded-lg text-lg"
          />
        ))}
      </View>

      <TouchableOpacity
        className="bg-purple-700 py-4 rounded-xl"
        onPress={() => router.replace("/")}
      >
        <Text className="text-white text-center font-semibold">Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
