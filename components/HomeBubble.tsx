import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import UserLoanSmallCard from './UserLoanSmallCard'
import { Loan } from '../models/Loan'

const BubbleProfile = ({ loans }: {loans: Loan[]}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>Últimos Préstamos</Text>
        {loans.map((loan) => (
          <UserLoanSmallCard
            key={loan.userId}
            profilePicture="a" // todo
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
        marginTop: 20,
        paddingVertical: 8,
        width: '90%',
        backgroundColor: '#f1f1f1',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 20,
    },
    text: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        color: 'black',
        padding: 8,
        paddingStart: 20,
        fontWeight: 'medium',
    }
})