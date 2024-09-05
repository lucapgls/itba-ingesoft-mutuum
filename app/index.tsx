
import { Text, View, StyleSheet } from "react-native";
import { Link, router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import SigninRectangle from "../components/SigninRectangle";

export default function App() {
  return (

      <Redirect href={'/sign-up'}/>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    color: 'white', // Replace with your desired primary color
    fontSize: 40, // Tailwind's text-5xl is approximately 40px
    fontWeight: '600',
  },
  mutuum: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  rectangle: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8E66FF',
  },
  text: {
    marginTop: 80,
    color: 'black',
    fontSize: 20,
    left: 50,
  },
});