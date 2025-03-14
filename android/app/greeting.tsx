import { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function GreetingScreen() {
  const router = useRouter();

  useEffect(() => {
    SecureStore.setItemAsync("firstLaunch", "false");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Blind Chat!</Text>
      <Button
        title="Continue"
        onPress={() => router.replace("/(auth)/login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 20 },
});
