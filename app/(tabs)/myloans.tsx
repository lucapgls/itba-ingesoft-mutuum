import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MyLoans = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Loans</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Mis Préstamos</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyLoans

const styles=StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
    },
    button: {
      backgroundColor: '#8E66FF',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      width: 200,
    },

})