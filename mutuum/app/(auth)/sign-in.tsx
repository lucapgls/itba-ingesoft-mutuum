import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import GoogleButton from "../../components/GoogleButton";
import CustomTextInput from "../../components/CustomTextInput";

import { supabase } from "./SupabaseConfig";

// Sign in the user with email and password
export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in user:', error.message);
    throw error;
  }

  return data;
};


const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async () => {
		await signInUser(email, password);
	};

	const handleGoogleSignIn = async () => {
		console.log("Not yet implemented");
	};

	return (
		<View style={styles.safeArea}>
			<View style={styles.rectangle}>
				<View style={{ height: 30 }} />
				<Text style={styles.title}>Bienvenido a</Text>
				<Text style={styles.mutuum}>Mutuum</Text>
			</View>

			<View style={{ padding: 20 }}>
				
				<CustomTextInput
					placeholder="example@mail.com"
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
				<CustomButton onPress={handleSignIn} text="Iniciar sesión" />
				<Text
					style={{ textAlign: "center", marginTop: 20, fontSize: 15 }}
				>
					o{" "}
				</Text>

				<View style={styles.googleButtonContainer}>
					<GoogleButton onPress={handleGoogleSignIn} />
				</View>
				<View style={styles.separator} />
				<Link href="/sign-up" style={{ textAlign: "center" }}>
					<Text style={{ textAlign: "center", fontSize: 15 }}>
						¿Todavía no tenes cuenta?{" "}
						<Text style={{ color: "#8E66FF", fontWeight: 600 }}>
							Registrate
						</Text>
					</Text>
				</Link>

				<Link href="/home" style={{ textAlign: "center", marginTop:20 }}>
					<Text style={{ textAlign: "center", fontSize: 15 }}>
						Continuar como{" "}
						<Text style={{ color: "#8E66FF", fontWeight: 600 }}>
							invitado
							</Text>
					</Text>
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,

		backgroundColor: "white",
		justifyContent: "flex-start",
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		width: "100%",
		backgroundColor: "white",
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
		color: "black",
		fontSize: 15,
		marginBottom: 5,
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
	googleButton: {
		marginTop: 15,
		borderRadius: 30,
	},
	googleButtonContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 20,
	},
	separator: {
		height: 1,
		backgroundColor: "#CBCBCB",
		marginVertical: 30,
		width: "80%",
		alignSelf: "center",
	},
});

export default SignIn;