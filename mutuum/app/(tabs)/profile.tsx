import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import BubbleProfile from "../../components/BubbleProfileInfo";
import ProfileBubble from "../../components/ProfileBubble";
import { router, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@theme/theme";
import UserStore from "store/UserStore";
import { observer } from "mobx-react-lite";

const Profile = observer(() => {
	useEffect(() => {
		const fetchData = async () => {
			if (UserStore.userId) {
				await UserStore.fetchUserInfo();
			}
		};
		fetchData();
	}, [UserStore.userId]);

	const aux = UserStore.getUserInfo();

	return (
		<LinearGradient
			// Background Linear Gradient
			colors={[theme.colors.primary, "#fff"]}
			style={styles.container}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.rectangle}>
					<View style={{ height: 80 }} />
					<Image
						source={{
							uri: "https://icons.veryicon.com/png/o/miscellaneous/standard/user-274.png",
						}}
						style={styles.circle}
					/>
					<View style={{ height: 20 }} />
					<Text style={styles.text}>{aux.displayName}</Text>
				</View>
				<View style={{ height: 20 }} />

				<View style={styles.options}>
					<ProfileBubble
						title="Mi perfil"
						icon="person"
						onPress={() => router.push("/public_profile")}
					/>
					<View style={{ height: 15 }} />
					<ProfileBubble
						title="Mis datos"
						icon="reader"
						onPress={() => router.push("/profile_data")}
					/>

					<View style={{ height: 15 }} />
					<ProfileBubble
						title="Notificaciones"
						icon="notifications"
						onPress={() => router.push("/notifications")}
					/>
					<View style={{ height: 15 }} />
					<ProfileBubble
						title="Invitar amigos"
						icon="people"
						onPress={() => {}}
					/>
					<View style={{ height: 15 }} />
					<ProfileBubble
						title="Configuración"
						icon="settings"
						onPress={() => {}}
					/>
					<View style={{ height: 15 }} />
					

					<View style={{ height: 30 }} />
					<TouchableOpacity>
						<Link href="/sign-in" asChild replace>
							<TouchableOpacity>
								<Text style={styles.buttonText}>
									Cerrar sesión
								</Text>
							</TouchableOpacity>
						</Link>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</LinearGradient>
	);
});

export default Profile;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: "100%",
		width: "100%",
	},
	text: {
		color: "white",
		textAlign: "center",
		fontSize: 25,
		fontWeight: "500",
	},
	circle: {
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#dbdbdb"
	},
	rectangle: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	options: {
		padding: 20,
		justifyContent: "center",
	},
	buttonText: {
		color: theme.colors.cancel,
		fontSize: 18,
		textAlign: "center",
	},
});
