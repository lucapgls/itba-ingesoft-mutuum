import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { getLendingPostByLendingPostId } from "store/LendingPostStore"; // Assuming you have an API function to fetch loan details
import theme from "@theme/theme";
import {
	useRouter,
	useLocalSearchParams,
	useGlobalSearchParams,
    router,
} from "expo-router";
import { askForLoan, getAsking } from "api/lendingPost";
import UserStore from "store/UserStore";
import CustomButton from "@components/CustomButton";
import { fetchUser } from "api/user";
import NotificationDialog from "@components/NotificationDialog";
import { getWalletID, postWalletTransaction } from "api/wallet";


interface Requirement {
	params: {
		lending_post_id: string;
	};
}

const LoanDetailsScreen = ({ params }: Requirement) => {
	const { lending_post_id } = useLocalSearchParams();
	const [loanDetails, setLoanDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [askingIds, setAskingIds] = useState<string[]>([]);
    const [userNames, setUserNames] = useState<{ id: string; name: string }[]>(
        []
    );
	const currentUser = UserStore.getUserInfo();
	const [user, setUser] = useState<any>(null);
	const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogVisible2, setDialogVisible2] = useState(false);

	const closeDialog = () => {
		setDialogVisible(false);
	};
    
        const closeDialog2 = () => {
            setDialogVisible2(false);
        };

	const handleAskForLoan = async () => {
		
		try {
			
			askForLoan(currentUser.userId, String(lending_post_id));
		} catch (error) {
			console.error("Error al solicitar préstamo:", error);
		} finally {
			setDialogVisible(true);
		}
	};

	const fetchUserNames = async () => {
        try {
            const names = await Promise.all(
                askingIds.map(async (id) => {
                    const user = await fetchUser(id);
                    return { id, name: user[0].display_name };
                })
            );
            setUserNames(names);
        } catch (error) {
            console.error("Error al obtener nombres de usuario:", error);
        }
    };

	useEffect(() => {
		const getLoanDetails = async () => {
			try {
				
				if (lending_post_id) {
					const details = await getLendingPostByLendingPostId(
						String(lending_post_id)
					);
					setLoanDetails(details);
					const user = await fetchUser(details.lender_id);
					setUser(user[0].display_name);
				}
			} catch (error) {
				console.error("Failed to fetch loan details:", error);
			} finally {
				setIsLoading(false);
			}
		};

        const fetchAskingIds = async () => {
            try {
                if (lending_post_id) {
                    const data = await getAsking(String(lending_post_id));
                    setAskingIds(data);
                }
            } catch (error) {
                console.error("Error al obtener solicitudes de préstamo:", error);
            }
        };
        

		getLoanDetails();
		fetchAskingIds();
	}, [lending_post_id]);

	useEffect(() => {
		if (askingIds != null) {
			fetchUserNames();
		}
	}, [askingIds]);

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

    const onAccept = async (toUserId: string) => {
        console.log("TEST");
        try {
            const toWalletId = await getWalletID(toUserId);
            console.log("toWalletId", toWalletId);

            // Assuming you have a function to perform the transaction
            const lenderWalletId = currentUser.walletId;
            console.log("lenderWalletId", lenderWalletId);
            const amount = loanDetails.initial_amount;
            console.log("amount", amount);

            await postWalletTransaction(lenderWalletId, toWalletId, amount);
            console.log(`Transaction of ${amount} from ${lenderWalletId} to ${toWalletId} completed.`);
         
            
        } catch (error) {
            console.error("Error accepting loan request:", error);
        } finally {
			setDialogVisible2(true);
		}
    };

    

    return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View
				style={[
					styles.detailsContainer,
					theme.shadowAndroid,
					theme.shadowIOS,
				]}
			>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Prestamista</Text>
					<Text style={styles.value}>{user ? user : "Nombre"}</Text>
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
					</Text>
				))}
			</View>
			<View style={{ height: 25 }} />
			{loanDetails.lender_id === currentUser.userId ? (
				<>
					<View style={{ height: 20 }} />
					<Text style={styles.title}>Solicitudes</Text>
					{userNames.map(({ id, name }, index) => (
                <View key={index} style={styles.infoRow}>
                    <Text style={styles.askingId}>{name}</Text>
                    <TouchableOpacity
                        onPress={() => onAccept(id)}
                        style={styles.button}
                    >
                        <Text style={{ color: theme.colors.textWhite }}>
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
                <NotificationDialog 
                visible={dialogVisible2}
                onClose={closeDialog2}
                title="Préstamo enviado"
                text={"Su prestamo se envió al cliente con exito."} />
				</>
			) : (
				<>
				<CustomButton
					text="Solicitar"
					onPress={() => handleAskForLoan()}
				/>
			    <NotificationDialog visible={dialogVisible} onClose={closeDialog2} text="" />
				</>
			)}
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
	},
	detailsContainer: {
		width: "100%",
		padding: 18,
		backgroundColor: "white",
		borderRadius: 20,
	},
	askingId: {
		fontSize: 15,
		color: theme.colors.textBlack,
		marginTop: 8,
	},
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 0,
    }
});

export default LoanDetailsScreen;
