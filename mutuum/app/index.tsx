
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { Link, router, Redirect } from "expo-router";
import theme from '@theme/theme';

export default function App() {
  return (

      <Redirect href={'/sign-in'}/>

  );
}

const styles = StyleSheet.create({

});