import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import NotificationCard from "@components/NotificationCard";
import { Ionicons } from '@expo/vector-icons';
import theme from "@theme/theme"; // Assuming you have a theme file

const notifications: { title: string; description: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    {
		title: "Recordatorio",
		description:
			"En 10 días tenes que abonar la cuota numero 3 del prestamo de Nombre.",
		icon: "alarm",
	},
    {
		title: "Solicitud aceptada",
		description:
			"Nombre aceptó tu solicitud de prestamo. Ya podes comenzar a usar el dinero.",
		icon: "checkmark-circle",
	},
	{
		title: "Solicitud enviada",
		description:
			"Solicitaste el prestamo de Nombre. Te notificaremos cuando el prestamista acepte tu solicitud.",
		icon: "mail",
	},
	
	
	// Add more notifications as needed
];

const NotificationScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{notifications.map((notification, index) => (
					<NotificationCard
						key={index}
						title={notification.title}
						description={notification.description}
						icon={notification.icon}
					/>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: theme.colors.background,

		width: "100%",
		alignItems: "center",
		height: "100%",
	},
	scrollContainer: {
		width: "100%",
		padding: 20,
		alignItems: "center",
		height: "100%",
	},
});

export default NotificationScreen;
