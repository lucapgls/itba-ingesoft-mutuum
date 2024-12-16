import React, { useRef, useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Animated,
	Dimensions,
	Image,
	RefreshControl
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
import { getLendingPostsByUserId, setLoans } from "store/LendingPostStore";
import { fetchUser } from "api/user";

const Home = () => {


	const ScrollOffsetY = useRef(new Animated.Value(0)).current;

	const [wallet, setWallet] = React.useState({ balance: 0, coin: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [loans, setLoans] = useState<Loan[]>([]);
	const [lenders, setLenders] = useState<{ [key: string]: any }>({});

	React.useEffect(() => {
		fetchMyLoans();
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


	const fetchData = async () => {
		setIsLoading(true)
		const { amount, token } = await getWalletBalance(UserStore.walletId
		);
		setWallet({ balance: amount, coin: token });
		fetchMyLoans();
	}

	// TODO: Move to loan api and set it up for the store
	const fetchMyLoans = async () => {
		setIsLoading(true);
		try {
			const userId = UserStore.userId;

			if (userId) {
				const loansArray = await getLendingPostsByUserId(userId);
				setLoans(loansArray ?? []);

				const lenderPromises = (loansArray ?? []).map(async (loan) => {
					const user = await fetchUser(loan.lender_id);
					return { lender_id: loan.lender_id, display_name: user[0].display_name };
				});

				const lenderData = await Promise.all(lenderPromises);
				const lenderMap = lenderData.reduce((acc: { [key: string]: string }, lender) => {
					acc[lender.lender_id] = lender.display_name;
					return acc;
				}, {});

				setLenders(lenderMap);
			} else {
				console.error("User ID is undefined");
			}
		} catch (error) {
			console.error("Failed to fetch user:", error);
		} finally {
			setIsLoading(false);

		}
	};

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

	// Format the ars balance so that it has 2 decimal places
	const arsBalance = convertedBalance
		? convertedBalance.toFixed(2).toString()
		: "0.00";

	const handleDepositPress = () => {
		router.push("/deposit");
	};

	return (

		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={[theme.colors.primary, "#fff"]}
				style={styles.container}
			>
				<View style={{ height: 60 }} />
				<ScrollView showsVerticalScrollIndicator={false} 
					refreshControl={
						<RefreshControl refreshing={isLoading} onRefresh={fetchData} />
					}>

					<HomeRectangle
						coin={wallet.coin}
						balance={wallet.balance}
						ars={arsBalance}
					/>

					<View style={{ height: 20 }} />

					<ParallaxCarousel />

					<View style={{ paddingHorizontal: 20 }}>
						<View style={{ height: 20 }} />
						{/* NoLoansBubble se usan cuando todavía no se solicitó/creó ningun prestamo */}
						<NoLoansBubble text="Todavía no tenes tu prestamo?" buttonText="Explorar prestamos"
							onPress={() => router.replace("/explore")} />
						{!loans.length ?
						(
							<>
						<View style={{ height: 20 }} />
						<NoLoansBubble text="Queres hacer rendir tu plata?" buttonText="Crear prestamo"
							onPress={() => router.push("/create_loan")} />
							</>
						) : null}
						{loans.length ? (
							<>
								{/* <View style={{ height: 20 }} /> */}
								{/* <RecentUsersBubble Users={lenders} /> */}
								{/* <View style={{ height: 20 }} /> */}
								{/* <HomeBubble loans={loans} /> */}
							</>
						) : null}

						{/* <HomeBubble loans={loans} /> */}
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
function setLenders(lenderMap: { [key: string]: string; }) {
	throw new Error("Function not implemented.");
}

