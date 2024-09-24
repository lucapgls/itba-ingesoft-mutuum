import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface CustomChipProps {
  text: string;
  enabled: boolean;
  onPress: () => void;
}

const CustomChip: React.FC<CustomChipProps> = ({ text, enabled, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: enabled ? '#8E66FF' : '#c4c4c4' }]}
      onPress={onPress}
    >
      <FontAwesome
        name={enabled ? 'check' : 'times'}
        size={16}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomChip;