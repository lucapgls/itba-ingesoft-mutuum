import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Redirect, Stack, router } from "expo-router";
import theme from "@theme/theme";
import { Ionicons } from "@expo/vector-icons";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="profile_data"
					options={{
						title: "Mis datos",
						headerStyle: {
							backgroundColor: theme.colors.background,
						},
						headerTintColor: theme.colors.textBlack,
						headerLeft: () => (
							<TouchableOpacity
								onPress={router.back}
								style={{ paddingRight: 15 }}
							>
								<Ionicons
									name="arrow-back"
									size={24}
									color={theme.colors.textBlack}
								/>
							</TouchableOpacity>
						),
					}}
				/>
				<Stack.Screen
					name="edit_profile"
					options={{
						title: "Editar perfil",
						headerStyle: {
							backgroundColor: theme.colors.background,
						},
						headerTintColor: theme.colors.textBlack,
						headerLeft: () => (
							<TouchableOpacity
								onPress={router.back}
								style={{ paddingRight: 15 }}
							>
								<Ionicons
									name="arrow-back"
									size={24}
									color={theme.colors.textBlack}
								/>
							</TouchableOpacity>
						),
					}}
				/>
			</Stack>
		</>
	);
};

export default AuthLayout;
