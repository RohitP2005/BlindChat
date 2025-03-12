import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Go to Register" onPress={() => router.push("/auth/register")} />
      <Button title="Go to Home" onPress={() => router.push("/(tabs)/chats")} color="#28A745" />
    </View>
  );
}

