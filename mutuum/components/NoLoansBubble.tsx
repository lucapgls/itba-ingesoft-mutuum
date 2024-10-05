import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from "react-native";
import React from "react";
import UserLoanSmallCard from "./UserLoanSmallCard";
import { Loan } from "../models/Loan";
import { router } from "expo-router";
import theme from "@theme/theme";

interface NoLoanProps {
	
	text: string;
    buttonText: string;
    onPress: () => void;
	
}

const NoLoansBubble:React.FC<NoLoanProps> = ({
	
	text,
    buttonText,
    onPress,
	
}) => {
	return (
		<View style={styles.container}>
			<Pressable
				onPress={onPress}
				style={styles.containerPress}
			>
				<View style={styles.rectangle}>
					<View style={styles.header}>
						<Text style={styles.title}>
							{text}
						</Text>
						<View style={{ height: 12 }} />
						<View style={styles.button}>
							<Text style={styles.buttonText}>
								{buttonText}
							</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</View>
	);
};

export default NoLoansBubble;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
	},
	rectangle: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		width: "100%",
		backgroundColor: "white",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		// Elevation for Android
		elevation: 4,
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
	},

	buttonText: {
		color: theme.colors.textWhite,
		fontSize: 14,
		fontWeight: "600",
	},
	button: {
		paddingVertical: 10,
        paddingHorizontal: 20,
		backgroundColor: theme.colors.primary,
		borderRadius: 50,
		justifyContent: "center",
	},
    containerPress: {
        width: "100%",
    },
});
