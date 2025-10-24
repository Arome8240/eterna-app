import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccount } from "wagmi";
import {
  Heart,
  Clock,
  User,
  Settings,
  LogOut,
  CreditCard,
  Image as ImageIcon,
} from "lucide-react-native";
import { AppKitButton } from "@reown/appkit-react-native";
import { Link, router } from "expo-router";

export default function ListenerProfile() {
  const { address, isConnected } = useAccount();

  const user = {
    name: "Sarah Daniels",
    faiths: ["Christianity", "Buddhism"],
    followers: "1.2k",
    image:
      "https://i.pinimg.com/736x/50/ba/3b/50ba3b1b53a502c4a8911e04c83b6571.jpg",
  };

  const savedSermons = [
    {
      id: 1,
      title: "Walking in Faith",
      preacher: "Rev. Adeolu Ogunyemi",
      image:
        "https://i.pinimg.com/736x/43/f9/d3/43f9d3111ec3a86a0f3a9b8e26b93cd8.jpg",
    },
    {
      id: 2,
      title: "Inner Peace",
      preacher: "Venerable Tashi",
      image:
        "https://i.pinimg.com/736x/27/9a/25/279a25bff54a9826e7d61a44b139f3a3.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: user.image }}
            className="w-28 h-28 rounded-full mb-3 border-2 border-purple-700"
          />
          <Text className="text-white text-xl font-bold">{user.name}</Text>
          <Text className="text-gray-400 text-sm mb-2">
            Follower of {user.faiths.join(", ")}
          </Text>

          {isConnected ? (
            <Text className="text-gray-500 text-xs text-center mb-2">
              Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
            </Text>
          ) : (
            <AppKitButton
              label="Connect Wallet"
              connectStyle={styles.appKitButton}
            />
          )}

          {/* Edit Profile Button */}
          <Link asChild href={"/edit-profile"}>
            <TouchableOpacity className="bg-purple-700 py-3 w-full mt-4 rounded-full items-center mb-8">
              <Text className="text-white font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-8">
          <View className="items-center">
            <Text className="text-white text-lg font-semibold">
              {user.followers}
            </Text>
            <Text className="text-gray-400 text-xs">Following</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-semibold">28</Text>
            <Text className="text-gray-400 text-xs">Saved</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-semibold">6</Text>
            <Text className="text-gray-400 text-xs">Faiths</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-3">
            Quick Actions
          </Text>
          <View className="gap-y-3">
            <Link href="/history" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <Clock color="#6b21a8" size={22} />
                <Text className="text-white ml-3 font-medium">
                  Listening History
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/saved" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <Heart color="#6b21a8" size={22} />
                <Text className="text-white ml-3 font-medium">
                  Saved Sermons
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/followed" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <User color="#6b21a8" size={22} />
                <Text className="text-white ml-3 font-medium">
                  Followed Preachers
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/payments" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <CreditCard color="#6b21a8" size={22} />
                <Text className="text-white ml-3 font-medium">
                  Payment History
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/nfts" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <ImageIcon color="#6b21a8" size={22} />
                <Text className="text-white ml-3 font-medium">My NFTs</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Saved Sermons Preview */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-3">
            Recently Saved
          </Text>
          {savedSermons.map((sermon) => (
            <TouchableOpacity
              key={sermon.id}
              className="flex-row items-center mb-4 bg-[#1a1a1a] rounded-2xl p-3"
            >
              <Image
                source={{ uri: sermon.image }}
                className="w-16 h-16 rounded-xl mr-3"
              />
              <View className="flex-1">
                <Text className="text-white font-medium">{sermon.title}</Text>
                <Text className="text-gray-400 text-sm">{sermon.preacher}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View className="mb-10">
          <Text className="text-white text-lg font-semibold mb-3">
            Settings
          </Text>
          <View className="gap-y-3">
            <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
              <Settings color="#6b21a8" size={22} />
              <Text className="text-white ml-3 font-medium">
                Account Settings
              </Text>
            </TouchableOpacity>

            <Link href={"/auth"} asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <LogOut color="#ef4444" size={22} />
                <Text className="text-red-500 ml-3 font-medium">Logout</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appKitButton: {
    backgroundColor: "#6b21a8", // Tailwind purple-700
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 50,
    marginTop: 4,
  },
});
