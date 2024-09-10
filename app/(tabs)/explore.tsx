import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

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