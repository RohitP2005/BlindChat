import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from '@/components/ThemedText';

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats Screen</Text>
        <ThemedText type="title">Welcome to jey!</ThemedText>

    </View>
  );
}

