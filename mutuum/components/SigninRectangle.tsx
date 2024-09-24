import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const SigninRectangle = () => {
  return (
    <View style={styles.container}>
        <View style={styles.rectangle}>
            <TextInput style={styles.input}/>
        </View>
    </View>
  )
}

export default SigninRectangle

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderColor: '#CBCBCB',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
    },
    input: {
        fontSize: 20,
        color: '#CBCBCB',
        fontWeight: 'bold'
    },
})