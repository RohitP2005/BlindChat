import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Dummy chat data
const chats = [
  { id: "1", name: "Alice", lastMessage: "Hey! How are you?", time: "10:45 AM", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "2", name: "Bob", lastMessage: "Let's meet tomorrow!", time: "9:30 AM", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "Charlie", lastMessage: "Thanks for your help!", time: "Yesterday", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: "4", name: "Diana", lastMessage: "See you soon!", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
];

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => router.push(`/chat/${item.id}`)} // Navigate to chat screen
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  chatItem: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 18, fontWeight: "bold" },
  chatMessage: { color: "#555" },
  chatTime: { color: "#888", fontSize: 12 },
});


