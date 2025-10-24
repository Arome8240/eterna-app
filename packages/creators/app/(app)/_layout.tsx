import { Tabs } from "expo-router";
import { Platform } from "react-native";
import {
  Home2,
  VideoPlay,
  Profile,
  MusicLibrary2,
  People,
} from "iconsax-react-nativejs";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6b21a8", // Tailwind purple-700
        tabBarInactiveTintColor: "#a1a1aa", // Neutral gray for inactive icons
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopColor: "#1a1a1a",
          height: 65,
          paddingBottom: Platform.OS === "ios" ? 15 : 8,
          paddingTop: 8,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Home2
              size={24}
              color={color}
              variant={focused ? "Bold" : "Linear"}
            />
          ),
        }}
      />

      {/* Sermons */}
      <Tabs.Screen
        name="sermons"
        options={{
          title: "Sermons",
          tabBarIcon: ({ color, focused }) => (
            <MusicLibrary2
              size={24}
              color={color}
              variant={focused ? "Bold" : "Linear"}
            />
          ),
        }}
      />

      {/* Reels */}
      <Tabs.Screen
        name="reels"
        options={{
          title: "Reels",
          tabBarIcon: ({ color, focused }) => (
            <VideoPlay
              size={24}
              color={color}
              variant={focused ? "Bold" : "Linear"}
            />
          ),
        }}
      />

      {/* Community */}
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <People
              size={24}
              color={color}
              variant={focused ? "Bold" : "Linear"}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Profile
              size={24}
              color={color}
              variant={focused ? "Bold" : "Linear"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
