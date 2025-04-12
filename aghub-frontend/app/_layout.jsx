import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="loginmock" />
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
