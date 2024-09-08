import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import LoanCard from "../../components/LoanCard";

const MyLoans = () => {
	return (
		<View style={styles.container}>
      <View style={{ height: 40 }} />
		 <Text style={styles.title}>Mis préstamos</Text>
      <View style={{ height: 15 }} />

			<LoanCard
			  color="red"
			  name="Loan"
			  currency="ETH"
			  amount={1000}
			  interest={0.1}
			  onPress={() => {}}
        
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
	button: {
		backgroundColor: "#8E66FF",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
		width: 200,
	},
});
