import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, Animated } from "react-native";
import HomeRectangle from "../../components/HomeRectangle";
import HomeBubble from "../../components/HomeBubble";
import RecentUsersBubble from "../../components/RecentClientsBubble";
import { Loan } from "../../models/Loan";
import { User } from "../../models/User"; // Assuming you have a User model
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
	const loans: Loan[] = [
		{
			role: "borrower",
			userId: "1",
			amount: 3.8,
			coinType: "ETH",
			interests: 5,
			quotas: 1,
		},
		{
			role: "borrower",
			userId: "2",
			amount: 3.8,
			coinType: "ETH",
			interests: 5,
			quotas: 1,
		},
		{
			role: "borrower",
			userId: "3",
			amount: 3.8,
			coinType: "ETH",
			interests: 5,
			quotas: 1,
		},
	];

	const Users: User[] = [
		{
			id: "1",
			profilePicture: "",
			userName: "Nombre",
			email: "",
		},
		{
			id: "2",
			profilePicture: "",
			userName: "Nombre",
			email: "",
		},
		{
			id: "3",
			profilePicture: "",
			userName: "Nombre",
			email: "",
		},
		{
			id: "4",
			profilePicture: "",
			userName: "Nombre",
			email: "",
		},
	];

	const ScrollOffsetY = useRef(new Animated.Value(0)).current;

	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={["#8E66FF", "#fff"]}
				style={styles.container}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ height: 40 }} />
					<HomeRectangle coin="ETH" balance="294.1" ars="239824" />
					<View style={{ height: 20 }} />
					<View style={{ paddingHorizontal: 20 }}>
						<RecentUsersBubble Users={Users} />
						<View style={{ height: 20 }} />
						<HomeBubble loans={loans} />
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
	},
});

export default Home;
