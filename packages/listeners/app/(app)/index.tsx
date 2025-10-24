import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { Fragment, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { AppKitButton } from "@reown/appkit-react-native";
import { useAccount } from "wagmi";
import { Play } from "lucide-react-native";
import Player from "@/components/Player";

export default function Home() {
  const { isConnected } = useAccount();

  const categories = [
    { id: 1, name: "Faith", color: "bg-purple-700" },
    { id: 2, name: "Prayer", color: "bg-green-700" },
    { id: 3, name: "Healing", color: "bg-yellow-700" },
    { id: 4, name: "Grace", color: "bg-red-700" },
  ];

  const featured = {
    title: "Faith in Action",
    speaker: "Rev. Adeolu Ogunyemi",
    image:
      "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const trending = [
    {
      id: 1,
      title: "The Power of Prayer",
      speaker: "Pastor Ifeanyi",
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: 2,
      title: "Finding Peace in Chaos",
      speaker: "Imam Yusuf",
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: 3,
      title: "Mindfulness and Grace",
      speaker: "Venerable Tashi",
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
  ];

  const preachers = [
    {
      id: 1,
      name: "Rev. Adeolu Ogunyemi",
      followers: "25.6k followers",
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: 2,
      name: "Imam Yusuf Bello",
      followers: "18.2k followers",
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
    {
      id: 3,
      name: "Venerable Tashi",
      followers: "12.1k followers",
      image:
        "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
    },
  ];

  return (
    <Fragment>
      <SafeAreaView className="flex-1 w-full p-4 bg-black">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-white">Eterna</Text>
          <View
            className={`${isConnected ? "bg-[#40414F] rounded-full" : "mb-4"}`}
          >
            <AppKitButton
              connectStyle={styles.appKitButton}
              label={isConnected ? "Wallet Connected" : "Connect Wallet"}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="text-xl font-semibold text-white">
              Welcome back 👋
            </Text>
            <Text className="text-sm text-gray-400">
              Listen, grow, and connect with inspiring sermons
            </Text>
          </View>

          <View className="relative mb-6 overflow-hidden rounded-2xl">
            <Image
              source={{ uri: featured.image }}
              className="w-full h-48 rounded-2xl"
            />
            <View className="absolute inset-0 justify-end p-4 bg-black/40 rounded-2xl">
              <Text className="text-lg font-semibold text-white">
                {featured.title}
              </Text>
              <Text className="mb-2 text-sm text-gray-300">
                {featured.speaker}
              </Text>
              <TouchableOpacity className="items-center justify-center w-10 h-10 bg-purple-700 rounded-full">
                <Play color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-lg font-semibold text-white">
              Categories
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  className={`${cat.color} px-4 py-2 rounded-full`}
                >
                  <Text className="text-sm font-medium text-white">
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-8">
            <Text className="mb-3 text-lg font-semibold text-white">
              Trending Sermons
            </Text>
            {trending.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setIsPlaying(true)}
                className="flex-row items-center mb-4 bg-[#1a1a1a] rounded-2xl p-3"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-16 h-16 mr-3 rounded-xl"
                />
                <View className="flex-1">
                  <Text className="font-medium text-white">{item.title}</Text>
                  <Text className="text-sm text-gray-400">{item.speaker}</Text>
                </View>
                <TouchableOpacity className="items-center justify-center w-8 h-8 bg-purple-700 rounded-full">
                  <Play color="white" size={16} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mb-10">
            <Text className="mb-3 text-lg font-semibold text-white">
              Trending Preachers
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {preachers.map((p) => (
                <TouchableOpacity key={p.id} className="items-center mr-4 w-28">
                  <Image
                    source={{ uri: p.image }}
                    className="w-24 h-24 mb-2 rounded-full"
                  />
                  <Text
                    className="text-sm font-medium text-center text-white"
                    numberOfLines={1}
                  >
                    {p.name}
                  </Text>
                  <Text className="text-xs text-center text-gray-400">
                    {p.followers}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isPlaying && (
        <Player
          isPlaying={isPlaying}
          setIsPlaying={(value) => setIsPlaying(value)}
        />
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  appKitButton: {
    marginTop: 8,
    backgroundColor: "#6b21a8", // tailwind purple-700
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
  },
});
