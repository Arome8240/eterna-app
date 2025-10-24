import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useAccount } from "wagmi";
import {
  Plus,
  Video,
  DollarSign,
  Headphones,
  Users,
} from "lucide-react-native";
import { AppKitButton } from "@reown/appkit-react-native";
import { Link } from "expo-router";

export default function CreatorDashboard() {
  const { address, isConnected } = useAccount();

  const stats = [
    {
      id: 1,
      label: "Followers",
      value: "2.3k",
      icon: <Users color="#6b21a8" size={20} />,
    },
    {
      id: 2,
      label: "Total Plays",
      value: "12.4k",
      icon: <Headphones color="#6b21a8" size={20} />,
    },
    {
      id: 3,
      label: "Earnings",
      value: "₦45,200",
      icon: <DollarSign color="#6b21a8" size={20} />,
    },
  ];

  const recentUploads = [
    {
      id: 1,
      title: "The Power of Patience",
      date: "2 days ago",
      image:
        "https://i.pinimg.com/736x/43/f9/d3/43f9d3111ec3a86a0f3a9b8e26b93cd8.jpg",
    },
    {
      id: 2,
      title: "Grace That Transforms",
      date: "5 days ago",
      image:
        "https://i.pinimg.com/736x/27/9a/25/279a25bff54a9826e7d61a44b139f3a3.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-white">Creator Dashboard</Text>
        {isConnected ? (
          <Text className="text-xs text-gray-400">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Text>
        ) : (
          <AppKitButton
            label="Connect Wallet"
            connectStyle={styles.appKitButton}
          />
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View className="flex-row justify-between mb-6">
          {stats.map((item) => (
            <View
              key={item.id}
              className="bg-[#1a1a1a] flex-1 rounded-2xl p-4 mx-1 items-center"
            >
              <View className="mb-2">{item.icon}</View>
              <Text className="text-lg font-semibold text-white">
                {item.value}
              </Text>
              <Text className="text-xs text-gray-400">{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-white">
            Quick Actions
          </Text>
          <View className="flex-row gap-3">
            <Link asChild href="/sermons/upload">
              <TouchableOpacity
                className="flex-row items-center justify-center flex-1 p-4 bg-purple-700 rounded-2xl"
                onPress={() => console.log("Upload Sermon")}
              >
                <Plus color="white" size={20} />
                <Text className="ml-2 font-medium text-white">
                  Upload Sermon
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/reels/upload" asChild>
              <TouchableOpacity
                className="flex-1 bg-[#40414F] rounded-2xl p-4 flex-row items-center justify-center"
                onPress={() => console.log("Post Reel")}
              >
                <Video color="white" size={20} />
                <Text className="ml-2 font-medium text-white">Post Reel</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Recent Uploads */}
        <View className="mb-8">
          <Text className="mb-3 text-lg font-semibold text-white">
            Recent Uploads
          </Text>
          {recentUploads.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center mb-4 bg-[#1a1a1a] rounded-2xl p-3"
            >
              <Image
                source={{ uri: item.image }}
                className="w-16 h-16 mr-3 rounded-xl"
              />
              <View className="flex-1">
                <Text className="font-medium text-white">{item.title}</Text>
                <Text className="text-sm text-gray-400">{item.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appKitButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
  },
});
