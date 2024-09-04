import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'



const HomeRectangle = ({ coin, balance, ars }: { coin: string, balance: string, ars: string }) => {
  return (
    <View>
        <View style={styles.rectangle}>
            <Text style={styles.text}>Tu dinero</Text>
            <Text style={styles.BoldText}>{coin} {balance}</Text>
            <Text style={styles.text}>ARS$ {ars}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Depositar</Text>
                </TouchableOpacity> 
            </View>
        </View>
    </View>
  )
}

export default HomeRectangle

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    rectangle: {
        backgroundColor: '#8E66FF',
        height: 260,
        justifyContent: 'center', // Centra el contenido verticalmente dentro del rectángulo
        alignItems: 'center', // Centra el contenido horizontalmente dentro del rectángulo
        paddingTop: 40,
    },
    BoldText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    button: {
        
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 8,
        width: 120,
        height: 42,
        justifyContent: 'center',
    },
    buttons: {
        marginTop: 25,
        flexDirection: 'row',
        gap: 20,
    },
    buttonText: {
        
        color: '#8E66FF',
        textAlign: 'center',
        fontSize: 18, 
    },
})