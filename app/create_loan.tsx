import React, { useEffect, useState } from 'react';
import { supabase } from './(auth)/SupabaseConfig';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomTextInput from "../components/CustomTextInput";
import { GestureResponderEvent } from 'react-native';

import { getCurrentUserEmail, getCurrentUserId } from '../models/User';
import { addLoan } from '../store/LoanStore';
import { router } from 'expo-router';
// Function to create a new lending post
export const createLendingPost = async (
    lenderId: string,  // ID of the lender (from auth.users.id)
    initialAmount: number,  // Total amount for the lending post
    interest: number,  // Interest rate for the loan
    deadline: string  // Deadline for loan repayment (formatted as string)
  ) => {
    // Insert into the lending_post table
    const { data, error } = await supabase
      .from('lending_post')
      .insert([
        {
          lender_id: lenderId,  // Lender's ID from auth.users.id
          initial_amount: initialAmount,  // Total loan amount
          available_amount: initialAmount,  // Initially available amount is the total amount
          interest: interest,  // Interest rate for the loan
          dead_line: deadline,  // Deadline for repayment (must be a valid date string)
        },
      ]);
  
    if (error) {
      console.error('Error creating lending post:', error.message);
      throw error;
    }
  
    return data;
  };

const CreateLoan: React.FC = () => {
    const [coinType, setCoinType] = useState('');
    const [amount, setAmount] = useState('');
    const [quotas, setQuotas] = useState('');
    const [interests, setInterests] = useState('');
    const [requirements, setRequirements] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        } else {

        }
      };
  
      fetchUser();
    }, []);
  
    const handleSubmit = async () => {
      // if (!userId) {
      //   Alert.alert('Error', 'User not authenticated!');
      //   return;
      // }
 
      const newLoan = {
        id: Date.now().toString(),  // Usar un ID único
        coinType,
        amount: parseFloat(amount),
        interests: parseFloat(interests),
        requirements,
      };

      addLoan(newLoan);
      router.push('/explore');
      // temp
        Alert.alert('Success', 'Lending post created successfully!');
      // try {
      //   // await createLendingPost(userId, parseFloat(amount), parseFloat(interests), requirements);
      //   // push prestamo -> /explore
      //   Alert.alert('Success', 'Lending post created successfully!');
      // } catch (error) {
      //   Alert.alert('Error', 'Failed to create lending post.');
      // }
    };
    
    return (
        <View style={styles.container}>
      <View style={styles.inputGroup}>
      </View>

      <CustomTextInput
					placeholder="0"
					value={amount}
					onChangeText={setAmount}
					title="Valor (ETH)"
          keyboardType='numeric'
				/>

      <CustomTextInput
					placeholder="00%"
					value={interests}
					onChangeText={setInterests}
					title="Interes: (%)"
          keyboardType='numeric'
          maxLength={2}
				/>

      <CustomTextInput
					placeholder="Escribe tus requerimientos"
					value={requirements}
					onChangeText={setRequirements}
					title="Requerimientos:"
          
				/>
      
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Crear prestamo</Text>
      </TouchableOpacity>
    </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 8,
      fontSize: 16,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    button: {
      backgroundColor: '#8E66FF',
      color: 'white',
      marginTop: 16,
      padding: 16,
      borderRadius: 4,
      alignItems: 'center',
    },
    }
  );

export default CreateLoan;