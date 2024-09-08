import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Explore = () => {
  return (
    
    <View style={styles.safeArea}>
      <Text>Explore</Text>
    </View>
  )
}


const styles = StyleSheet.create({
	safeArea: {
		flex: 1,

		backgroundColor: "white",
		justifyContent: "flex-start",
	},
});

export default Explore