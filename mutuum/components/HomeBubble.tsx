import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import UserLoanSmallCard from './UserLoanSmallCard'
import { Loan } from '../models/Loan'

const BubbleProfile = ({ loans }: {loans: Loan[]}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>Préstamos recientes</Text>
        <View style={{ height: 6 }} />
        {loans.map((loan) => (
          <UserLoanSmallCard
            key={loan.userId}
            profilePicture='https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=' // todo
            name={"test"} // todo
            role={loan.role}
            amount={loan.amount}
            coinType={loan.coinType}
            interests={loan.interests}
          />
        ))}
      </View>
    </View>
  )
}

export default BubbleProfile;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
    rectangle: {
        
        padding: 20,
        width: '100%',
        backgroundColor: '#f1f1f1',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 20,
    },
    text: {
        fontSize: 16,
        color: 'black',
        
    },
    title: {
        fontSize: 18,
        color: 'black',
        
        
    }
})