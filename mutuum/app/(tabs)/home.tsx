import React, { useRef } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Animated,
	Dimensions,
	Image,
} from "react-native";
import HomeRectangle from "@components/HomeRectangle";
import HomeBubble from "@components/HomeBubble";
import RecentUsersBubble from "@components/RecentClientsBubble";
import { Loan } from "../../models/Loan";
import { User } from "../../models/User"; // Assuming you have a User model
import { LinearGradient } from "expo-linear-gradient";
import { getConvertToARS, getWalletBalance } from "../../api/wallet";
import theme from "@theme/theme";
import Carousel from "react-native-reanimated-carousel";
import ParallaxCarousel from "@components/ParallaxCarousel";
import NoLoansBubble from "@components/NoLoansBubble";
import { router } from "expo-router";
import UserStore from "store/UserStore";

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

			const { amount, token } = await getWalletBalance(UserStore.walletId
			);
			setWallet({ balance: amount, coin: token });
		};
		fetchWalletBalance();
	}, []);

	const [convertedBalance, setConvertedBalance] = React.useState<
		number | null
	>(null);

	React.useEffect(() => {
		const convertBalance = async () => {
			const { amount, token } = await getConvertToARS(
				wallet.balance,
				wallet.coin
			);
			setConvertedBalance(amount);
		};
		if (wallet.balance && wallet.coin) {
			convertBalance();
		}
	}, [wallet]);

	const { width: screenWidth } = Dimensions.get("window");
	const paddingHorizontal = 20;
	const carouselWidth = screenWidth - 2 * paddingHorizontal;

	const carouselList = [
		{
			id: 1,
			title: "Title 1",
			description: "Description 1",
			image: require("@assets/images/thumbnail.png"),
		},
	];

	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={[theme.colors.primary, "#fff"]}
				style={styles.container}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ height: 10 }} />
					<HomeRectangle
						coin={wallet.coin}
						balance={wallet.balance}
						ars={convertedBalance ?? 0}
					/>

					<View style={{ height: 20 }} />

					<ParallaxCarousel />

					<View style={{ paddingHorizontal: 20 }}>
					<View style={{ height: 20 }} />
					{/* NoLoansBubble se usan cuando todavía no se solicitó/creó ningun prestamo */}
						<NoLoansBubble text="Todavía no tenes tu prestamo?" buttonText="Explorar prestamos" 
						onPress={() => router.replace("/explore")}/>
						<View style={{ height: 20 }} />
						<NoLoansBubble text="Queres hacer rendir tu plata?" buttonText="Crear prestamo" 
						onPress={() => router.push("/create_loan")}/>
						<View style={{ height: 20 }} />
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
	carouselItem: {
		justifyContent: "center",
		flex: 1,
		overflow: "hidden",
	},
	carouselImage: {
		width: "100%",
		height: "100%",
	},
	img: {
		height: "100%",
		width: "100%",
	},
});

export default Home;
