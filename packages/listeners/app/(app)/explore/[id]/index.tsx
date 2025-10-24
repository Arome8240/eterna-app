import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ArrowLeft, Send } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function CommunityChat() {
  const { name } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Rev. Ade",
      text: "Welcome everyone 🙏 Let's share today’s reflections.",
      avatar:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
      time: "2:45 PM",
    },
    {
      id: "2",
      sender: "FaithSeeker",
      text: "That sermon on patience really spoke to me 💬",
      avatar:
        "https://i.pinimg.com/736x/5e/07/67/5e0767f9a3e21b1b3e0808cf2393e9ab.jpg",
      time: "2:47 PM",
    },
  ]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "You",
        text: message,
        avatar: "https://i.pinimg.com/736x/ab/bb/cc/abbccddff3123abcd.jpg",
        time: "Now",
      },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center p-3 border-b border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">{name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            className={`flex-row mb-4 ${
              item.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            {item.sender !== "You" && (
              <Image
                source={{ uri: item.avatar }}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <View
              className={`max-w-[75%] w-[75%] p-3 rounded-2xl ${
                item.sender === "You" ? "bg-purple-700" : "bg-[#1f1f1f]"
              }`}
            >
              <Text className="text-white text-sm">{item.text}</Text>
              <Text className="text-gray-400 text-[10px] mt-1 text-right">
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Input */}
      <View className="flex-row items-center p-3 border-t border-gray-800">
        <TextInput
          className="flex-1 bg-[#1a1a1a] text-white rounded-full px-4 py-4 mr-2"
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={handleSend}
          className="bg-purple-700 p-3 rounded-full"
        >
          <Send color="white" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
