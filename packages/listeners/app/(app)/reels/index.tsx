import { View, TouchableOpacity, Dimensions, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Link, router } from "expo-router";
import { Like1, Message2, Share } from "iconsax-react-nativejs";
import { Share2Icon } from "lucide-react-native";

const { height, width } = Dimensions.get("window");

export default function ReelsOnboarding() {
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const reels = [
    {
      title: "Find the Best Local Chefs",
      description:
        "Explore talented chefs in Jos, Lagos, and beyond. From spicy jollof rice to savory egusi soup, order authentic Nigerian meals made with love.",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      title: "Watch & Order Live",
      description:
        "Join chefs live as they cook your favorite dishes! See your meal being prepared and order directly from their kitchen in real-time.",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      title: "Eat Together, Pay Together",
      description:
        "Craving a group meal? Split the bill effortlessly with friends using our group payment feature, powered by Paystack.",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    },
  ];

  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    textOpacity.value = 0;
    textTranslateY.value = 20;
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 500 });
      textTranslateY.value = withSpring(0);
    }, 200);
  }, [pageIndex]);

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <SafeAreaView className="flex-1 bg-black">
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        orientation="vertical"
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
      >
        {reels.map((item, index) => {
          const player = useVideoPlayer(item.video, (player) => {
            player.loop = true;
            player.play();
          });
          return (
            <View key={index} className="relative flex-1">
              <VideoView
                player={player}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width,
                  height,
                }}
                contentFit="cover"
                allowsPictureInPicture
              />

              <Animated.View
                style={textStyle}
                className="absolute flex-row w-full bottom-0 p-3"
              >
                <View className="flex-1 justify-end">
                  <Text className="mb-2 text-3xl font-semibold text-white">
                    {item.title}
                  </Text>
                  <Text className="text-base text-white ">
                    {item.description}
                  </Text>
                </View>
                <View className="gap-y-6 items-center">
                  <Link asChild href={"/preacher/1"}>
                    <TouchableOpacity className="bg-white w-10 rounded-full h-10">
                      <Image
                        className="h-full w-full rounded-full"
                        source={{
                          uri: "https://i.pinimg.com/736x/03/17/c2/0317c254366d95a309154368362e3017.jpg",
                        }}
                      />
                    </TouchableOpacity>
                  </Link>

                  <TouchableOpacity>
                    <Like1 size={32} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Message2 size={32} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Share2Icon size={32} color="white" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </PagerView>

      {/* <TouchableOpacity
        className="absolute p-2 top-10 right-5"
        onPress={() => router.push("/")}
      >
        <Text className="text-sm font-bold text-white underline">Skip</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
