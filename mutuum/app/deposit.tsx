import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/theme';
import { router, Stack } from 'expo-router';

const DepositScreen: React.FC = () => {
    // TODO: api call
  const walletAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"; // Example wallet address
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    Alert.alert("Copiado", "Dirección copiada al portapapeles");
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Depositar USDC</Text>
          <View style={{ width: 24 }}>
            <Text> </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.walletContainer}>
            <Text style={styles.label}>Dirección de la billetera:</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.address} numberOfLines={1} ellipsizeMode="middle">
                {walletAddress}
              </Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Ionicons name="copy-outline" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Instrucciones:</Text>
            <Text style={styles.infoText}>
              1. Copia la dirección de la billetera{'\n'}
              2. Envía USDC desde tu billetera{'\n'}
              3. La transacción puede tomar unos minutos{'\n'}
              4. Los fondos aparecerán en tu cuenta
            </Text>
          </View>

          <View style={styles.warningContainer}>
            <Ionicons name="warning-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.warningText}>
              Solo envía USDC. Otros tokens pueden perderse permanentemente.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60, // Adjust this value based on your needs
    paddingBottom: 20,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  walletContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
    fontFamily: 'monospace',
  },
  infoContainer: {
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  warningText: {
    flex: 1,
    marginLeft: 10,
    color: theme.colors.primary,
    fontSize: 14,
  },
});

export default DepositScreen; 