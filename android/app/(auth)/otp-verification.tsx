import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Colors } from "@/constants/Colors"; // Import theme colors
import { useColorScheme } from "@/hooks/useColorScheme";

export default function OTPVerification() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  async function handleVerifyOTP() {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      // Simulated API request
      const response = await fetch("https://your-api.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (data.success) {
        alert("OTP Verified! Redirecting...");
        router.replace("/chats"); // Navigate to main chat screen
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
    setLoading(false);
  }

  async function handleResendOTP() {
    setResendDisabled(true);
    try {
      await fetch("https://your-api.com/resend-otp", {
        method: "POST",
      });
      alert("OTP resent successfully!");
    } catch {
      alert("Failed to resend OTP. Try again.");
    }
    setTimeout(() => setResendDisabled(false), 30 * 1000); // Enable resend after 30 sec
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit OTP sent to your email</Text>

      <TextInput
        label="OTP"
        mode="outlined"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        maxLength={6}
        theme={{
          colors: {
            primary: Colors.primary,
            background: Colors[colorScheme ?? "light"].background,
          },
        }}
      />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <Button mode="contained" onPress={handleVerifyOTP} style={styles.button}>
          Verify OTP
        </Button>
      )}

      <TouchableOpacity onPress={handleResendOTP} disabled={resendDisabled}>
        <Text style={[styles.resendText, resendDisabled && styles.resendDisabled]}>
          {resendDisabled ? "Wait 30s to resend OTP" : "Resend OTP"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.loginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "transparent",
  },
  button: {
    marginTop: 10,
    width: "100%",
    backgroundColor: Colors.primary,
  },
  resendText: {
    color: Colors.primary,
    marginTop: 10,
    fontSize: 16,
  },
  resendDisabled: {
    color: "gray",
  },
  loginText: {
    marginTop: 15,
    color: Colors.primary,
    fontSize: 16,
  },
});

