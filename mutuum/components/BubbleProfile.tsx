import { View, Text, StyleSheet } from "react-native";
import React from "react";

const BubbleProfile = ({
	DNI,
	email,
	phoneNumber,
}: {
	DNI: string;
	email: string;
	phoneNumber: string;
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.rectangle}>
				<View style={styles.row}>
					<Text style={styles.text}>DNI:</Text>
					<Text style={styles.value}>{DNI}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.text}>Teléfono:</Text>
					<Text style={styles.value}>{phoneNumber}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.text}>E-mail:</Text>
					<Text style={styles.value}>{email}</Text>
				</View>
			</View>
		</View>
	);
};

export default BubbleProfile;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
	},
	rectangle: {
		marginTop: 20,
		width: "90%",
		height: 300,
		backgroundColor: "#f1f1f1",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,
		paddingLeft: 10,
		paddingRight: 15,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20,
	},
	text: {
		fontSize: 18,
		color: "black",
		marginTop: 20,
		left: 15,
	},
	value: {
		textAlign: "right",
		fontSize: 18,
		fontWeight: "ultralight",
		marginTop: 18,
	},
});
