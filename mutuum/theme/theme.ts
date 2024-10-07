// theme/theme.js
import colors from './colors';

const theme = {
  colors,
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fontSizes: {
    small: 14,
    medium: 18,
    large: 22,
  },
  shadowAndroid: {
   // Elevation for Android
		elevation: 4,
  },
  shadowIOS: {
   	// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
  }
  // Add more theme-related properties like border-radius, shadow, etc.
};

export default theme;
