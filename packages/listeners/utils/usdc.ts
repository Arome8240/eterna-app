// src/contracts/usdc.ts
import { erc20Abi } from "viem";
import { createPublicClient, createWalletClient, http } from "viem";
import { polygon, base, mainnet } from "viem/chains";

// Example: USDC on Base mainnet
export const USDC_ADDRESS = "0xA39434A63A52E749F02807ae27335515BA4b07F7"; // base USDC
export const USDC_ABI = erc20Abi;

// If you want to create a public client for reading:
export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});
