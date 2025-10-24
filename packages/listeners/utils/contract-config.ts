import { getContract } from "viem";
import { baseSepolia } from "wagmi/chains";

// Replace this with your deployed contract address
// Deploy using: forge script script/Deploy.s.sol --rpc-url <RPC_URL> --broadcast --verify
// 0x705e029Af526880DDf32fd1254154E2a67891202
export const CAR_DEALERSHIP_ADDRESS =
  "0xC77d324240854E89Ea75B26D48E09653E66e3d91";

export const CAR_DEALERSHIP_ABI = [
  {
    inputs: [],
    name: "getAllCars",
    outputs: [
      {
        components: [
          { name: "vin", type: "string" },
          { name: "make", type: "string" },
          { name: "model", type: "string" },
          { name: "year", type: "uint16" },
          { name: "price", type: "uint256" },
          { name: "listed", type: "bool" },
        ],
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  {
    inputs: [
      { name: "name_", type: "string" },
      { name: "symbol_", type: "string" },
      { name: "admin_", type: "address" },
      { name: "feeAddr_", type: "address" },
      { name: "fee_", type: "uint96" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "id", type: "uint256" },
      { indexed: false, name: "vin", type: "string" },
      { indexed: true, name: "owner", type: "address" },
      { indexed: false, name: "uri", type: "string" },
    ],
    name: "CarMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "id", type: "uint256" },
      { indexed: false, name: "price", type: "uint256" },
    ],
    name: "CarListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "id", type: "uint256" }],
    name: "CarUnlisted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "id", type: "uint256" },
      { indexed: true, name: "buyer", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
    name: "BuyStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "id", type: "uint256" },
      { indexed: true, name: "buyer", type: "address" },
      { indexed: false, name: "refunded", type: "uint256" },
    ],
    name: "BuyCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "id", type: "uint256" },
      { indexed: true, name: "buyer", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: true, name: "seller", type: "address" },
    ],
    name: "SaleDone",
    type: "event",
  },
  {
    inputs: [
      { name: "vin", type: "string" },
      { name: "make", type: "string" },
      { name: "model", type: "string" },
      { name: "year", type: "uint16" },
      { name: "uri", type: "string" },
    ],
    name: "addCar",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "id", type: "uint256" },
      { name: "price", type: "uint256" },
    ],
    name: "listCar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "uint256" }],
    name: "unlistCar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "uint256" }],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "uint256" }],
    name: "cancelBuy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "uint256" }],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "uint256" }],
    name: "cars",
    outputs: [
      { name: "vin", type: "string" },
      { name: "make", type: "string" },
      { name: "model", type: "string" },
      { name: "year", type: "uint16" },
      { name: "price", type: "uint256" },
      { name: "listed", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "uint256" }],
    name: "escrows",
    outputs: [
      { name: "buyer", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextId",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeBps",
    outputs: [{ name: "", type: "uint96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeWallet",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "vin", type: "bytes32" }],
    name: "vinUsed",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "vin", type: "string" },
      { name: "make", type: "string" },
      { name: "model", type: "string" },
      { name: "year", type: "uint16" },
      { name: "uri", type: "string" },
    ],
    name: "adminMint",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "newFee", type: "uint96" },
      { name: "newWallet", type: "address" },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "fee", type: "uint96" },
    ],
    name: "setRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "to", type: "address" }],
    name: "rescue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "role", type: "bytes32" },
      { name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const contractConfig = {
  address: CAR_DEALERSHIP_ADDRESS,
  abi: CAR_DEALERSHIP_ABI,
  chainId: baseSepolia.id,
} as const;
