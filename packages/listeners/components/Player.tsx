import {
  Pressable,
  View,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Text } from "./ui/text";
import { Pause, Play, Heart, Bitcoin, Share } from "iconsax-react-nativejs";
import { X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Player({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}) {
  //const [isPlaying, setIsPlaying] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const track = {
    title: "Faith That Moves Mountains",
    speaker: "Pastor Ifeanyi",
    duration: "05:30",
    currentTime: "02:12",
    description:
      "A powerful message about perseverance, faith, and trusting God even in difficult times. Be inspired to keep moving forward even when things seem impossible.",
    image:
      "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
  };

  return (
    <>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className={`absolute  flex-row items-center bg-[#1a1a1a] rounded-2xl mx-3 p-4 ${
          Platform.OS === "ios" ? "bottom-24" : "bottom-4"
        }`}
      >
        <Image
          source={{ uri: track.image }}
          className="w-12 h-12 mr-3 rounded-xl"
        />
        <View className="flex-1">
          <Text className="text-sm font-semibold text-white" numberOfLines={1}>
            {track.title}
          </Text>
          <Text className="text-xs text-gray-400">{track.speaker}</Text>

          <View className="mt-2">
            <View className="h-1 overflow-hidden bg-gray-700 rounded-full">
              <View className="h-1 bg-purple-700 rounded-full w-[40%]" />
            </View>
          </View>
        </View>

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className="items-center justify-center w-10 h-10 ml-3 bg-purple-700 rounded-full"
        >
          {isPlaying ? (
            <Pause size={22} color="white" />
          ) : (
            <Play size={22} color="white" />
          )}
        </Pressable>
      </Pressable>

      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black">
          <View className="flex-row items-center justify-between p-5 mt-4">
            <Text className="text-lg font-semibold text-white">
              Now Playing
            </Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <X color="white" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={{ uri: track.image }}
              className="w-full mb-6 h-80 rounded-3xl"
            />

            <Text className="mb-1 text-2xl font-bold text-white">
              {track.title}
            </Text>
            <Text className="mb-4 text-gray-400">{track.speaker}</Text>

            <Text className="mb-8 text-sm leading-6 text-gray-300">
              {track.description}
            </Text>

            <View>
              <View className="h-1 mb-2 overflow-hidden bg-gray-700 rounded-full">
                <View className="h-1 bg-purple-700 rounded-full w-[40%]" />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-gray-400">
                  {track.currentTime}
                </Text>
                <Text className="text-xs text-gray-400">{track.duration}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-center mt-10 gap-x-6">
              <TouchableOpacity className="items-center justify-center w-20 h-20 bg-purple-700 rounded-full">
                {isPlaying ? (
                  <Pause size={36} color="white" />
                ) : (
                  <Play size={36} color="white" />
                )}
              </TouchableOpacity>
            </View>

            <View className="mt-10">
              <Text className="mb-3 text-sm text-center text-gray-400">
                Support & Share
              </Text>
              <View className="flex-row justify-around mt-3">
                <TouchableOpacity className="items-center px-5 py-3 bg-purple-700 rounded-full">
                  <Bitcoin size={20} color="white" />
                  <Text className="mt-1 text-xs text-white">Tip Preacher</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center px-5 py-3 bg-purple-700 rounded-full">
                  <Heart size={20} color="white" />
                  <Text className="mt-1 text-xs text-white">Mint Sermon</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center px-5 py-3 bg-purple-700 rounded-full">
                  <Share size={20} color="white" />
                  <Text className="mt-1 text-xs text-white">Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
