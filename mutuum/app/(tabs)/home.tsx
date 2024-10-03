import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, Animated } from "react-native";
import HomeRectangle from "../../components/HomeRectangle";
import HomeBubble from "../../components/HomeBubble";
import RecentUsersBubble from "../../components/RecentClientsBubble";
import { Loan } from "../../models/Loan";
import { User } from "../../models/User"; // Assuming you have a User model
import { LinearGradient } from "expo-linear-gradient";
import { getConvertToARS, getWalletBalance } from "../../api/wallet";
import theme from '@theme/theme';

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

	const [wallet, setWallet] = React.useState({ balance: 0, coin: "" });

	React.useEffect(() => {
		const fetchWalletBalance = async () => {
			const { amount, token } = await getWalletBalance("35ba7ec3-f2e7-5033-b6e1-014c7c24142c");
			setWallet({ balance: amount, coin: token });
		};
		fetchWalletBalance();
	}, []);

	

	const [convertedBalance, setConvertedBalance] = React.useState<number | null>(null);

	React.useEffect(() => {
		const convertBalance = async () => {
			const { amount, token } = await getConvertToARS(wallet.balance, wallet.coin);
			setConvertedBalance(amount);
		};
		if (wallet.balance && wallet.coin) {
			convertBalance();
		}
	}, [wallet]);

	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={[theme.colors.primary, "#fff"]}
				style={styles.container}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ height: 10 }} />
					<HomeRectangle coin={wallet.coin} balance={wallet.balance} ars={convertedBalance ?? 0} />
					
					<View style={{ height: 20 }} />
					<View style={{ paddingHorizontal: 20 }}>
						<RecentUsersBubble Users={Users} />
						<View style={{ height: 20 }} />
						<HomeBubble loans={loans} />
					</View>
					<View style={{ height: 20 }} />
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
