import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft, Check } from "lucide-react-native";
import { router } from "expo-router";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    faiths: [] as string[],
  });

  const faiths = [
    { id: 1, name: "Christianity", color: "bg-purple-700" },
    { id: 2, name: "Islam", color: "bg-green-700" },
    { id: 3, name: "Buddhism", color: "bg-yellow-700" },
    { id: 4, name: "Hinduism", color: "bg-red-700" },
    { id: 5, name: "Judaism", color: "bg-blue-700" },
    { id: 6, name: "Traditional", color: "bg-orange-700" },
  ];

  const toggleFaith = (faith: string) => {
    setForm((prev) => {
      const isSelected = prev.faiths.includes(faith);
      return {
        ...prev,
        faiths: isSelected
          ? prev.faiths.filter((f) => f !== faith)
          : [...prev.faiths, faith],
      };
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-6">Create Account</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-5">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            className="bg-[#1a1a1a] text-white p-4 rounded-xl"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            className="bg-[#1a1a1a] text-white p-4 rounded-xl"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            className="bg-[#1a1a1a] text-white p-4 rounded-xl"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          {/* Faith Selection */}
          <View className="mt-2">
            <Text className="text-gray-300 text-sm mb-2">
              Select your faith(s)
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {faiths.map((f) => {
                const isSelected = form.faiths.includes(f.name);
                return (
                  <Pressable
                    key={f.id}
                    onPress={() => toggleFaith(f.name)}
                    className={`px-4 py-2 rounded-full border ${
                      isSelected ? f.color : "border-gray-600"
                    } flex-row items-center gap-2`}
                  >
                    {isSelected && <Check size={14} color="white" />}
                    <Text
                      className={`text-sm font-medium ${
                        isSelected ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {f.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Continue */}
          <TouchableOpacity
            className={`mt-8 py-4 rounded-xl ${
              form.faiths.length === 0 ? "bg-gray-700" : "bg-purple-700"
            }`}
            disabled={form.faiths.length === 0}
            onPress={() => router.push("/auth/verify")}
          >
            <Text className="text-white text-center font-semibold">
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/login")}
            className="mt-4"
          >
            <Text className="text-gray-400 text-center">
              Already have an account?{" "}
              <Text className="text-purple-500">Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
