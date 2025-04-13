// app/_layout.jsx
import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {AuthProvider} from "../contexts/authContext";



export default function RootLayout() {
  return (
      <GluestackUIProvider mode="dark">
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="(auth)/login"
                options={{ headerTitle: "Log In" }}
            />
            <Stack.Screen
                name="(auth)/signup"
                options={{ headerTitle: "Sign Up" }}
            />
            <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </GluestackUIProvider>
  );
}

