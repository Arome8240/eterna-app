import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";

export default function AuthWelcome() {
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center p-5">
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
        }}
        className="w-40 h-40 rounded-full mb-8"
      />
      <Text className="text-white text-3xl font-bold mb-2">
        Welcome to Eterna
      </Text>
      <Text className="text-gray-400 text-center mb-10">
        Stream sermons, connect with faith communities, and share inspiration
        across beliefs.
      </Text>

      <TouchableOpacity
        className="bg-purple-700 w-full py-4 rounded-full mb-4"
        onPress={() => router.push("/auth/register")}
      >
        <Text className="text-white text-center font-semibold">
          Create an Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-purple-700 w-full py-4 rounded-full"
        onPress={() => router.push("/auth/login")}
      >
        <Text className="text-purple-500 text-center font-semibold">
          Log In
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
