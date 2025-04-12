// app/_layout.jsx
import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "./authContext"; // zakładam, że authContext jest w app/

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
            <AuthProvider>
                <Stack />
            </AuthProvider>
        </GluestackUIProvider>
    );
}