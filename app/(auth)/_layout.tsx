import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { isSignedIn = false } = useUser();
  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='signUp'
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name='(chat)' />
      </Stack.Protected>
    </Stack>
  );
}
