import React, { useRef, useMemo, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Modal,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "./CustomButton";
import theme from '@theme/theme';
import NotificationDialog from './NotificationDialog';
import { getWalletID, postWalletTransaction } from "api/wallet";
import UserStore from "store/UserStore";

const { height: windowHeight } = Dimensions.get("window");

interface Requirement {
	name: string;
	completed: boolean;
}

interface LoanCardProps {
	
	id: string;
	currency: "ETH" | "ARS";
	amount: string | number;
	interest: string | number;
	maxCuotas?: string | number;
	term: string | number;
	requirements: Requirement[];
	onPress: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({
	
	id,
	currency,
	amount,
	interest,
	maxCuotas,
	term,
	requirements,
	onPress,
}) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["60%"], []);
	const [dialogVisible, setDialogVisible] = useState(false);

	const openBottomSheet = () => {
		setModalVisible(true);
	};

	const closeBottomSheet = () => {
		setModalVisible(false);
		
	};

	// Handle prestamo
	const handlePressIn = () => {
		// closeBottomSheet();
		// setDialogVisible(true);
		// const fromWalletID = await getWalletID(id);
		// const toWalletID = UserStore.walletId;
		// const amount = totalAmount;

		// const response = postWalletTransaction(fromWalletID, toWalletID, amount);
		// console.log(response);

	};

	const closeDialog = () => {
		setDialogVisible(false);
	  };

	const calculateTotalAmount = (
		amount: number,
		interest: number,
		term: number
	) => {
		const totalInterest = (amount * interest * term) / 100; // Se asume que interest es un porcentaje
		return amount + totalInterest;
	};

	const calculateMonthlyAmount = (
		amount: number,
		interest: number,
		term: number
	) => {
		return calculateTotalAmount(amount, interest, term) / term;
	};

	const monthlyAmount = calculateMonthlyAmount(
		Number(amount),
		Number(interest),
		Number(term)
	);
	const totalAmount = calculateTotalAmount(
		Number(amount),
		Number(interest),
		Number(term)
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<TouchableOpacity style={styles.card} onPress={openBottomSheet}>
				<Image
					source={{
						uri: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=",
					}}
					style={styles.avatar}
				/>
				<View style={styles.details}>
					<Text style={styles.name}>Nombre</Text>
					<View style={styles.currencyRow}>
						<Text style={styles.currencyText}>${currency}</Text>
						<Text style={styles.amountText}>{amount}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoText}>Interes del</Text>
						<Text style={styles.amountText}>{interest}%</Text>
						{maxCuotas && (
							<Text style={[styles.infoText, { marginLeft: 8 }]}>
								Max. cuotas: {maxCuotas}
							</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>

			<Modal
				visible={isModalVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={closeBottomSheet}
			>
				<TouchableWithoutFeedback onPress={closeBottomSheet}>
					<View style={styles.modalContainer}>
						<TouchableWithoutFeedback>
							<GestureHandlerRootView
								style={styles.sheetContainer}
							>
								<BottomSheet
									ref={bottomSheetRef}
									index={0}
									snapPoints={snapPoints}
									backgroundStyle={
										styles.bottomSheetBackground
									}
									enablePanDownToClose={true}
									onClose={closeBottomSheet}
								>
									<TouchableWithoutFeedback>
										<View style={styles.sheetContent}>
											<View style={styles.infoSection}>
												<Text
													style={styles.sectionTitle}
												>
													Información
												</Text>
												<Text style={styles.infoText}>
													Plazo: {term} meses
												</Text>
												<Text style={styles.infoText}>
													Intereses: {interest}%
												</Text>
											</View>
											<View style={styles.divider} />

											<View
												style={
													styles.requirementsSection
												}
											>
												<Text
													style={styles.sectionTitle}
												>
													Requisitos
												</Text>
												{requirements.map(
													(requirement, index) => (
														<View
															key={index}
															style={
																styles.requirementRow
															}
														>
															<Text
																style={
																	styles.infoText
																}
															>
																{
																	requirement.name
																}
															</Text>
															<Ionicons
																name={
																	requirement.completed
																		? "checkmark"
																		: "close-outline"
																}
																size={22}
																color="black"
															/>
														</View>
													)
												)}
											</View>
											<View style={styles.divider} />

											<View
												style={styles.financialDetails}
											>
												<Text
													style={styles.sectionTitle}
												>
													Dinero
												</Text>
												<Text style={styles.infoText}>
													Monto por mes: {currency}{" "}
													{monthlyAmount}
												</Text>
												<Text style={styles.infoText}>
													Monto total: {currency}{" "}
													{totalAmount}
												</Text>
											</View>

											{/* Botón para cerrar el BottomSheet */}
											<View style={{ height: 14 }} />
											<CustomButton
												text="Solicitar préstamo"
												onPress={handlePressIn}
											/>
										</View>
									</TouchableWithoutFeedback>
								</BottomSheet>
							</GestureHandlerRootView>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<NotificationDialog visible={dialogVisible} onClose={closeDialog} />
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 16,
		backgroundColor: "white",
		borderRadius: 20,
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		// Elevation for Android
		elevation: 4,
	},
	avatar: {
		width: 65,
		height: 65,
		borderRadius: 50,
		marginRight: 16,
	},
	details: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 8,
	},
	currencyRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	currencyText: {
		fontSize: 14,
		color: "gray",
	},
	amountText: {
		marginLeft: 5,
		fontSize: 14,
		fontWeight: "500",
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	infoText: {
		fontSize: 14,
		color: "gray",
	},
	bottomSheetBackground: {
		backgroundColor: "#f0f0f0",
	},
	sheetContent: {
		padding: 16,
		marginHorizontal: 16,
		flex: 1,
	},
	infoSection: {
		marginBottom: 16,
	},
	requirementsSection: {
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	requirementRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	financialDetails: {
		marginBottom: 16,
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.borderGray,
		marginVertical: 16,
	},
	
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	sheetContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

export default LoanCard;
