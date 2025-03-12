import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register Screen</Text>
      <Button title="Go to Login" onPress={() => router.push("/auth/login")} />
      <Button title="Go to Home" onPress={() => router.push("/(tabs)/chats")} color="#28A745" />

    </View>
  );
}

