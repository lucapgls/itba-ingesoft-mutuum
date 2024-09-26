import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import LoanCard from "../../components/LoanCard";
import { loadLoans, getLoans } from "../../store/LoanStore";

const MyLoans = () => {
    const [loans, setLoans] = useState<any[]>([]);
    //TODO: get current user ID
    const currentUserId = "user_123"; 

    useEffect(() => {
        const fetchLoansData = async () => {
            await loadLoans();
            const allLoans = getLoans();
            const userLoans = allLoans.filter(loan => loan.lender_id === currentUserId);
            setLoans(userLoans);
        };
        fetchLoansData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ height: 40 }} />
            <Text style={styles.title}>Mis préstamos</Text>
            <View style={{ height: 15 }} />

            <FlatList
                data={loans}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LoanCard
                        color="red"
                        name="Loan" 
                        currency="ETH"
                        amount={item.initial_amount}
                        interest={item.interest}
                        term={item.dead_line}
                        requirements={item.requirements} 
                        onPress={() => {
                            
                        }}
                    />
                )}
            />
        </View>
    );
};

export default MyLoans;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        flex: 1,
        justifyContent: "flex-start",
    },
    title: {
        color: "black",
        fontSize: 20,
    },
});
