import "text-encoding";
import "@walletconnect/react-native-compat";
import { ThemeProvider } from "@react-navigation/native";
import "../global.css";
import { AppKit, AppKitProvider } from "@reown/appkit-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "@rn-primitives/portal";
import { DarkTheme } from "@react-navigation/native";
import { appKit, wagmiAdapter } from "@/utils/app-kit-config";
import { View } from "react-native";
import { ToastProvider } from "@/components/ui/toast";
import Player from "@/components/Player";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AppKitProvider instance={appKit}>
            <ToastProvider>
              <StatusBar style="auto" />
              <Stack screenOptions={{ headerShown: false }} />
              <PortalHost />
              {/* <Player /> */}
              <View
                style={{ position: "absolute", height: "100%", width: "100%" }}
              >
                <AppKit />
              </View>
            </ToastProvider>
          </AppKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
