import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import React from "react";
import BubbleProfile from "../../components/BubbleProfileInfo";
import ProfileBubble from "../../components/ProfileBubble";
import { router, Link } from "expo-router";

const Profile = ({
	dni,
	email,
	phoneNumber,
}: {
	dni: string;
	email: string;
	phoneNumber: string;
}) => {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.rectangle}>
				<View style={{ height: 50 }} />
				<Image
					source={{
						uri: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=",
					}}
					style={styles.circle}
				/>
				<View style={{ height: 20 }} />
				<Text style={styles.text}>Nombre</Text>
			</View>

			<View style={styles.options}>
				<ProfileBubble title="Mis datos" icon="person" onPress={() => {}} />
          <View style={{ height: 15 }} />
          <ProfileBubble title="Notificaciones" icon="notifications" onPress={() => {}} />
          <View style={{ height: 15 }} />
          <ProfileBubble title="Invitar amigos" icon="people" onPress={() => {}} />
          <View style={{ height: 15 }} />
          <ProfileBubble title="Configuración" icon="settings" onPress={() => {}} />
          <View style={{ height: 15 }} />
          <ProfileBubble title="Ayuda" icon="accessibility" onPress={() => {}} />
          <View style={{ height: 30 }} />
          <TouchableOpacity >
          <Link href="/sign-in" asChild>
            <TouchableOpacity >
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
            </Link>
          </TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: "100%",
		width: "100%",
    
	},
	text: {
		color: "white",
		textAlign: "center",
		fontSize: 25,
	},
	circle: {
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	rectangle: {
		backgroundColor: "#8E66FF",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 260,
	},
  options: {
    padding: 20,
    justifyContent: "center",
  },
  buttonText: {
    color: "#e35349",
    fontSize: 18,
    textAlign: "center",
  },
});