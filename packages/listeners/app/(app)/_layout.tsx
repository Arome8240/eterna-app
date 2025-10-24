//import { useColorScheme } from "@/hooks/useColorScheme";
import { Home, Profile, SearchNormal, VideoPlay } from "iconsax-react-nativejs";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Users } from "lucide-react-native";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "purple",
        animation: "shift",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: {
          width: 40,
          height: 40,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: "Reels",
          tabBarIcon: ({ color }) => <VideoPlay color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Users color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Profile color={color} />,
        }}
      />
    </Tabs>
  );
}
