import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Animated,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Header_Max_Height = 280;
const Header_Min_Height = 260;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const HomeRectangle = ({
	coin,
	balance,
	ars,
}: {
	coin: string;
	balance: number | string;
	ars: number | string;
}) => {
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["rgba(255, 255, 255, 0.35)", "transparent"]} // White with 50% opacity to transparent
				start={{ x: 1, y: 0 }} // Top-left corner
				end={{ x: 0, y: 1 }} // Bottom-right corner
				style={styles.card}
			>
				<View style={styles.container}>
					<Text style={styles.text}>Tu dinero</Text>
					<Text style={styles.BoldText}>
						{coin} {balance}
					</Text>
					<Text style={styles.text}>~ARS$ {ars}</Text>
					<View style={styles.buttons}>
						<TouchableOpacity style={styles.button}>
							<Ionicons
								name="arrow-up"
								size={18}
								color="white"
								style={styles.icon}
							/>
							<Text style={styles.buttonText}>Enviar</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Ionicons
								name="arrow-down"
								size={18}
								color="white"
								style={styles.icon}
								
							/>
							<Text style={styles.buttonText}>Depositar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
};

export default HomeRectangle;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "white",
		textAlign: "center",
		fontSize: 20,
	},
	rectangle: {
		justifyContent: "center", // Centra el contenido verticalmente dentro del rectángulo
		alignItems: "center", // Centra el contenido horizontalmente dentro del rectángulo
		paddingTop: 40,
	},
	BoldText: {
		color: "white",
		textAlign: "center",
		fontSize: 40,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 50,
		padding: 8,
		width: 130,
		height: 42,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	buttons: {
		marginTop: 25,
		flexDirection: "row",
		gap: 20,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "500",
	},
	icon: {
		marginRight: 5,
		color: "white",
		
	},
	card: {
		padding: 20,
		borderRadius: 20,
		backgroundColor: "transparent",
		width: "90%",
		alignSelf: "center",
		
	},
});
