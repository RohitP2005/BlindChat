import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { Colors } from "@/constants/Colors"; // ✅ Use theme colors
import { useColorScheme } from "@/hooks/useColorScheme";
import axios from "axios";

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [preferences, setPreferences] = useState("");
  const [dob,setDob] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);

 async function handleRegister() {
  console.log("Register button clicked"); // Debugging log

  if (!email || !password || !confirmPassword || !gender || !preferences || !dob) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Validate if the user is 18+ years old
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (age < 18 || (age === 18 && monthDiff < 0)) {
    alert("You must be 18 or older to register.");
    return;
  }

  setLoading(true);
  console.log("Loading started");

  try {
    console.log("Preparing registration request...");
    
    const requestData = {
      email,
      password,
      gender,
      preferences,
      dob,
    };

    console.log("Request Data:", requestData); // Log request data before sending

    // Step 1: Send OTP request using Axios
    const otpResponse = await axios.post("http://172.31.99.84:8000/api/users/register/", requestData);
    console.log(otpResponse.data); // Log response data

    // Check response status
    if (otpResponse.status !== 200) {
      alert(otpResponse.data.message || "Failed to send OTP");
      return;
    }

    alert("OTP sent to your email. Please verify.");

    // Navigate to OTP verification page
    router.push({
      pathname: "/otp-verification",
      query: { email, password, confirmPassword, gender, preferences, dob },
    });

  } catch (error) {
    alert(error.response?.data?.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor={Colors.primary}
        activeOutlineColor={Colors.primary}
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
        theme={{
    colors: {
      onSurfaceVariant: Colors.primary, // Removes unfocused label color
      background: Colors[colorScheme ?? 'light'].background, // Ensures full transparency
    },
  }}

      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        outlineColor={Colors.primary}
        activeOutlineColor={Colors.primary}
        theme={{
    colors: {
      onSurfaceVariant: Colors.primary, // Removes unfocused label color
      background: Colors[colorScheme ?? 'light'].background, // Ensures full transparency
    },
  }}

      />
      <TextInput
        label="Date of Birth (YYYY-MM-DD)"
        mode="outlined"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
        outlineColor={Colors.primary}
        activeOutlineColor={Colors.primary}
        theme={{
    colors: {
      onSurfaceVariant: Colors.primary, // Removes unfocused label color
      background: Colors[colorScheme ?? 'light'].background, // Ensures full transparency
    },
  }}

      />

      <Text style={styles.label}>Gender</Text>
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <View style={styles.radioRow}>
          <RadioButton value="Male" color={Colors.primary} />
          <Text>Male</Text>
          <RadioButton value="Female" color={Colors.primary} />
          <Text>Female</Text>
          <RadioButton value="Other" color={Colors.primary} />
          <Text>Other</Text>
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Looking For</Text>
      <RadioButton.Group onValueChange={setPreferences} value={preferences}>
        <View style={styles.radioRow}>
          <RadioButton value="Male" color={Colors.primary} />
          <Text>Male</Text>
          <RadioButton value="Female" color={Colors.primary} />
          <Text>Female</Text>
          <RadioButton value="Any" color={Colors.primary} />
          <Text>Any</Text>
        </View>
      </RadioButton.Group>

      <TouchableOpacity onPress={() => setShowTerms(true)}>
        <Text style={styles.termsText}>Read Terms & Conditions</Text>
      </TouchableOpacity>

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <Text style={styles.privacyNote}>
        This information is gathered for account registration only and will not be exposed to the public.
      </Text>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>Already have an account? Login here</Text>
      </TouchableOpacity>

      {/* Terms & Conditions Modal */}
      <Modal visible={showTerms} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            <Text style={styles.modalText}>
              By registering, you agree to our terms and conditions. Your data will not be shared publicly.
            </Text>
            <Button mode="contained" onPress={() => handleRegister()} style={styles.modalButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: Colors.primary,
    backgroundColor: "transparent",

  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    color: Colors.primary
  },
  button: {
    marginTop: 10,
    width: "100%",
    backgroundColor: Colors.primary,
  },
  termsText: {
    color: Colors.primary,
    marginTop: 10,
    fontSize: 16,
  },
  privacyNote: {
    marginTop: 15,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  loginText: {
    marginTop: 15,
    color: Colors.primary,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.primary,
  },
});

export default RegisterScreen;

