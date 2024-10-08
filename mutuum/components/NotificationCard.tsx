import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/theme';

interface NotificationCardProps {
  title: string;
  description: string;
  date: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, description, date, icon }) => {
  return (
    <View style={[styles.card, theme.shadowAndroid, theme.shadowIOS]}>
      <Ionicons name={icon} size={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <View style={ styles.titleContainer } >
        <Text style={styles.title}>{title}</Text>
        <Text style={{color: theme.colors.textGray, fontSize: 14}}>{date}</Text>
        </View>
        <View style={{ height: 2 }} />
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',

  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: theme.colors.textGray,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NotificationCard;