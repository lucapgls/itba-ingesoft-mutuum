import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
} from "react-native";
import { Link, router, Redirect } from "expo-router";
import CustomTextInput from "@components/CustomTextInput";
import CustomButton from "@components/CustomButton";
import UserStore from "store/UserStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import * as ImagePicker from 'expo-image-picker';

const EditProfile = observer(() => {
	
	const [email, setEmail] = useState("");
	const [dni, setDni] = useState("");
	const [telefono, setTelefono] = useState("");
	const [contrasena, setContrasena] = useState("********");
	const [profilePicture, setProfilePicture] = useState("");
	

	const handleImagePick = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert('Se requieren permisos para acceder a la galería.');
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			console.log(result.assets[0].uri);
			setProfilePicture(result.assets[0].uri);
		}
	};




	const handleSave = async () => {
		// Handle save logic here
		await UserStore.updateUserInfo(dni, telefono);
		await UserStore.updateProfilePicture(profilePicture);
		console.log("Profile updated:", { dni, telefono, profilePicture });
		router.replace("/profile");
	};

	useEffect(() => {
		const fetchData = async () => {
			if (UserStore.userId) {
				// await UserStore.fetchUserInfo();
				const userInfo = UserStore.getUserInfo();
				// Set individual states based on the fetched user information
				setEmail(userInfo.email ? userInfo.email : "");
				setDni(userInfo.dni ? userInfo.dni : "");
				setTelefono(userInfo.phoneNumber ? userInfo.phoneNumber : "");
				setProfilePicture(userInfo.profilePicture ? userInfo.profilePicture : "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=");
				// Password could stay the same unless it's fetched or changed
				setContrasena("");
			}
		};
		fetchData();
	}, [UserStore.userId]);
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 20 }} />

				<View style={{ height: 10 }} />
				<TouchableOpacity onPress={handleImagePick} style={{ alignItems: "center" }}>
					<Image
						source={{
							uri: profilePicture,
						}}
						style={styles.circle}
					/>
				</TouchableOpacity>
			<View style={{ height: 10 }} />
				<CustomTextInput
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					placeholder="usuario@ejemplo.com"
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
});

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
	circle:{
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	}
});

export default EditProfile;
