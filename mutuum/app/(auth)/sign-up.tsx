import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { router, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomTextInput from "../../components/CustomTextInput";
import { supabase } from "./SupabaseConfig";
import API_BASE_URL from "../../api/api_temp";

export const signUpUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password must not be empty");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
  return { success: true };
};
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await signUpUser(email, password);

      // await createUserWithEmailAndPassword(auth, email, password);
      // await addDoc(collection(firestore, "Users"), { email: email });
      Alert.alert("Exito!", "Se creo el usuario correctamente!");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#c6b3ff" />
      <View style={styles.rectangle}>
        <View style={{ height: 30 }} />
        <Text style={styles.title}>Registrate en</Text>
        <Text style={styles.mutuum}>Mutuum</Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <CustomTextInput
          placeholder="miusuario@mail.com"
          value={email}
          onChangeText={setEmail}
          title="Email"
        />
        <View style={{ height: 15 }} />

        <CustomTextInput
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          title="Contraseña"
        />
        <View style={{ height: 25 }} />
        <CustomButton onPress={handleSignUp} text="Resgistrarse" />
        <View style={styles.separator} />
        <Link href="/sign-in" style={{ textAlign: "center" }} replace>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            Ya tenes una cuenta?{" "}
            <Text style={{ color: "#8E66FF", fontWeight: 600 }}>
              Iniciar sesión
            </Text>
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
  title: {
    color: "white", // Replace with your desired primary color
    fontSize: 40, // Tailwind's text-5xl is approximately 40px
    fontWeight: "400",
  },
  mutuum: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  rectangle: {
    width: "100%",
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8E66FF",
  },
  text: {
    marginBottom: 5,
    color: "black",
    fontSize: 15,
  },
  input: {
    fontSize: 15,
    color: "#000",
    paddingStart: 10,
  },
  border: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderColor: "#CBCBCB",
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#CBCBCB",
    marginVertical: 30,
    width: "80%",
    alignSelf: "center",
  },
});
