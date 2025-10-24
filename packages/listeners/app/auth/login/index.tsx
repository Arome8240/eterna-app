import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { login } from "@/lib/auth";
import { toast } from "@/components/ui/toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await login(form);
    if (res.status) {
      toast.success("Login successful!");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-6">Welcome Back</Text>

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#9ca3af"
        className="bg-[#1a1a1a] text-white p-4 rounded-xl mb-4"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        className="bg-[#1a1a1a] text-white p-4 rounded-xl mb-6"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />

      <TouchableOpacity
        className="bg-purple-700 py-4 rounded-xl"
        onPress={() => router.replace("/")}
      >
        <Text className="text-white text-center font-semibold">Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push("/auth/forgot-password")}
      >
        <Text className="text-gray-400 text-center">Forgot your password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
