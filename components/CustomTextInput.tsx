import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    title: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    title,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
        <Text style={styles.text}>{title}</Text>
        <View style={[styles.border, isFocused && styles.focusedBorder]}>
            
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={styles.input}
                {...props}
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    border: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 12,
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
    focusedBorder: {
        borderColor: '#8E66FF',
    },
    input: {
        height: 40,
        fontSize: 16,
        paddingStart: 14,

    },text: {
		color: "black",
		fontSize: 15,
		marginBottom: 5,
	},
});

export default CustomTextInput;