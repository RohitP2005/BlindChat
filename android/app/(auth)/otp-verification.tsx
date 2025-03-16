import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { Colors } from "@/constants/Colors"; // Import theme colors
import { useColorScheme } from "@/hooks/useColorScheme";

export default function OTPVerification() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams(); // Capture params from navigation
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
      const response = await axios.post("http://192.168.0.105:8000/api/users/register/", {
        email: params.email,
        otp,
        password: params.password,
        gender: params.gender,
        preferences: params.preferences,
        dob: params.dob,
      });

      if (response.status === 201) {
        alert("OTP Verified! Redirecting...");
        router.replace("/chats"); // Navigate to main chat screen
      } else if (response.status === 400) {
        alert(response.data.message || "Invalid OTP. Please try again.");
      } else {
        alert("Unexpected error. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Something went wrong.");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
  
  async function handleResendOTP() {
    setResendDisabled(true);
    setTimer(30); // Reset countdown timer

    try {
      const response = await axios.post("http://192.168.0.105:8000/api/users/register/", {
        email: params.email,
      });

      if (response.status === 200) {
        alert("OTP resent successfully!");
      } else {
        alert("Failed to resend OTP. Try again.");
      }
    } catch (error) {
      alert("Network error. Unable to resend OTP.");
    }

    // Start countdown timer before allowing resend
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your email
      </Text>

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
        <Button
          mode="contained"
          onPress={handleVerifyOTP}
          style={styles.button}
        >
          Verify OTP
        </Button>
      )}

      <TouchableOpacity onPress={handleResendOTP} disabled={resendDisabled}>
        <Text
          style={[styles.resendText, resendDisabled && styles.resendDisabled]}
        >
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
