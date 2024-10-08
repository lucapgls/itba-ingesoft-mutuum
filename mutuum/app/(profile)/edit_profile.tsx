import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ScrollView,
} from "react-native";
import { Link, router, Redirect } from "expo-router";
import CustomTextInput from "@components/CustomTextInput";
import CustomButton from "@components/CustomButton";

const EditProfile = () => {
	const [email, setEmail] = useState("miusuario@example.com");
	const [dni, setDni] = useState("12345678");
	const [telefono, setTelefono] = useState("+54123456789");
	const [contrasena, setContrasena] = useState("********");

	const handleSave = () => {
		// Handle save logic here
		console.log("Profile updated:", { email, dni, telefono, contrasena });
		router.replace("/profile");
	};

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 20 }} />
				<CustomTextInput
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					placeholder="a"
					title="Email"
				/>
				<View style={{ height: 15 }} />

				<CustomTextInput
					value={dni}
					onChangeText={setDni}
					placeholder="12345678"
					title="DNI"
				/>
				<View style={{ height: 15 }} />
				<CustomTextInput
					value={telefono}
					onChangeText={setTelefono}
					placeholder="+54123456789"
					title="Teléfono"
				/>
				<View style={{ height: 15 }} />
				<CustomTextInput
					value={contrasena}
					onChangeText={setContrasena}
					placeholder="********"
					title="Contraseña"
                    secureTextEntry
				/>
				<View style={{ height: 30 }} />
				<CustomButton text="Confirmar" onPress={handleSave} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 15,
		paddingHorizontal: 10,
	},
});

export default EditProfile;
