import React, { useRef, useMemo, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "./CustomButton";
import theme from "@theme/theme";
import NotificationDialog from "./NotificationDialog";
import { getWalletID, postWalletTransaction } from "api/wallet";
import UserStore from "store/UserStore";
import { fetchUser } from "api/user";
import LoanBottomSheet from "./LoanBottomSheet";
import { useRouter } from "expo-router";

const { height: windowHeight } = Dimensions.get("window");

interface Requirement {
    name: string;
    completed: boolean;
}

interface LoanCardProps {
    lending_post_id: string,
    id: string;
    lender_name: string;
    currency: "ETH" | "ARS";
    amount: string | number;
    interest: string | number;
    maxCuotas?: string | number;
    term: string | number;
    requirements: Requirement[];
    onPress: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({
    lending_post_id,
    id,
    lender_name,
    currency,
    amount,
    interest,
    maxCuotas,
    term,
    requirements,
    onPress,
}) => {
    const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const openBottomSheet = () => {
        setModalVisible(true);
    };

    const closeBottomSheet = () => {
        setModalVisible(false);
    };

    // Handle prestamo
    const handlePressIn = async () => {
      
        router.push({
            pathname: "/[lending_post_id]/page",
            params: { lending_post_id },
        });
        closeBottomSheet();
        // setDialogVisible(true);
        // const fromWalletID = await getWalletID(id);
        // const toWalletID = UserStore.walletId;
        // const amount = totalAmount;

        // const response = postWalletTransaction(
        //     fromWalletID,
        //     toWalletID,
        //     amount
        // );
        
        
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

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await fetchUser(id);
                setCurrentUser(user[0]);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getUser();
    }, [id]);

	

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <TouchableOpacity style={[styles.card, theme.shadowIOS, theme.shadowAndroid]} onPress={openBottomSheet}>
                <Image
                    source={{
                        uri: "https://icons.veryicon.com/png/o/miscellaneous/standard/user-274.png",
                    }}
                    style={styles.avatar}
                />
                <View style={styles.details}>
                    <Text style={styles.name}>{lender_name}</Text>
                    
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

            <LoanBottomSheet
                isVisible={isModalVisible}
                onClose={closeBottomSheet}
                term={Number(term)}
                interest={Number(interest)}
                requirements={requirements}
                currency={currency}
                monthlyAmount={monthlyAmount}
                totalAmount={totalAmount}
                handlePressIn={handlePressIn}
            />

            
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
      
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginRight: 16,
        backgroundColor: "#dbdbdb"
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
});

export default LoanCard;