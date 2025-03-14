import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

export default function GreetingScreen() {
  const router = useRouter();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkFirstLaunch() {
      const firstLaunch = await SecureStore.getItemAsync("firstLaunch");
      if (firstLaunch) {
        router.replace("/(auth)/login"); // Redirect to login if not first time
      } else {
        setIsFirstLaunch(true);
        await SecureStore.setItemAsync("firstLaunch", "true");
      }
    }
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Prevent flickering
  }

  return isFirstLaunch ? (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to Blind Chat! 🎉</Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
  },
});
