import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import theme from '@theme/theme';

interface UserLoanSmallCardProps {
	profilePicture: string;
	name: string;
	role: "borrower" | "lender";
	amount: number;
	interests: number;
	coinType: string;
}

const UserLoanSmallCard: React.FC<UserLoanSmallCardProps> = ({
	profilePicture,
	name,
	role,
	amount,
	interests,
}) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: profilePicture }}
				style={styles.profilePicture}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.role}>
					{role === "borrower" ? "Deudor" : "Prestamista"}
				</Text>
			</View>
			<View style={styles.amountContainer}>
				<Text style={styles.amount}>{amount}</Text>
				<Text style={styles.interest}>Interés {interests}%</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
	},
	profilePicture: {
		width: 45,
		height: 45,
		borderRadius: 25,
		marginRight: 10,
		backgroundColor: theme.colors.iconGray,
	},
	textContainer: {
		flex: 1,
		justifyContent: "center",
	},
	name: {
		fontSize: 18,
	},
	role: {
		fontSize: 14,
		color: theme.colors.textGray,
	},
	amountContainer: {
		alignItems: "flex-end",
	},
	amount: {
		fontSize: 16,
	},
	interest: {
		fontSize: 14,
		color: theme.colors.textGray,
	},
});

export default UserLoanSmallCard;
