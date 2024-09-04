import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth, firestore } from './firebaseconfig'; // Import the initialized auth and firestore instances
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Modular import
import { collection, addDoc } from 'firebase/firestore'; // Modular import

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(collection(firestore, 'Users'), { email: email });
            Alert.alert('Success', 'User signed up successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUp;
