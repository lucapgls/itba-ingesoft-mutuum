import React, { useRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesome5 } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { height: windowHeight } = Dimensions.get('window');

interface LoanCardProps {
  color: string;
  name: string;
  currency: 'ETH' | 'ARS';
  amount: string | number;
  interest: string | number;
  maxCuotas?: string | number;
  onPress: () => void; // Function to handle press events
}

const LoanCard: React.FC<LoanCardProps> = ({ color, name, currency, amount, interest, maxCuotas, onPress }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity style={styles.card} onPress={openBottomSheet}>
        <View style={[styles.avatar, { backgroundColor: color }]} />
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.currencyRow}>
            <FontAwesome5 name={currency === 'ETH' ? 'ethereum' : 'money-bill-wave'} size={20} color="gray" />
            <Text style={styles.currencyText}>{currency}</Text>
            <Text style={styles.amountText}>{amount}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Intereses: {interest}%</Text>
            {maxCuotas && <Text style={[styles.infoText, { marginLeft: 8 }]}>Max. cuotas: {maxCuotas}</Text>}
          </View>
        </View>
      </TouchableOpacity>

      {/* BottomSheet dentro de un Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <GestureHandlerRootView style={styles.modalContainer}>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetBackground}
          >
            <View style={styles.sheetContent}>
              <View style={styles.requirementsSection}>
                <Text style={styles.sectionTitle}>Requisitos</Text>
              </View>
              <View style={styles.financialDetails}>
                <Text style={styles.infoText}>Monto por mes: {currency} {}</Text>
                <Text style={styles.infoText}>Monto total: {currency} {}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={closeBottomSheet}>
                <Text style={styles.buttonText}>Tomar</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </GestureHandlerRootView>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currencyText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
  },
  amountText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
  },
  bottomSheetBackground: {
    backgroundColor: '#f0f0f0',
  },
  sheetContent: {
    padding: 16,
  },
  requirementsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  financialDetails: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default LoanCard;
