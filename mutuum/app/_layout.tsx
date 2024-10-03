import { View, Text, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";
import theme from '@theme/theme';

import { Ionicons } from "@expo/vector-icons";

const RootLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="(tabs)"
				options={{ headerShown: false, headerTitle: "Inicio" }}
			/>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen
				name="create_loan"
				options={{
					title: "Nuevo préstamo",
					headerStyle: {
						backgroundColor: theme.colors.primary, // Purple background
					},
					headerTintColor: theme.colors.textWhite,
					headerLeft: () => (
						<TouchableOpacity onPress={router.back} style={{paddingRight: 15}}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="white"
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
};

export default RootLayout;
