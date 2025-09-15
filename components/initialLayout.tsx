// import { ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import { Stack, useRouter } from "expo-router";
// import { useEffect } from "react";

// export default function InitialLayout() {
//   const router = useRouter();

//   return (
//     <ClerkLoaded>
//       <SignedIn>
//         <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)" />
//       </SignedIn>

//       <SignedOut>
//         <SignedOutRedirect />
//       </SignedOut>
//     </ClerkLoaded>
//   );
// }

// function SignedOutRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace("/(auth)/login"); // 👈 replace, don’t push endlessly
//   }, [router]);

//   return null;
// }



import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}