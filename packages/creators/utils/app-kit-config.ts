import "text-encoding";
import "@walletconnect/react-native-compat";

import { createAppKit } from "@reown/appkit-react-native";
import { WagmiAdapter } from "@reown/appkit-wagmi-react-native";
import { sepolia, baseSepolia } from "wagmi/chains";
import { storage } from "./StorageUtil";

//const projectId = "aadb06c660fdfb67a935700afca436e7";

const projectId = "b8e39dfb697ba26ac5a77a4b29b35604";

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [sepolia, baseSepolia],
});

// 2. Create config
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "appkitexpowagmi://",
    universal: "appkitexpowagmi",
  },
};

export const appKit = createAppKit({
  projectId,
  metadata,
  networks: [sepolia, baseSepolia],
  adapters: [wagmiAdapter],
  storage,
});

console.log(appKit);

console.log("AppKit Configured");
