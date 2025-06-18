import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [isResending, setIsResending] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleResendVerification = () => {
    setIsResending(true);
    console.log("Resending verification email to:", email);
    setTimeout(() => setIsResending(false), 2000);
  };

  const handleVerifyEmail = async () => {
    if (verificationCode.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await axios.post(
        "http://192.168.0.106:7000/auth/verify-email",
        {
          verificationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Note: You'll need to get the actual token from your auth context or storage
            Authorization: `Bearer ${"YOUR_TOKEN_HERE"}`,
          },
        }
      );

      if (response.data) {
        Alert.alert("Success", "Email verified successfully!", [
          {
            text: "OK",
            onPress: () => router.push("/auth/sign-in"),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        (error as any).response?.data?.message || "Failed to verify email"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>We've sent a verification email to:</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.instructions}>
          Please enter the 6-digit verification code sent to your email.
        </Text>

        <TextInput
          style={styles.input}
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          maxLength={6}
          placeholderTextColor="#95a5a6"
        />

        <TouchableOpacity
          style={[styles.button, isVerifying && styles.buttonDisabled]}
          onPress={handleVerifyEmail}
          disabled={isVerifying}
        >
          <Text style={styles.buttonText}>
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isResending && styles.buttonDisabled]}
          onPress={handleResendVerification}
          disabled={isResending}
        >
          <Text style={styles.buttonText}>
            {isResending ? "Sending..." : "Resend Verification Email"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/auth/sign-in")}
        >
          <Text style={styles.backButtonText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3498db",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: "#3498db",
    fontSize: 16,
  },
});
