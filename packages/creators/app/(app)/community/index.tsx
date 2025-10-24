import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Send, Users } from "lucide-react-native";

export default function Community() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Listener Jane",
      text: "Pastor, your last sermon blessed me so much 🙏",
    },
    {
      id: 2,
      user: "Imam Yusuf",
      text: "Beautiful delivery brother, keep inspiring others 🌙",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), user: "You", text: message.trim() },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-x-2">
          <Users color="#6b21a8" />
          <Text className="text-xl font-bold text-white">Community</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`p-3 rounded-2xl mb-3 ${
              item.user === "You" ? "bg-purple-700 self-end" : "bg-[#1a1a1a]"
            }`}
            style={{ maxWidth: "80%", width: "80%" }}
          >
            <Text className="font-medium text-white">{item.user}</Text>
            <Text className="text-gray-300">{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        inverted
      />

      <View className="absolute bottom-4 left-4 right-4 flex-row items-center bg-[#1a1a1a] rounded-full p-2">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Send a message..."
          placeholderTextColor="#888"
          className="flex-1 px-3 text-white"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="p-2 bg-purple-700 rounded-full"
        >
          <Send color="white" size={18} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
