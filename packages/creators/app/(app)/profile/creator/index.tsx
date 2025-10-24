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
import { LogOut, Settings, Upload, User } from "lucide-react-native";
import { AppKitButton } from "@reown/appkit-react-native";

export default function Profile() {
  const { address, isConnected } = useAccount();

  const user = {
    name: "Rev. Adeolu Ogunyemi",
    faith: "Christianity",
    followers: "25.6k",
    sermons: 48,
    image:
      "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
  };

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
          <Text className="text-gray-400 text-sm mb-3">{user.faith}</Text>

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
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-8">
          <View className="items-center">
            <Text className="text-white text-lg font-semibold">
              {user.followers}
            </Text>
            <Text className="text-gray-400 text-xs">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-semibold">
              {user.sermons}
            </Text>
            <Text className="text-gray-400 text-xs">Sermons</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-semibold">
              {user.faith}
            </Text>
            <Text className="text-gray-400 text-xs">Faith</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-3">
            Quick Actions
          </Text>
          <View className="gap-y-3">
            <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
              <Upload color="#6b21a8" size={22} />
              <Text className="text-white ml-3 font-medium">
                Upload New Sermon
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
              <User color="#6b21a8" size={22} />
              <Text className="text-white ml-3 font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </View>
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

            <TouchableOpacity className="bg-[#1a1a1a] rounded-xl p-3 flex-row items-center">
              <LogOut color="#ef4444" size={22} />
              <Text className="text-red-500 ml-3 font-medium">Logout</Text>
            </TouchableOpacity>
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
