import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccount } from "wagmi";
import {
  Edit,
  Video,
  Mic2,
  CreditCard,
  Image as ImageIcon,
  Settings,
  LogOut,
  Users,
} from "lucide-react-native";
import { AppKitButton } from "@reown/appkit-react-native";
import { Text } from "@/components/ui/text";
import { Link, router } from "expo-router";

export default function CreatorProfile() {
  const { address, isConnected } = useAccount();

  const creator = {
    name: "Pastor Ifeanyi",
    faith: "Christianity",
    followers: "2.3k",
    sermons: 18,
    reels: 7,
    image:
      "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: creator.image }}
            className="mb-3 border-2 border-purple-700 rounded-full w-28 h-28"
          />
          <Text className="text-xl font-bold text-white">{creator.name}</Text>
          <Text className="mb-2 text-sm text-gray-400">{creator.faith}</Text>

          {isConnected ? (
            <Text className="mb-2 text-xs text-center text-gray-500">
              Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
            </Text>
          ) : (
            <AppKitButton
              label="Connect Wallet"
              connectStyle={styles.appKitButton}
            />
          )}
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-8">
          <View className="items-center">
            <Text className="text-lg font-semibold text-white">
              {creator.followers}
            </Text>
            <Text className="text-xs text-gray-400">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold text-white">
              {creator.sermons}
            </Text>
            <Text className="text-xs text-gray-400">Sermons</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold text-white">
              {creator.reels}
            </Text>
            <Text className="text-xs text-gray-400">Reels</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="mb-3 text-lg font-semibold text-white">
            Quick Actions
          </Text>
          <View className="gap-y-3">
            <Link href="/edit-profile" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <Edit color="#6b21a8" size={22} />
                <Text className="ml-3 font-medium text-white">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/payments" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <CreditCard color="#6b21a8" size={22} />
                <Text className="ml-3 font-medium text-white">
                  Payment History
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/nfts" asChild>
              <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
                <ImageIcon color="#6b21a8" size={22} />
                <Text className="ml-3 font-medium text-white">My NFTs</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Settings */}
        <View className="mb-10">
          <Text className="mb-3 text-lg font-semibold text-white">
            Settings
          </Text>
          <View className="gap-y-3">
            <TouchableOpacity
              //onPress={() => router.push("/settings")}
              className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center"
            >
              <Settings color="#6b21a8" size={22} />
              <Text className="ml-3 font-medium text-white">
                Account Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/auth")}
              className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center"
            >
              <LogOut color="#ef4444" size={22} />
              <Text className="ml-3 font-medium text-red-500">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appKitButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 50,
    marginTop: 4,
  },
});
