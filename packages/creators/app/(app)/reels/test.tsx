import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";

export default function index() {
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const content = [
    {
      title: "Find the Best Local Chefs",
      description:
        "Explore talented chefs in Jos, Lagos, and beyond. From spicy jollof rice to savory egusi soup, order authentic Nigerian meals made with love.",
    },
    {
      title: "Watch & Order Live",
      description:
        "Join chefs live as they cook your favorite dishes! See your meal being prepared and order directly from their kitchen in real-time.",
    },
    {
      title: "Eat Together, Pay Together",
      description:
        "Craving a group meal? Split the bill effortlessly with friends using our group payment feature, powered by Paystack.",
    },
  ];

  // 🔥 Shared values for text + button animations
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const buttonScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  // 🧠 Animate every time pageIndex changes
  useEffect(() => {
    textOpacity.value = 0;
    textTranslateY.value = 20;
    buttonScale.value = 0.8;
    buttonOpacity.value = 0;

    // Delay a bit so animation feels natural
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 500 });
      textTranslateY.value = withSpring(0, { damping: 12 });
      buttonOpacity.value = withTiming(1, { duration: 500 });
      buttonScale.value = withSpring(1, { damping: 10 });
    }, 200);
  }, [pageIndex]);

  // 🎨 Animated styles
  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  const handleNextPage = () => {
    if (pageIndex < content.length - 1) {
      pagerRef.current?.setPage(pageIndex + 1);

      setPageIndex(pageIndex + 1);
    } else {
      router.push("/");
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  const renderDots = () => {
    return content.map((_, index) => {
      const isActive = index === pageIndex; // Check if the dot is active

      // Animation styles for the dot
      const animatedDotStyle = useAnimatedStyle(() => {
        return {
          transform: [{ scale: withSpring(isActive ? 1.2 : 1) }],
          opacity: withSpring(isActive ? 1 : 0.5),
        };
      });

      return (
        <Animated.View
          key={index}
          style={[
            animatedDotStyle,
            {
              width: isActive ? 12 : 8, // Change width based on active state
              height: 8,
              borderRadius: 5,
              backgroundColor: isActive ? "purple" : "white", // Change color based on active state
              marginHorizontal: 5,
            },
          ]}
        />
      );
    });
  };

  return (
    <View className="flex-1">
      <View
        style={{ zIndex: 5, opacity: 0.5, pointerEvents: "none" }}
        className="absolute flex w-full h-full bg-black"
      ></View>
      <View
        className="flex flex-row justify-end w-full p-5"
        style={{ zIndex: 10 }}
      >
        <TouchableOpacity onPress={handleSkip} className="p-5">
          <Text className="text-base font-bold text-center underline text-primary underline-offset-2">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className="absolute bottom-0 items-center w-full p-5"
        style={{ zIndex: 10 }}
      >
        <Animated.View style={animatedTextStyle} className="items-center">
          <Text className="text-3xl font-semibold text-white">
            {content[pageIndex].title}
          </Text>
          <Text className="p-3 text-center text-white">
            {content[pageIndex].description}
          </Text>
        </Animated.View>
        <Animated.View
          style={[animatedButtonStyle, { width: "100%", marginTop: 20 }]}
        >
          <Button
            className="w-full rounded-full"
            size={"lg"}
            onPress={handleNextPage}
          >
            <Text className="dark:white">
              {pageIndex < content.length - 1 ? "Next" : "Get Started"}
            </Text>
          </Button>
        </Animated.View>
        <View className="flex-row justify-center p-3 mt-4">{renderDots()}</View>
      </View>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
      >
        {content.map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 120,
            }}
          ></View>
        ))}
      </PagerView>
    </View>
  );
}
