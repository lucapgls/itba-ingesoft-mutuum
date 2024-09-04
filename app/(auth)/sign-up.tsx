import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import { auth, firestore } from "./firebaseconfig"; // Import the initialized auth and firestore instances
import { createUserWithEmailAndPassword } from "firebase/auth"; // Modular import
import { collection, addDoc } from "firebase/firestore"; // Modular import
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await addDoc(collection(firestore, "Users"), { email: email });
			Alert.alert("Success", "User signed up successfully!");
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	return (
        
		<View style={styles.safeArea}>
            <StatusBar backgroundColor="#c6b3ff"  />
			<View style={styles.rectangle}>
				<View style={{ height: 30 }} />
				<Text style={styles.title}>Register to </Text>
				<Text style={styles.mutuum}>Mutuum</Text>
			</View>

			<View style={{ padding: 20 }}>
				<Text style={styles.text}>Email</Text>
				<View style={styles.border}>
					<TextInput
						placeholder="example@mail.com"
						value={email}
						onChangeText={setEmail}
						style={styles.input}
					/>
				</View>
				<View style={{ height: 15 }} />
				<Text style={styles.text}>Password</Text>
				<View style={styles.border}>
					<TextInput
						placeholder="********"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						style={styles.input}
					/>
				</View>
				<View style={{ height: 25 }} />
				<CustomButton
					onPress={() => [router.push("/home"), handleSignUp()]}
					text="Sign up"
				/>
			</View>
		</View>
        
	);
};

export default SignUp;

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
});
