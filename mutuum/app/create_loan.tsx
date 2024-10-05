import React, { useState } from "react";
import {
	View,
	ScrollView,
	Alert,
	Modal,
	TouchableOpacity,
	Text,
	StyleSheet,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomChip from "../components/CustomChip";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "./(auth)/SupabaseConfig";
import { router } from "expo-router";
import API_BASE_URL from "../api/api_temp"; 
import theme from '@theme/theme';
import { createLendingPostAndRequirements } from "api/loan";
import { addLoan } from "store/LoanStore";


// Function to create a new lending post
export const createLendingPost = async (
	lenderId: string, // ID of the lender (from auth.users.id)
	initialAmount: number, // Total amount for the lending post
	interest: number, // Interest rate for the loan
	deadline: string // Deadline for loan repayment (formatted as string)
) => {
	// Insert into the lending_post table
	const { data, error } = await supabase.from("lending_post").insert([
		{
			lender_id: lenderId, // Lender's ID from auth.users.id
			initial_amount: initialAmount, // Total loan amount
			available_amount: initialAmount, // Initially available amount is the total amount
			interest: interest, // Interest rate for the loan
			dead_line: deadline, // Deadline for repayment (must be a valid date string)
		},
	]);

	if (error) {
		console.error("Error creating lending post:", error.message);
		throw error;
	}

	return data;
};

const CreateLoan: React.FC = () => {
	const [coinType, setCoinType] = useState("");
	const [amount, setAmount] = useState("");
	const [quotas, setQuotas] = useState("");
	const [interests, setInterests] = useState("");
	const [isEmailEnabled, setIsEmailEnabled] = useState(false);
	const [isPhoneNumberEnabled, setIsPhoneNumberEnabled] = useState(false);
	const [isIdEnabled, setIsIdEnabled] = useState(false);
	const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
	const [isPickerVisible, setPickerVisible] = useState(false);
	const [selectedValue, setSelectedValue] = useState("0");

	const handleChipPress = (chipType: string) => {
		switch (chipType) {
			case "email":
				setIsEmailEnabled(!isEmailEnabled);
				break;
			case "phone":
				setIsPhoneNumberEnabled(!isPhoneNumberEnabled);
				break;
			case "id":
				setIsIdEnabled(!isIdEnabled);
				break;
			case "faceId":
				setIsFaceIdEnabled(!isFaceIdEnabled);
				break;
			default:
				break;
		}
	};

	const togglePicker = () => {
		setPickerVisible(!isPickerVisible);
	};

	const handleCreateLoan  = async () => {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
		const userId = user?.id;

		if (!userId) {
			Alert.alert("Error", "Debe iniciar sesion para publicar un prestamo");
			return;
		}

		const initialAmount = parseFloat(amount);
		const interest = parseFloat(interests);
		const deadline = new Date().toISOString(); // Update this with the actual value

		const requirements = [
			{ name: "Email Required", completed: isEmailEnabled },
			{ name: "Phone Required", completed: isPhoneNumberEnabled },
		];

		try {
			await addLoan(userId, initialAmount, initialAmount, interest, deadline, requirements);


			router.replace("/explore");
			Alert.alert("Success", "Lending post created successfully!");
		} catch (error) {
			Alert.alert("Error", "Failed to create lending post.");
		}
	
	};

	return (
		<ScrollView style={styles.container}>
			<CustomTextInput
				placeholder="0"
				value={amount}
				onChangeText={setAmount}
				title="Valor (ETH)"
				keyboardType="numeric"
			/>
			<View style={{ height: 14 }} />
			<CustomTextInput
				placeholder="00%"
				value={interests}
				onChangeText={setInterests}
				title="Interes (%)"
				keyboardType="numeric"
				maxLength={2}
			/>
			<View style={{ height: 14 }} />

			<Text style={{ fontSize: 15 }}>Requerimientos</Text>
			<View style={{ height: 10 }} />
			<View style={styles.chipContainer}>
				<CustomChip
					text="E-mail"
					enabled={isEmailEnabled}
					onPress={() => handleChipPress("email")}
				/>
				<CustomChip
					text="Telefono"
					enabled={isPhoneNumberEnabled}
					onPress={() => handleChipPress("phone")}
				/>
				<CustomChip
					text="DNI"
					enabled={isIdEnabled}
					onPress={() => handleChipPress("id")}
				/>
				<CustomChip
					text="Face ID"
					enabled={isFaceIdEnabled}
					onPress={() => handleChipPress("faceId")}
				/>
			</View>
			<View style={{ height: 8 }} />
			<View>
				<Text style={{ fontSize: 15 }}>Plazo (Meses)</Text>
				<View style={{ height: 10 }} />
				<TouchableOpacity onPress={togglePicker}>
					<View style={styles.pickerValue}>
						<Text style={{ fontSize: 16, paddingStart: 14 }}>
							{selectedValue}
						</Text>
					</View>
				</TouchableOpacity>

				<Modal
					visible={isPickerVisible}
					transparent={true}
					animationType="fade"
					onRequestClose={togglePicker}
				>
					<View style={styles.modalContainer}>
						<View style={styles.pickerContainer}>
							<View style={{ alignItems: "center" }}>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "600",
										marginBottom: 20,
									}}
								>
									Meses
								</Text>
							</View>
							<Picker
								selectedValue={selectedValue}
								onValueChange={(itemValue) =>
									setSelectedValue(itemValue)
								}
							>
								{Array.from({ length: 25 }, (_, i) => (
									<Picker.Item
										key={i}
										label={i.toString()}
										value={i.toString()}
									/>
								))}
							</Picker>

							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<TouchableOpacity onPress={togglePicker}>
									<Text style={styles.closeButton}>
										Aceptar
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>

			<View style={{ height: 30 }} />

			<CustomButton text="Crear préstamo" onPress={handleCreateLoan } />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: theme.colors.background,
	},
	chipContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	
	input: {
		height: 40,
		borderColor: theme.colors.borderGray,
		borderWidth: 1,
		paddingHorizontal: 8,
	},
	button: {
		backgroundColor: theme.colors.primary,
		color: "white",
		marginTop: 16,
		padding: 16,
		borderRadius: 4,
		alignItems: "center",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	pickerContainer: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		width: "80%",
	},
	pickerValue: {
		borderWidth: 2,
		borderColor: theme.colors.borderGray,
		justifyContent: "center",
		width: "30%",
		borderRadius: 12,
		height: 50,
		color: "black",
		fontSize: 16,
	},
	closeButton: {
		color: theme.colors.primary,
		fontSize: 18,
		marginTop: 20,
	},
});

export default CreateLoan;
