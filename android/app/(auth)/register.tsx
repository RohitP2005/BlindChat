import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { Colors } from "@/constants/Colors"; // ✅ Use theme colors
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password || !confirmPassword || !gender || !lookingFor) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://your-api.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, gender, lookingFor }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(" Check your email for verification.");
        router.push("/otp-verification");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
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
      <RadioButton.Group onValueChange={setLookingFor} value={lookingFor}>
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
            <Button mode="contained" onPress={() => setShowTerms(false)} style={styles.modalButton}>
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

