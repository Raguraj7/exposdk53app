import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // Or a loading spinner, etc.
  }
  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name='index' />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name='(chat)' />
      </Stack.Protected>
    </Stack>
  );
}
