import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const BubbleProfile = ({prestamo1, prestamo2, prestamo3}: {prestamo1:string, prestamo2:string, prestamo3:string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={{fontWeight: 'bold', padding: 8, paddingStart: 20, paddingTop:16,
        fontSize: 18, color: 'black'
        }}>My Loans</Text>
        <Text style={styles.text}>Préstamo: {prestamo1}</Text>
        <Text style={styles.text}>Préstamo: {prestamo2}</Text>
        <Text style={styles.text}>Préstamo: {prestamo3}</Text>
      </View>
    </View>
  )
}

export default BubbleProfile

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
    rectangle: {
        marginTop: 20,
        width: '90%',
        height: 300,
        backgroundColor: '#f1f1f1',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 20,
    },
    text: {
        fontSize: 16,
        color: 'black',
        padding: 8,
        paddingStart: 20,
    },
})