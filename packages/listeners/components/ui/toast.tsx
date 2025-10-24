import React, { createContext, useContext, useState, useCallback } from "react";
import { View, Text, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { CheckCircle, Info, XCircle } from "lucide-react-native";

type ToastType = "success" | "error" | "info";

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  show: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export const toast = {
  success: (msg: string) => _show("success", msg),
  error: (msg: string) => _show("error", msg),
  info: (msg: string) => _show("info", msg),
};

// internal reference
let _show: (type: ToastType, message: string) => void = () => {};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const insets = useSafeAreaInsets();

  const show = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // assign to global
  _show = show;

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <View
        style={{ top: insets.top + 10 }}
        className="absolute items-center z-[999] w-full"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} id={t.id} type={t.type} message={t.message} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

function ToastItem({ id, type, message }: ToastData) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const colors = {
    success: "bg-green-500/90 border-green-600",
    error: "bg-red-500/90 border-red-600",
    info: "bg-blue-500/90 border-blue-600",
  }[type];

  const icons = {
    success: <CheckCircle size={20} color="white" />,
    error: <XCircle size={20} color="white" />,
    info: <Info size={20} color="white" />,
  };

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className={cn(
        "rounded-xl border p-3 px-4 mb-2 flex-row items-center gap-2",
        "shadow-lg",
        colors
      )}
    >
      {icons[type]}
      <Text className="text-base text-white">{message}</Text>
    </Animated.View>
  );
}
