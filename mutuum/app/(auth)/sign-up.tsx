import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import { router, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomTextInput from "../../components/CustomTextInput";
import { supabase } from "./SupabaseConfig";
import { postCreateWallet } from "../../wallet/postNewWallet";

// Sign up a user using Supabase Auth
export const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error('Error signing up user:', error.message);
    throw error;
  }

  // We create a wallet for the user
  const wallet_ids = await postCreateWallet();
  if (!wallet_ids) {
	throw new Error('Error creating wallet');
  }
  const wallet_id = wallet_ids[0];

//   console.log("My wallet id is!!!!!! " + wallet_id);

  const { error: updateError } = await supabase
	  .from('users')
	  .update({ wallet_id: wallet_id })
	  .eq('id', data?.user?.id);

  if (error) {
	  console.error('Error setting user wallet_id:', updateError?.message);
	  throw error;
  }

  return data;
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
            <StatusBar backgroundColor="#c6b3ff"  />
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
				<CustomButton
					onPress={handleSignUp}
					text="Resgistrarse"
				/>
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
