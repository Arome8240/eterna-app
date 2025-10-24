import axios from "axios";

const API_URL = process.env.API_URL;

// Define user types for type safety
export interface AuthResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: any;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  faith: string;
  user_type: "listener" | "creator";
}

export interface LoginData {
  email: string;
  password: string;
}

export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Failed to create account. Try again.",
    };
  }
}

export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message ||
        "Invalid credentials. Please try again.",
    };
  }
}

export async function logout(token: string): Promise<AuthResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Failed to logout. Try again later.",
    };
  }
}
