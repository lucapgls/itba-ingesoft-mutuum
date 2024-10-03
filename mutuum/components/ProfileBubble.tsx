import { View, Text, StyleSheet, TouchableOpacity, Pressable, Animated } from "react-native";
import React from "react";
import UserLoanSmallCard from "./UserLoanSmallCard";
import { Loan } from "../models/Loan";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import theme from '@theme/theme';

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
	const [backgroundColor] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(backgroundColor, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFF', theme.colors.tabInactive], // From white to grey
  });
	return (
        <View style={styles.container}>
        <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.rectangle, { backgroundColor: animatedBackgroundColor }]}>
          
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
          </Animated.View>
        </Pressable>
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

	
	icon: {
		marginRight: 5,
	},
});
