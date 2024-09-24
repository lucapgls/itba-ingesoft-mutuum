import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BubbleProfile from '../../components/BubbleProfile'

const Profile = ({ dni, email, phoneNumber}: {dni:string, email:string, phoneNumber:string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.text}>username</Text>
        <View style={styles.circle}/>
      </View>
      <BubbleProfile DNI={dni} email={email} phoneNumber={phoneNumber}/> 
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
    },
    circle: {
        top: 10,
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    rectangle: {
      backgroundColor: '#8E66FF',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 250,
    },
})