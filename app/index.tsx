import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Mutuum
        </Text>
        <View style={{ height: 30 }} />
        <CustomButton onPress={() => router.push('/home')} text="Continue" />
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    color: '#8E66FF', // Replace with your desired primary color
    fontSize: 40, // Tailwind's text-5xl is approximately 40px
    
    fontWeight: '600',
  },
});