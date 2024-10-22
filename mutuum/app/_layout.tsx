import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
			<Stack.Screen name="(profile)" options={{ headerShown: false }} />
			<Stack.Screen name="[lending_post_id]" options={{ headerShown: false }} />

			<Stack.Screen
		  name="create_loan"
		  options={{
			title: "Nuevo préstamo",
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
  
  export default RootLayout;