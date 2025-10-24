import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function Payments() {
  const payments = [
    {
      id: 1,
      date: "Oct 14, 2025",
      preacher: "Pastor Ifeanyi",
      amount: "₦2,500",
      status: "Completed",
    },
    {
      id: 2,
      date: "Oct 9, 2025",
      preacher: "Imam Yusuf",
      amount: "₦1,000",
      status: "Pending",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold mb-4">Payment History</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {payments.map((p) => (
          <View
            key={p.id}
            className="bg-[#1a1a1a] rounded-xl p-4 mb-3 flex-row justify-between"
          >
            <View>
              <Text className="text-white font-medium">{p.preacher}</Text>
              <Text className="text-gray-400 text-xs">{p.date}</Text>
            </View>
            <View className="items-end">
              <Text className="text-white font-semibold">{p.amount}</Text>
              <Text
                className={`text-xs ${
                  p.status === "Completed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {p.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
