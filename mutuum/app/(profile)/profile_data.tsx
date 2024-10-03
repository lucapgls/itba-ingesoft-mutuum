import {
	Text,
	View,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	FlatList,
	Image,
} from "react-native";
import { Link, router, Redirect } from "expo-router";
import theme from "@theme/theme";
import CustomButton from "@components/CustomButton";

const ProfileData = () => {
	const profileInfo = [
		{ title: "Nombre", value: "Nombre" },
		{ title: "Email", value: "miusuario@example.com" },
		{ title: "DNI", value: "12345678" },
		{ title: "Teléfono", value: "+54123456789" },
		{ title: "Contraseña", value: "********" },
	];

	const renderItem = ({
		item,
	}: {
		item: { title: string; value: string };
	}) => (
		<View style={styles.itemContainer}>
			<Text style={styles.itemTitle}>{item.title}</Text>

			<Text style={styles.itemValue}>{item.value}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={{ height: 10 }} />
			<View style={{ alignItems: "center" }}>
				<Image
					source={{
						uri: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=",
					}}
					style={styles.circle}
				/>
			</View>
			<View style={{ height: 20 }} />
			<FlatList
				data={profileInfo}
				renderItem={renderItem}
				keyExtractor={(item) => item.title}
				contentContainerStyle={styles.listContainer}
			/>
			<CustomButton
				text="Editar"
				onPress={() => router.push("/edit_profile")}
			/>
			<View style={{ height: 20 }} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: theme.colors.background,
		justifyContent: "center",
	},
	listContainer: {
		paddingBottom: 20,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.borderGray,
	},
	itemTitle: {
		fontSize: 16,
		color: theme.colors.textBlack,
		fontWeight: "500",
	},
	itemValue: {
		fontSize: 16,
		color: theme.colors.textBlack,
	},
	button: {
		marginTop: 20,
		padding: 15,
		backgroundColor: theme.colors.primary,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	circle: {
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ProfileData;
