import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { getLendingPostByLendingPostId } from "store/LendingPostStore"; // Assuming you have an API function to fetch loan details
import theme from "@theme/theme";
import {
	useRouter,
	useLocalSearchParams,
	useGlobalSearchParams,
} from "expo-router";
import { fetchUser } from "api/user";

interface Requirement {
	params: {
		lending_post_id: string;
		
	};
}

const LoanDetailsScreen = ({ params }: Requirement) => {
	const { lending_post_id } = useLocalSearchParams();
	const [loanDetails, setLoanDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getLoanDetails = async () => {
			try {
				console.log(
					"lending_post_id",
					lending_post_id,
					String(lending_post_id)
				);
				if (lending_post_id) {
					const details = await getLendingPostByLendingPostId(
						String(lending_post_id)
					);
					setLoanDetails(details);
				}
			} catch (error) {
				console.error("Failed to fetch loan details:", error);
			} finally {
				setIsLoading(false);
			}
		};

		getLoanDetails();
	}, [lending_post_id]);
	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
			</View>
		);
	}

	if (!loanDetails) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>
					Failed to load loan details.
				</Text>
			</View>
		);
	}
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={[styles.detailsContainer, theme.shadowAndroid, theme.shadowIOS]}>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Prestamista</Text>
					<Text style={styles.value}>{loanDetails.lender_name? loanDetails.lender_name : 'Nombre'}</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Monto</Text>
					<Text style={styles.value}>
						{loanDetails.initial_amount}
					</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Interes</Text>
					<Text style={styles.value}>{loanDetails.interest}%</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Plazo</Text>
					<Text style={styles.value}>{loanDetails.quotas} meses</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Moneda</Text>
					<Text style={styles.value}>
						{loanDetails.currency ?? "USD"}
					</Text>
				</View>
				<Text style={styles.label}>Requerimientos</Text>
                <View style={{ height: 8 }} />
				{loanDetails.requirements.map((req: any, index: number) => (
					<Text key={index} style={styles.requirement}>
						{req.name}{" "}
						{req.completed ? "(Completed)" : "(Pending)"}
					</Text>
				))}
				
			</View>

            <View style={{ height: 16 }} />
				<Text style={styles.title}>Solicitudes</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: theme.colors.background,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: theme.colors.background,
	},
	title: {
		fontSize: 18,
		fontWeight: "500",
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 18,
	},
	label: {
		color: theme.colors.textBlack,
		fontWeight: "500",
		fontSize: 15,
	},
	value: {
		fontSize: 15,
		color: theme.colors.textBlack,
	},
	requirement: {
		fontSize: 15,
		marginLeft: 18,
	},
	errorText: {
		fontSize: 18,
		color: "red",
	},detailsContainer: {
		width: "100%",
		padding: 18,
		backgroundColor: "white",
		borderRadius: 20,
	},
});

export default LoanDetailsScreen;
