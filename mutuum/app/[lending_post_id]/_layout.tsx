import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Redirect, Stack, router } from "expo-router";
import theme from "@theme/theme";
import { Ionicons } from "@expo/vector-icons";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="page"
					options={{
						title: "Prestamo",
						headerStyle: {
						  backgroundColor: theme.colors.background,
						},
						headerShadowVisible: false,
						headerTintColor: theme.colors.textBlack,
						headerLeft: () => (
						  <View style={styles.buttonContainer}>
							<TouchableOpacity onPress={router.back} style={styles.button}>
							  <Ionicons
								name="arrow-back"
								size={24}
								color={theme.colors.textBlack}
			
							  />
							</TouchableOpacity>
						  </View>
						),
					  }}
				/>
				
			</Stack>
		</>
	);
};


const styles = StyleSheet.create({
	buttonContainer: {
	  justifyContent: 'center', // Center content vertically
	  alignItems: 'center', // Center content horizontally
	  height: '100%', // Ensure it takes the full height of the parent
	  paddingRight: 15,
	},
	button: {
	  borderRadius: 10,
	  backgroundColor: "white",
	  height: 40,
	  width: 40,
	  justifyContent: 'center', // Center content vertically
	  alignItems: 'center', // Center content horizontally
	  
	},
  });
export default AuthLayout;
