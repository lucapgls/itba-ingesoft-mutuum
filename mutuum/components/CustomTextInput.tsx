import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Text, KeyboardTypeOptions } from 'react-native';
import theme from '@theme/theme';

interface CustomTextInputProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    title: string;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    title,
    keyboardType,
    maxLength,
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
        borderColor: theme.colors.borderGray,
        borderRadius: 12,
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
    focusedBorder: {
        borderColor: theme.colors.primary,
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