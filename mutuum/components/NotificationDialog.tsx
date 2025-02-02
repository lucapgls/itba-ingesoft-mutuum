import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import theme from '@theme/theme';


interface NotificationDialogProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.message}>Solicitud Enviada</Text>
          <View style={{ height: 12 }} />
            <Text style={styles.message2}>Te notificaremos cuando el prestamista acepte tu solicitud</Text>
            <View style={{ height: 18 }} />
          <TouchableOpacity  onPress={onClose}  >
            
            <Text style={{color: theme.colors.primary, fontSize: 18}}>Aceptar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
   
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  message2: {
    
    fontSize: 14,
    textAlign: 'center',
  },
    button: {
        color: theme.colors.primary,
		fontSize: 18,
		
    },
});

export default NotificationDialog;