import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '@theme/theme';

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  outlined?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, text, outlined = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, outlined && styles.outlinedButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, outlined && styles.outlinedText]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary, 
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    alignItems: 'center',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: theme.colors.primary, 
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  outlinedText: {
    color: theme.colors.primary, 
  },
});

export default CustomButton;