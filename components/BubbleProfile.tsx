import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const BubbleProfile = ({DNI, faceID, phoneNumber}: {DNI:string, faceID:string, phoneNumber:string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.text}>DNI: {DNI}</Text>
        <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
        <Text style={styles.text}>Face ID: {faceID}</Text>
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
        fontSize: 20,
        color: 'black',
        marginTop: 20,
        left: 20,
    },
})