import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#8E66FF', // Replace with your desired primary color
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    alignItems: 'center',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#8E66FF',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outlinedText: {
    color: '#8E66FF',
  },
});

export default CustomButton;