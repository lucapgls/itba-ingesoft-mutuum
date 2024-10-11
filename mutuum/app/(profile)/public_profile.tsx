import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationCard from "@components/NotificationCard";
import { Ionicons } from "@expo/vector-icons";
import theme from "@theme/theme"; // Assuming you have a theme file
import UserStore from "store/UserStore";
import { observer } from "mobx-react-lite";
import {
	interpolate,
	useAnimatedStyle,
	useScrollViewOffset,
	withDecay,
} from "react-native-reanimated";
import { Rating, AirbnbRating } from "react-native-ratings";
import { LinearGradient } from "expo-linear-gradient";
import LoanCard from "@components/LoanCard";
import { Skeleton } from "moti/skeleton";
import { fetchUser } from "api/user";
import { getLendingPostsByUserId } from "../../store/LendingPostStore";
import Animated, { useAnimatedRef } from "react-native-reanimated";

const PublicProfile = observer(() => {
	const [loans, setLoans] = useState<any[]>([]);
	const [lenders, setLenders] = useState<{ [key: string]: any }>({});
	const [isLoading, setIsLoading] = useState(true);
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const scrollOffset = useScrollViewOffset(scrollRef);
	const HEADER_HEIGHT = 130;
	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, 0]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const userId = UserStore.userId;

			if (userId) {
				const loansArray = await getLendingPostsByUserId(userId);
				setLoans(loansArray ?? []);

				const lenderPromises = (loansArray ?? []).map(async (loan) => {
					const user = await fetchUser(loan.lender_id);
					return {
						lender_id: loan.lender_id,
						display_name: user[0].display_name,
					};
				});

				const lenderData = await Promise.all(lenderPromises);
				const lenderMap = lenderData.reduce(
					(acc: { [key: string]: string }, lender) => {
						acc[lender.lender_id] = lender.display_name;
						return acc;
					},
					{}
				);

				setLenders(lenderMap);
			} else {
				console.error("User ID is undefined");
			}

			if (UserStore.userId) {
				await UserStore.fetchUserInfo();
			}
		} catch (error) {
			console.error("Failed to fetch user:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const aux = UserStore.getUserInfo();
	return (
		<View style={styles.safeArea}>
			<Animated.ScrollView
				ref={scrollRef}
				contentContainerStyle={[styles.scrollContainer]}
				style={styles.scrollView}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.background}>
					<Animated.View
						style={[
							styles.backgroundRectangle,
							headerAnimatedStyle,
						]}
					/>
					<View style={{ height: 80 }} />
					<Image
						source={{
							uri: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=",
						}}
						style={styles.circle}
					/>
					<View style={{ height: 10 }} />
					<Text style={styles.text}>{aux.displayName}</Text>
					<View style={{ height: 5 }} />
					<Text style={styles.text2}>@{aux.displayName}</Text>
					<View style={{ height: 10 }} />
					<AirbnbRating
						count={5}
						defaultRating={11}
						size={20}
						showRating={false}
					/>
					<View style={{ height: 5 }} />
					<Text style={styles.text3}>12 reseñas</Text>

					<View style={{ height: 15 }} />
					<View style={{ width: "80%" }}>
						<Text style={styles.text2}>
							Ofrezco prestamos de interes bajo y a largo plazo.
						</Text>
						<View />
					</View>
					<View style={{ height: 25 }} />

					<View style={styles.row}>
						<View
							style={[
								styles.section,
								theme.shadowIOS,
								theme.shadowAndroid,
							]}
						>
							<Text style={styles.number}>0</Text>

							<View style={{ height: 5 }} />
							<Text style={styles.title1}>Prestamos</Text>
							<Text style={styles.title1}>adquiridos</Text>
						</View>
						<View style={{ width: 30 }} />
						{/* <View style={styles.separator} /> */}

						<View
							style={[
								styles.section,
								theme.shadowIOS,
								theme.shadowAndroid,
							]}
						>
							<Text style={styles.number}>0</Text>

							<View style={{ height: 5 }} />
							<Text style={styles.title1}>Prestamos</Text>
							<Text style={styles.title1}>ofrecidos</Text>
						</View>
					</View>

					<View style={{ height: 30 }} />
					<View style={styles.loansContainer}>
						<Text style={styles.title}>Verificaciones</Text>

						<View style={{ height: 10 }} />
						<View
							style={[
								styles.requitementsContainer,
								theme.shadowIOS,
								theme.shadowAndroid,
							]}
						>
							<View style={styles.requirementRow}>
								<Text style={styles.infoText}>Email</Text>
								<Ionicons
									name={"checkmark"}
									size={22}
									color="black"
								/>
							</View>
							<View style={{ height: 8 }} />
							<View style={styles.requirementRow}>
								<Text style={styles.infoText}>DNI</Text>
								<Ionicons
									name={"checkmark"}
									size={22}
									color="black"
								/>
							</View>
							<View style={{ height: 8 }} />
							<View style={styles.requirementRow}>
								<Text style={styles.infoText}>Telefono</Text>
								<Ionicons
									name={"checkmark"}
									size={22}
									color="black"
								/>
							</View>
						</View>
					</View>
					<View style={{ height: 20 }} />
					<View style={styles.loansContainer}>
						<Text style={styles.title}>Prestamos activos</Text>

						<View style={{ height: 10 }} />
						{isLoading
							? Array.from({ length: 1 }).map((_, index) => (
									<View key={index}>
										<View
											style={[
												theme.shadowIOS,
												theme.shadowAndroid,
											]}
										>
											<Skeleton
												height={100}
												width={"100%"}
												colorMode="light"
												radius={20}
											/>
										</View>
										<View style={{ height: 16 }} />
									</View>
							  ))
							: loans.map((loan) => (
									<View key={loan.id}>
										<LoanCard
											lender_name={
												lenders[loan.lender_id] ||
												"Lender Name"
											}
											id={loan.lender_id}
											currency={loan.currency ?? "USD"}
											amount={loan.initial_amount ?? 0}
											interest={loan.interest ?? 0}
											term={loan.term ?? 0}
											requirements={
												loan.requirements ?? []
											}
											onPress={() =>
												console.log(
													`Pressed loan ${loan.id}`
												)
											}
										/>
									</View>
							  ))}
						<View style={{ height: 5 }} />
					</View>
				</View>
			</Animated.ScrollView>
		</View>
	);
});

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: theme.colors.primary,
		width: "100%",
		height: "100%",
	},

	container: {
		flex: 1,

		width: "100%",
		alignItems: "center",
		height: "100%",
	},
	scrollContainer: {
		width: "100%",

		alignItems: "center",
		justifyContent: "flex-start",
	},
	text: {
		color: theme.colors.textBlack,
		textAlign: "center",
		fontSize: 25,
		fontWeight: "500",
	},
	text2: {
		color: theme.colors.textGray,
		textAlign: "center",
		fontSize: 15,
	},
	text3: {
		color: theme.colors.textGray,
		textAlign: "center",
		fontSize: 13,
	},
	circle: {
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 5,
		borderColor: theme.colors.background,
	},
	row: {
		flexDirection: "row",
		justifyContent: "center",
	},
	section: {
		alignItems: "center",
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "500",
	},
	title1: {
		color: theme.colors.textGray,
		textAlign: "center",
		fontSize: 15,
		fontWeight: "500",
	},
	number: {
		fontSize: 20,
		color: theme.colors.textBlack,
		fontWeight: "500",
	},
	separator: {
		width: 1,
		height: "100%",
		backgroundColor: theme.colors.borderGray,
	},
	loansContainer: {
		width: "100%",
		paddingHorizontal: 0,
	},
	requirementRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	infoText: {
		color: theme.colors.textBlack,

		fontSize: 15,
	},
	backgroundRectangle: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 130, // Adjust this value based on the height of the image
		backgroundColor: theme.colors.primary, // Background color
		zIndex: -1, // Send the rectangle behind other elements
	},
	scrollView: {
		flex: 1,
		backgroundColor: theme.colors.background, // Reset ScrollView background
		width: "100%",
	},

	background: {
		width: "100%",
		height: "100%",
		paddingHorizontal: 20,
		alignItems: "center",
	},
	requitementsContainer: {
		width: "100%",
		padding: 18,
		backgroundColor: "white",
		borderRadius: 20,
	},
});

export default PublicProfile;
