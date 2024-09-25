import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


const Header_Max_Height = 280;
const Header_Min_Height = 260;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;


const HomeRectangle = ({  coin, balance, ars }: { coin: string, balance: string, ars: string }) => {

    


  return (
    <Animated.View style={styles.rectangle}>
        <View >
            <Text style={styles.text}>Tu dinero</Text>
            <Text style={styles.BoldText}>{coin} {balance}</Text>
            <Text style={styles.text}>~ARS$ {ars}</Text>
            <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} >
                    <Ionicons name="arrow-up" size={16} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Ionicons name="arrow-down" size={16} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Depositar</Text>
                </TouchableOpacity> 
            </View>
        </View>
    </Animated.View>
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
        width: 130,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        marginTop: 25,
        flexDirection: 'row',
        gap: 20,
    },
    buttonText: {
        
        color: 'black',
        textAlign: 'center',
        fontSize: 18, 
    },    icon: {
        marginRight: 5,
        color: 'black',
    },
})