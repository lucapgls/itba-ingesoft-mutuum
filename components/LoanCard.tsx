import React, { useRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
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
  term: string | number;
  requirements: { name: string; completed: boolean }[];
  onPress: () => void; // Function to handle press events
}

const LoanCard: React.FC<LoanCardProps> = ({ color, name, currency, amount, interest, maxCuotas, term, requirements, onPress }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const calculateTotalAmount = (amount: number, interest: number, term: number) => {
    const totalInterest = amount * interest * term;
    return amount + totalInterest;
  }

  const calculateMontlyAmount = (amount: number, interest: number, term: number) => {
    return calculateTotalAmount(amount, interest, term) / term;
  }

  const montlyAmount = calculateMontlyAmount(Number(amount), Number(interest), Number(term));
  const totalAmount = calculateTotalAmount(Number(amount), Number(interest), Number(term));

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
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <GestureHandlerRootView style={styles.sheetContainer}>
                <BottomSheet
                  ref={bottomSheetRef}
                  index={0}
                  snapPoints={snapPoints}
                  backgroundStyle={styles.bottomSheetBackground}
                  enablePanDownToClose={true}
                  onClose={closeBottomSheet}
                >
                  <TouchableWithoutFeedback>
                    <View style={styles.sheetContent}>
                      <View style={styles.infoSection}>
                        <Text style={styles.infoText}>Plazo: {term} meses</Text>
                        <Text style={styles.infoText}>Intereses: {interest}%</Text>
                      </View>
                      <View style={styles.divider} />

                      <View style={styles.requirementsSection}>
                        <Text style={styles.sectionTitle}>Requisitos</Text>
                        {requirements.map((requirement, index) => (
                          <View key={index} style={styles.requirementRow}>
                            <Text style={styles.infoText}>{requirement.name}</Text>
                            <Text style={styles.infoText}>{requirement.completed ? '✅' : '❌'}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={styles.divider} />

                      <View style={styles.financialDetails}>
                        <Text style={styles.infoText}>Monto por mes: {currency} {montlyAmount}</Text>
                        <Text style={styles.infoText}>Monto total: {currency} {totalAmount}</Text>
                      </View>

                      {/* Botón para cerrar el BottomSheet */}
                      <TouchableOpacity style={styles.button} onPress={closeBottomSheet}>
                        <Text style={styles.buttonText}>Tomar</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </BottomSheet>
              </GestureHandlerRootView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    fontSize: 16,
    color: 'gray',
  },
  bottomSheetBackground: {
    backgroundColor: '#f0f0f0',
  },
  sheetContent: {
    padding: 16,
    marginStart: 16,
    marginEnd: 16,
    flex: 1,
  },
  infoSection: {
    marginBottom: 16,
  },
  requirementsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  financialDetails: {
    marginBottom: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
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
  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default LoanCard;