import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../(auth)/SupabaseConfig";
import { router } from "expo-router";
import LoanCard from "../../components/LoanCard";
import CustomButton from "../../components/CustomButton";
import { getLoans } from "../../store/LoanStore";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome } from "@expo/vector-icons";


// Fetch all lending posts from the lending_post table
export const fetchLendingPosts = async () => {
	const { data, error } = await supabase
		.from("lending_post") // Select from the lending_post table
		.select("*"); // Select all columns

	if (error) {
		console.error("Error fetching lending posts:", error.message);
		throw error;
	}

	return data;
};

const Explore = () => {
	const [loans, setLoans] = useState<any[]>([]); // Estado para almacenar los préstamos
	const [searchText, setSearchText] = useState('');
	/*  useEffect(() => {
    const loadLendingPosts = async () => {
      try {
        const data = await fetchLendingPosts();
        setLoans(data);  // Almacena los préstamos en el estado
      } catch (error) {
        console.error('Error loading loans:', error);
      }
    };
    loadLendingPosts();  // Llama a la función para cargar los préstamos
  }, []);
  */

	useEffect(() => {
		const loansArray = getLoans(); // Obtener los préstamos del array
		setLoans(loansArray);
		console.log(loansArray);
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
							  placeholder="Buscar prestamos"
							  value={searchText}
							  onChangeText={setSearchText}
						/>
					</View>
					<TouchableOpacity style={styles.filterButton}>
						<FontAwesome name="filter" size={20} color="gray" />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={{ height: 20 }} />
				<Text style={styles.title}>Préstamos recomendados</Text>
				<View style={{ height: 10 }} />

				{loans.map((loan) => (
					<View style={styles.card} key={loan.id}>
						<LoanCard
							color={loan.color ?? "#8E66FF"}
							name={loan.name ?? "Prestamo"}
							currency={loan.currency ?? "USD"}
							amount={loan.amount ?? 0}
							interest={loan.interest ?? 0}
							term={loan.term ?? 0}
							// maxCuotas={loan.maxCuotas ?? 0}
							requirements={[{ name: "Email", completed: false }]}
							onPress={() =>
								console.log(`Pressed loan ${loan.id}`)
							}
						/>
					</View>
				))}
				<View style={{ height: 8 }} />

				
				<CustomButton
					text="Nuevo préstamo"
					onPress={() => router.push("/create_loan")}
				/>
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "flex-start",
	},
	container: {
		paddingHorizontal: 20,
		backgroundColor: "#8E66FF",
	},
	searchSection: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#ccc",
		borderWidth: 1,
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
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	title: {
		color: "black",

		fontSize: 20,
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
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 50,
		backgroundColor: "white",
		height: 40,
		width: 40,
		
		padding: 10,
	},
});

export default Explore;
