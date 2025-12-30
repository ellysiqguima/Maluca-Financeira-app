import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTransactions } from '../context/TransactionsContext';
import BrandHeader from '../components/BrandHeader';

export default function ProfileScreen() {
  const { resetData } = useTransactions();

  const handleReset = () => {
    Alert.alert('Resetar registros', 'Deseja voltar aos dados de exemplo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sim', onPress: resetData },
    ]);
  };

  return (
    <View style={styles.container}>
      <BrandHeader />
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.subtitle}>Controle o app e os dados salvos localmente</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="cloud-offline" size={24} color="#7b5336" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Modo offline</Text>
            <Text style={styles.cardText}>Todos os dados estão apenas no seu dispositivo via AsyncStorage.</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="refresh" size={24} color="#7b5336" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Resetar dados</Text>
            <Text style={styles.cardText}>Limpe e recarregue os registros de exemplo.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9eec9',
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c241c',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b5c4e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff7e5',
    padding: 16,
    borderRadius: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '800',
    color: '#2c241c',
    fontSize: 16,
  },
  cardText: {
    color: '#6b5c4e',
    fontWeight: '600',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#f6c645',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '800',
    color: '#2c241c',
  },
}); 
