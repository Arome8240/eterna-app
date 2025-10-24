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

export default function Player() {
  const [isPlaying, setIsPlaying] = React.useState(false);
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
          Platform.OS === "ios" ? "bottom-24" : "bottom-24"
        }`}
      >
        <Image
          source={{ uri: track.image }}
          className="w-12 h-12 rounded-xl mr-3"
        />
        <View className="flex-1">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
            {track.title}
          </Text>
          <Text className="text-gray-400 text-xs">{track.speaker}</Text>

          <View className="mt-2">
            <View className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <View className="h-1 bg-purple-700 rounded-full w-[40%]" />
            </View>
          </View>
        </View>

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className="ml-3 w-10 h-10 bg-purple-700 rounded-full items-center justify-center"
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
          <View className="flex-row justify-between mt-4 items-center p-5">
            <Text className="text-white text-lg font-semibold">
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
              className="w-full h-80 rounded-3xl mb-6"
            />

            <Text className="text-white text-2xl font-bold mb-1">
              {track.title}
            </Text>
            <Text className="text-gray-400 mb-4">{track.speaker}</Text>

            <Text className="text-gray-300 text-sm mb-8 leading-6">
              {track.description}
            </Text>

            <View>
              <View className="h-1 bg-gray-700 rounded-full overflow-hidden mb-2">
                <View className="h-1 bg-purple-700 rounded-full w-[40%]" />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400 text-xs">
                  {track.currentTime}
                </Text>
                <Text className="text-gray-400 text-xs">{track.duration}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-center mt-10 gap-x-6">
              <TouchableOpacity className="bg-purple-700 w-20 h-20 rounded-full items-center justify-center">
                {isPlaying ? (
                  <Pause size={36} color="white" />
                ) : (
                  <Play size={36} color="white" />
                )}
              </TouchableOpacity>
            </View>

            <View className="mt-10">
              <Text className="text-gray-400 text-sm mb-3 text-center">
                Support & Share
              </Text>
              <View className="flex-row justify-around mt-3">
                <TouchableOpacity className="bg-purple-700 px-5 py-3 rounded-full items-center">
                  <Bitcoin size={20} color="white" />
                  <Text className="text-white text-xs mt-1">Tip Preacher</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-purple-700 px-5 py-3 rounded-full items-center">
                  <Heart size={20} color="white" />
                  <Text className="text-white text-xs mt-1">Mint Sermon</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-purple-700 px-5 py-3 rounded-full items-center">
                  <Share size={20} color="white" />
                  <Text className="text-white text-xs mt-1">Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
