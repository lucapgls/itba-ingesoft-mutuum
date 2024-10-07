import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { User } from "../models/User"; // Assuming you have a User model
import theme from "@theme/theme";

const RecentUsersBubble = ({ Users }: { Users: User[] }) => {
	return (
		<View style={styles.container}>
			<View style={[styles.rectangle, theme.shadowAndroid, theme.shadowIOS]}>
				<View style={styles.header}>
					<Text style={styles.title}>Conexiones recientes</Text>
					<TouchableOpacity>
						<Text style={styles.buttonText}>Ver más</Text>
					</TouchableOpacity>
				</View>
				<View style={{ height: 15 }} />
				<View style={styles.UsersContainer}>
					{Users.map((User) => (
						<View key={User.id} style={styles.UserCard}>
							<Image
								source={{
									uri: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=",
								}}
								style={styles.profilePicture}
							/>
							<Text style={styles.UserName}>{User.userName}</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

export default RecentUsersBubble;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
	},
	rectangle: {
		padding: 20,
		width: "100%",
		backgroundColor: "white",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,

		
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontSize: 18,
		fontWeight: "500",
	},
	UsersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		width: "100%",
	},
	UserCard: {
		alignItems: "center",
	},
	profilePicture: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	UserName: {
		marginTop: 5,
		fontSize: 14,
		textAlign: "center",
	},
	buttonText: {
		color: theme.colors.primary,
		fontSize: 14,
	},
});
