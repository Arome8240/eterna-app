import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function ForgotPassword() {
  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-3">Reset Password</Text>
      <Text className="text-gray-400 mb-6">
        Enter your email address to receive a password reset link.
      </Text>

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#9ca3af"
        className="bg-[#1a1a1a] text-white p-4 rounded-xl mb-6"
      />

      <TouchableOpacity className="bg-purple-700 py-4 rounded-xl">
        <Text className="text-white text-center font-semibold">Send Link</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
