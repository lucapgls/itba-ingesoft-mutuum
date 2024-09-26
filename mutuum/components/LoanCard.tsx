import React, { useRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from './CustomButton';

const { height: windowHeight } = Dimensions.get('window');

interface LoanCardProps {
  color: string;
  name: string | number;
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
      <Image
                                source={{ uri: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=" }}
                                style={styles.avatar}
                            />
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.currencyRow}>
            
            <Text style={styles.currencyText}>${currency}</Text>
            <Text style={styles.amountText}>{amount}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Interes del</Text>
            <Text style={styles.amountText}>{interest}%</Text>
            {maxCuotas && <Text style={[styles.infoText, { marginLeft: 8 }]}>Max. cuotas: {maxCuotas}</Text>}
          </View>
        </View>
      </TouchableOpacity>

      {/* BottomSheet dentro de un Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
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
					  <Text style={styles.sectionTitle}>Información</Text>
                        <Text style={styles.infoText}>Plazo: {term} meses</Text>
                        <Text style={styles.infoText}>Intereses: {interest}%</Text>
                      </View>
                      <View style={styles.divider} />

                      <View style={styles.requirementsSection}>
                        <Text style={styles.sectionTitle}>Requisitos</Text>
						{requirements.map((requirement, index) => (
                          <View key={index} style={styles.requirementRow}>
                            <Text style={styles.infoText}>{requirement.name}</Text>
                            <Ionicons
                              name={requirement.completed ? 'checkmark' : 'close'}
                              size={22}
                              color="black"
                            />
                          </View>
                        ))}
                      </View>
                      <View style={styles.divider} />

                      <View style={styles.financialDetails}>
					  <Text style={styles.sectionTitle}>Dinero</Text>
                        <Text style={styles.infoText}>Monto por mes: {currency} {montlyAmount}</Text>
                        <Text style={styles.infoText}>Monto total: {currency} {totalAmount}</Text>
                      </View>

                      {/* Botón para cerrar el BottomSheet */}
					  <View style={{ height: 14 }} />
                      <CustomButton
						text='Tomar préstamo'
						onPress={closeBottomSheet}
						
						
									/>
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
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currencyText: {
    
    fontSize: 16,
    color: 'gray',
  },
  amountText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    
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
    bottom: 36,
    height: 56,
    left: 16,
    right: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default LoanCard;