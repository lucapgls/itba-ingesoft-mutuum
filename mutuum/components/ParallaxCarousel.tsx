import * as React from "react";
import { Dimensions, Text, View, StyleSheet, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "@theme/theme";

const data = Array.from({ length: 10 }).map((_, index) => index);
export const list = [
	{
		id: "1",
		title: "Segun expertos, las personas que prestan\nen mutuum son confiables y seguras",
		color: theme.colors.primary,
		img: require("@assets/images/thumbnail.png"),
	},
	{
		id: "2",
		title: "Sabías que con mutuum podes\nprestar y pedir prestamos cuando quieras?",
		color: theme.colors.primary,
		img: require("@assets/images/thumbnail.png"),
	},
];
const { width: screenWidth } = Dimensions.get("window");
const horizontalPadding = 20;
const carouselWidth = screenWidth - 2 * horizontalPadding;

function ParallaxCarousel() {
	const ref = React.useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<View style={styles.carouselContainer}>
					<Carousel
						style={styles.carousel}
						ref={ref}
						width={carouselWidth}
						height={100}
						autoPlay
						autoPlayInterval={6500}
						data={list}
						onProgressChange={progress}
						renderItem={({ item }) => (
							<View
								style={{
									flex: 1,
									backgroundColor: "#FFF",
									justifyContent: "center",
								}}
							>
								{/* <Image style={styles.img} source={item.img} /> */}
								<Text style={styles.carouselText}>
									{item.title}
								</Text>
							</View>
						)}
					/>

					<Pagination.Basic
						progress={progress}
						data={list}
						dotStyle={{
							backgroundColor: "rgba(0,0,0,0.2)",
							borderRadius: 50,
						}}
						containerStyle={styles.paginationContainer}
						size={8}
                        activeDotStyle={{
                            backgroundColor: "rgba(0,0,0,0.7)",
                            borderRadius: 50,
                        }}
					/>
				</View>
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	carouselContainer: {
		position: "relative",
		alignItems: "center", // Center the carousel horizontally
		
	},
	carouselItem: {
		flex: 1,
		borderWidth: 1,
		justifyContent: "center",
	},
	carouselText: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "500",
	},
	paginationContainer: {
		position: "absolute",
		bottom: 10, // Adjust this value to position the pagination dots as needed
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
	},
	carousel: {
		borderRadius: 20,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		// Elevation for Android
		elevation: 4,
	},
	img: {
		height: "100%",
		width: "100%",
	},
});

export default ParallaxCarousel;
