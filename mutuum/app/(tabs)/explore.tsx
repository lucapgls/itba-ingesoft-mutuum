import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from "react-native";
import  { useEffect, useState } from "react";
import { supabase } from "../(auth)/SupabaseConfig";
import { router } from "expo-router";
import LoanCard from "../../components/LoanCard";
import CustomButton from "../../components/CustomButton";
import { getLoans, loadLoans } from "../../store/LoanStore";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';




const Explore = () => {
	const [loans, setLoans] = useState<any[]>([]); 
	const [searchText, setSearchText] = useState('');


	useEffect(() => {
		const fetchData = async () => {
			await loadLoans();
			const loansArray = getLoans(); 
			setLoans(loansArray);
			console.log(loansArray);
		};
		fetchData();
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
					<TouchableOpacity style={styles.filterButton}>
						<Ionicons name="filter" size={20} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContainer}>
				
				<Text style={styles.title}>Explorar préstamos</Text>
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
							requirements={[{ name: "Email", completed: true }, { name: "DNI", completed: true }, { name: "Teléfono", completed: false }]}
							onPress={() =>
								console.log(`Pressed loan ${loan.id}`)
							}
						/>
					</View>
				))}
				<View style={{ height: 8 }} />
			
				
			</ScrollView>
		</View>
	);
};
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
		width: "85%",
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
		backgroundColor: "#f2f2f2",
		
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

export default Explore;
