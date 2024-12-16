import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { User } from "../models/User"; // Assuming you have a User model
import theme from "@theme/theme";

// FIX
const RecentUsersBubble = ({ Users }: { Users: { [key: string]: any } }) => {
    console.log('Users:', Users);

    return (
        <View style={styles.container}>
            <View style={[styles.rectangle, theme.shadowAndroid, theme.shadowIOS]}>
                <View style={styles.header}>
                    <Text style={styles.title}>Conexiones recientes</Text>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>Ver más</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 15 }} />
                <View style={styles.UsersContainer}>
                    {Object.values(Users).map((User) => {
                        console.log('User:', User);
                        return (
                            <View key={User.id} style={styles.UserCard}>
                                <Image
                                    source={{
                                        uri: "https://icons.veryicon.com/png/o/miscellaneous/standard/user-274.png",
                                    }}
                                    style={styles.profilePicture}
                                />
                                <Text style={styles.UserName}>{User.display_name}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default RecentUsersBubble;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
	},
	rectangle: {
		padding: 20,
		width: "100%",
		backgroundColor: "white",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,

		
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontSize: 18,
		fontWeight: "500",
	},
	UsersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		width: "100%",
	},
	UserCard: {
		alignItems: "center",
	},
	profilePicture: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#dbdbdb"
	},
	UserName: {
		marginTop: 5,
		fontSize: 14,
		textAlign: "center",
	},
	buttonText: {
		color: theme.colors.primary,
		fontSize: 14,
	},
});
