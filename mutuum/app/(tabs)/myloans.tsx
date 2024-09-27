import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList 
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../(auth)/SupabaseConfig";
import { router } from "expo-router";
import LoanCard from "../../components/LoanCard";
import CustomButton from "../../components/CustomButton";

import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { loadLoans, getLoans } from "../../store/LoanStore";

const MyLoans = () => {
    const [loans, setLoans] = useState<any[]>([]);
    //TODO: get current user ID
    const currentUserId = "user_123"; 
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const fetchLoansData = async () => {
            const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
		const currentUserId = user?.id;

            await loadLoans();
            const allLoans = getLoans();
            const userLoans = allLoans.filter(loan => loan.lender_id === currentUserId);
            setLoans(userLoans);
        };
        fetchLoansData();
    }, []);

    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ height: 50 }} />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.searchSection}>
                        <FontAwesome
                            name="search"
                            size={20}
                            color="#bdbdbd"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar préstamos"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Mis préstamos</Text>
                <View style={{ height: 10 }} />

                {loans.map((loan) => (
                    <View style={styles.card} key={loan.id}>
                        <LoanCard
                            color={loan.color ?? "#8E66FF"}
                            name={loan.name ?? "Préstamo"}
                            currency={loan.currency ?? "USD"}
                            amount={loan.initial_amount ?? 0}
                            interest={loan.interest ?? 0}
                            term={loan.term ?? 0}
                            // maxCuotas={loan.maxCuotas ?? 0}
                            requirements={loan.requirements ?? []}
                            onPress={() =>
                                console.log(`Pressed loan ${loan.id}`)
                            }
                        />
                    </View>
                ))}

                <CustomButton
                    text="Ofrecer nuevo préstamo"
                    onPress={() => router.push("/create_loan")}
                />
            </ScrollView>
        </View>
    );
};

export default MyLoans;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: "flex-start",
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#8E66FF",
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        
        borderRadius: 50,
        paddingHorizontal: 10,
        width: "100%",
        marginVertical: 15,
        backgroundColor: "white",
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
    },
    card: {
        marginBottom: 0, // Fixed space between cards
    },
    button: {
        backgroundColor: "#8E66FF",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    filterButton: {
    
        borderRadius: 50,
        backgroundColor: "white",
        height: 40,
        width: 40,
        
        padding: 10,
    },
});