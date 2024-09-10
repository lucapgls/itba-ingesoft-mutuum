import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';

interface GoogleButtonProps {
    onPress: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' }}
                    style={styles.image}
                />
                <Text style={styles.text}>Iniciar sesión con Google</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f2edff',
        borderRadius: 25, // Adjusted for rounded corners
        padding: 10,
        width: '80%',
        height: 45,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
});

export default GoogleButton;