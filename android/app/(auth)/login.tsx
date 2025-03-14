import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors'; // ✅ Fixed case sensitivity issue
import { useColorScheme } from '@/hooks/useColorScheme';


export default function LoginScreen() {
   const router = useRouter();
  const colorScheme = useColorScheme();
  
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await AsyncStorage.getItem("authToken");
    if (token) router.replace("/chats"); // Redirect if already logged in
  }

  async function handleLogin() {
    setError("");
    if (!emailOrPhone || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await response.json();
      if (data.success) {
        await AsyncStorage.setItem("authToken", data.token);
        router.replace("/chats"); // Redirect to main chat screen
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Blind Chat</ThemedText>

  <TextInput
  label="Email or Phone"
  mode="outlined"
  value={emailOrPhone}
  onChangeText={setEmailOrPhone}
  style={styles.input}
  outlineColor={Colors.primary}
  activeOutlineColor={Colors.primary}
  placeholderTextColor={Colors.primary}
  theme={{
    colors: {
      onSurfaceVariant: Colors.primary, // Removes unfocused label color
      background: Colors[colorScheme ?? 'light'].background, // Ensures full transparency
    },
  }}
/>

<TextInput
  label="Password"
  mode="outlined"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
  style={styles.input}
  outlineColor={Colors.primary}
  activeOutlineColor={Colors.primary}
  placeholderTextColor={Colors.primary}
  theme={{
    colors: {
      onSurfaceVariant: Colors.primary,
      background: Colors[colorScheme ?? 'light'].background,
    },
  }}
/>


      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>New user? Register here</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  button: {
    marginTop: 10,
    width: "100%",
    backgroundColor: Colors.primary, // ✅ Use primary color from Colors
  },
  registerText: {
    marginTop: 15,
    color: Colors.primary,
    fontSize: 16,
  },
});


