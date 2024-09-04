import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HomeRectangle from '../../components/HomeRectangle'
import HomeBubble from '../../components/HomeBubble'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  return (
    <View style={styles.container}>
      
      <HomeRectangle coin='ETH' balance='294.1' ars='239824'  ></HomeRectangle>
      <HomeBubble prestamo1='345345' prestamo2='345345' prestamo3='345345'/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
    }
})