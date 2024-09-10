import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../(auth)/SupabaseConfig';
import { router } from 'expo-router';
import LoanCard from '../../components/LoanCard';
import CustomButton from '../../components/CustomButton';
import { getLoans } from '../../store/LoanStore';


// Fetch all lending posts from the lending_post table
export const fetchLendingPosts = async () => {
  const { data, error } = await supabase
    .from('lending_post')  // Select from the lending_post table
    .select('*');  // Select all columns

  if (error) {
    console.error('Error fetching lending posts:', error.message);
    throw error;
  }

  return data;
};

const Explore = () => {
  const [loans, setLoans] = useState<any[]>([]);  // Estado para almacenar los préstamos

/*  useEffect(() => {
    const loadLendingPosts = async () => {
      try {
        const data = await fetchLendingPosts();
        setLoans(data);  // Almacena los préstamos en el estado
      } catch (error) {
        console.error('Error loading loans:', error);
      }
    };
    loadLendingPosts();  // Llama a la función para cargar los préstamos
  }, []);
  */

  useEffect(() => {
    const loansArray = getLoans();  // Obtener los préstamos del array
    setLoans(loansArray);
    console.log(loansArray);
  }, []);

  return (
    <View style={styles.safeArea}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>Explorar</Text>
          <TouchableOpacity style={styles.button}
          onPress={() => router.push('/create_loan')}
          >
          <Text style={styles.buttonText}>Crear préstamo</Text>
        </TouchableOpacity>
      </View>

    <ScrollView contentContainerStyle={styles.container}>

  
      {loans.map((loan) => (
        <View style={styles.card}>
        <LoanCard
          key={loan.id}  
          color={loan.color ?? '#8E66FF'}  
          name={"Felidown" ?? 'Loan'}
          currency={loan.currency ?? 'USD'}
          amount={loan.amount ?? 0}
          interest={loan.interest ?? 0}
          term={loan.term ?? 0}
          // maxCuotas={loan.maxCuotas ?? 0}
          requirements={[{ name: "Email", completed: false }]} 
          onPress={() => console.log(`Pressed loan ${loan.id}`)}  
        />
        </View>
      ))}
    
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  card: {
    flex: 1,
    width: '90%',
  },

  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    paddingTop: 85,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  rectangle: {
    // marginTop: 0,
    // paddingVertical: 8,
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#8E66FF',
  },
  button: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    width: 200,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'light',
  },
});

export default Explore;