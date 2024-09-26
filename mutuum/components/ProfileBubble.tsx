import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import UserLoanSmallCard from "./UserLoanSmallCard";
import { Loan } from "../models/Loan";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface CustomProfileBubbleProps {
	title: string;
	icon: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
}

const ProfileBubble: React.FC<CustomProfileBubbleProps> = ({
	title,
	icon,
	onPress,
}) => {
	return (
        <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.rectangle}>
            <View style={styles.header}>
              <View style={styles.iconAndTitle}>
                <Ionicons
                  name={icon}
                  size={18}
                  color="black"
                  style={styles.icon}
                />
                <Text style={styles.title}>{title}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="black"
                style={styles.icon}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
	);
};

export default ProfileBubble;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
	},
	rectangle: {
		padding: 20,
		width: "100%",
		backgroundColor: "#FFF",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,
		 // Shadow for iOS
		 shadowColor: '#000',
		 shadowOffset: { width: 0, height: 3 },
		 shadowOpacity: 0.10,
		 shadowRadius: 3.84,
		 // Elevation for Android
		 elevation: 5,
	},
    iconAndTitle: {
        flexDirection: 'row',
        alignItems: 'center',
      },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
        marginLeft: 10,
	},

	buttonText: {
		color: "#8E66FF",
		fontSize: 14,
	},
	icon: {
		marginRight: 5,
	},
});
