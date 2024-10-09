import React, { useMemo, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import theme from "@theme/theme";

interface Requirement {
    name: string;
    completed: boolean;
}

interface LoanBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    term: number;
    interest: number;
    requirements: Requirement[];
    currency: string;
    monthlyAmount: number;
    totalAmount: number;
    handlePressIn: () => void;
}

const LoanBottomSheet: React.FC<LoanBottomSheetProps> = ({
    isVisible,
    onClose,
    term,
    interest,
    requirements,
    currency,
    monthlyAmount,
    totalAmount,
    handlePressIn,
}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["60%"], []);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <GestureHandlerRootView style={styles.sheetContainer}>
                            <BottomSheet
                                ref={bottomSheetRef}
                                index={0}
                                snapPoints={snapPoints}
                                backgroundStyle={styles.bottomSheetBackground}
                                enablePanDownToClose={true}
                                onClose={onClose}
                            >
                                <TouchableWithoutFeedback>
                                    <View style={styles.sheetContent}>
                                        <View style={styles.infoSection}>
                                            <Text style={styles.sectionTitle}>
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

                                        <View style={styles.requirementsSection}>
                                            <Text style={styles.sectionTitle}>
                                                Requisitos
                                            </Text>
                                            {requirements.map(
                                                (requirement, index) => (
                                                    <View
                                                        key={index}
                                                        style={styles.requirementRow}
                                                    >
                                                        <Text style={styles.infoText}>
                                                            {requirement.name}
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

                                        <View style={styles.financialDetails}>
                                            <Text style={styles.sectionTitle}>
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
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    sheetContainer: {
        flex: 1,
        justifyContent: "flex-end",
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
    infoText: {
        fontSize: 14,
        color: "gray",
    },
});

export default LoanBottomSheet;