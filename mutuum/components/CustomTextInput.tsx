import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Text, KeyboardTypeOptions, TouchableOpacity } from 'react-native';
import theme from '@theme/theme';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

interface CustomTextInputProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    title: string;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    password?: boolean;
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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    return (
      <View>
        <Text style={styles.text}>{title}</Text>
        <View style={[styles.border, isFocused && styles.focusedBorder]}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.input}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.iconGray}
              />
            </TouchableOpacity>
          )}
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
      flexDirection: 'row',
      alignItems: 'center',
    },
    focusedBorder: {
      borderColor: theme.colors.primary,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      paddingStart: 14,
    },
    iconContainer: {
      padding: 10,
      marginEnd: 5,
    },
    text: {
      color: 'black',
      fontSize: 15,
        marginBottom: 5,
    },
  });

export default CustomTextInput;