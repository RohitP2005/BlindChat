import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HelloWave } from "@/components/HelloWave";

export default function GreetingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          // First time launch
          setIsFirstLaunch(true);
          await AsyncStorage.setItem("hasLaunched", "true"); // Mark as launched
        } else {
          // Not first launch, redirect to home
          router.replace("/tabs/chats");
        }
      } catch (error) {
        console.error("Error checking app launch:", error);
      } finally {
        setLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!isFirstLaunch) {
    return null; // Prevents rendering the greeting page if not first launch
  }

  return (
    <View style={styles.container}>
      <HelloWave />
      <Text style={styles.title}>Welcome to Blind Chat</Text>
      <Text style={styles.subtitle}>
        A voice-first chat app designed for accessibility.
      </Text>

      {/* Navigate to Login */}
      <Button title="Get Started" onPress={() => router.push("/auth/login")} color="#007AFF" />

      {/* Navigate directly to Home (Chats Tab) */}
      <Button title="Go to Home" onPress={() => router.replace("/tabs/chats")} color="#28A745" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
});

