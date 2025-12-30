import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTransactions } from '../context/TransactionsContext';
import BrandHeader from '../components/BrandHeader';

const formatDateInput = (value) => {
  const cleaned = value.replace(/[^0-9/]/g, '');
  if (cleaned.length === 2 || cleaned.length === 5) {
    return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  }
  return cleaned;
};

export default function NewEntryScreen() {
  const navigation = useNavigation();
  const { addTransaction } = useTransactions();
  const [type, setType] = useState('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const isValid = useMemo(
    () => description.trim().length > 0 && Number(amount) > 0 && category.trim().length > 0 && date.trim().length > 0,
    [amount, category, date, description]
  );

  const handleSave = () => {
    if (!isValid) {
      Alert.alert('Preencha todos os campos', 'Complete os dados para salvar o registro.');
      return;
    }

    const normalizedDate = date.length === 10 ? date.split('/').reverse().join('-') : date;
    const parsedDate = new Date(normalizedDate);
    if (Number.isNaN(parsedDate.getTime())) {
      Alert.alert('Data inválida', 'Use o formato DD/MM/AAAA.');
      return;
    }

    addTransaction({
      type,
      description: description.trim(),
      category: category.trim(),
      amount: Number(amount),
      date: normalizedDate,
    });

    setDescription('');
    setAmount('');
    setDate('');
    setCategory('');
    Alert.alert('Salvo!', 'Registro adicionado com sucesso.');
    navigation.navigate('Historico');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <BrandHeader onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Novo Registro</Text>

      <View style={styles.switcher}>
        <TouchableOpacity
          style={[styles.switchBtn, type === 'income' && styles.switchBtnActive]}
          onPress={() => setType('income')}
        >
          <Text style={[styles.switchText, type === 'income' && styles.switchTextActive]}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchBtn, type === 'expense' && styles.switchBtnActive]}
          onPress={() => setType('expense')}
        >
          <Text style={[styles.switchText, type === 'expense' && styles.switchTextActive]}>Saída</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Vendas, Ingredientes"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#9e8f80"
        />

        <Text style={styles.label}>Valor (€)</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          value={amount}
          onChangeText={(text) => setAmount(text.replace(',', '.'))}
          keyboardType="decimal-pad"
          placeholderTextColor="#9e8f80"
        />

        <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
        <TextInput
          style={styles.input}
          placeholder="24/04/2024"
          value={date}
          onChangeText={(text) => setDate(formatDateInput(text))}
          keyboardType="numbers-and-punctuation"
          placeholderTextColor="#9e8f80"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Fixas, Custo, Receitas"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor="#9e8f80"
        />

        <TouchableOpacity style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]} onPress={handleSave} disabled={!isValid}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9eec9',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c241c',
    textAlign: 'center',
    marginBottom: 10,
  },
  switcher: {
    flexDirection: 'row',
    backgroundColor: '#f1d88a',
    borderRadius: 14,
    padding: 6,
    gap: 6,
    marginBottom: 14,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  switchBtnActive: {
    backgroundColor: '#f6c645',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  switchText: {
    fontWeight: '700',
    color: '#6b5c4e',
  },
  switchTextActive: {
    color: '#2c241c',
  },
  formCard: {
    backgroundColor: '#fff7e5',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b5c4e',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#f1d88a',
    color: '#2c241c',
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: '#f6c645',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveText: {
    fontWeight: '800',
    color: '#2c241c',
    fontSize: 16,
  },
});
