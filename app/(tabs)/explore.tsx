import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'


const Explore = () => {
  return ( 
    <View style={styles.container}>
      <Text>Explore</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
        <Text style={styles.buttonText}>Crear prestamo</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: "white",
    justifyContent: "flex-start",
  },

  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },

  rectangle: {
    he
  },

  button: {
    backgroundColor: "#8E66FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 200,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  }

});

export default Explore