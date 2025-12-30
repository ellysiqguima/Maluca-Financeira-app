import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProgressRing from '../components/ProgressRing';
import StatCard from '../components/StatCard';
import { useTransactions } from '../context/TransactionsContext';
import BrandHeader from '../components/BrandHeader';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(value);

export default function HomeScreen() {
  const { totals, transactions } = useTransactions();
  const navigation = useNavigation();

  const recentIncome = transactions.filter((t) => t.type === 'income');
  const recentExpense = transactions.filter((t) => t.type === 'expense');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.header}>
        <BrandHeader />
        <Text style={styles.greeting}>Bem-vinda, K!</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Entradas</Text>
          <Text style={styles.value}>{formatCurrency(totals.income)}</Text>
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Saídas</Text>
          <Text style={styles.value}>{formatCurrency(totals.expense)}</Text>
        </View>
        <View style={[styles.sectionRow, styles.borderless]}>
          <Text style={styles.label}>Saldo</Text>
          <Text style={[styles.value, { color: '#1f8a4d' }]}>{formatCurrency(totals.balance)}</Text>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Registrar')}>
          <Ionicons name="add" size={20} color="#2c241c" />
          <Text style={styles.primaryButtonText}>Novo Registro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ringWrapper}>
        <ProgressRing
          progress={totals.progress}
          label="Gasto do mês"
          trackColor="#f1d88a"
          progressColor="#7b5336"
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          label="Entradas recentes"
          value={formatCurrency(recentIncome.slice(0, 1).reduce((a, b) => a + b.amount, 0) || 0)}
          background="#fff7e5"
        />
        <StatCard
          label="Saídas recentes"
          value={formatCurrency(recentExpense.slice(0, 1).reduce((a, b) => a + b.amount, 0) || 0)}
          background="#ffe5d0"
          accent="#c0392b"
        />
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
  header: {
    marginTop: 18,
    marginBottom: 18,
    gap: 8,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c241c',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff7e5',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    gap: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e7d4a7',
  },
  borderless: {
    borderBottomWidth: 0,
  },
  label: {
    color: '#6b5c4e',
    fontWeight: '600',
  },
  value: {
    color: '#2c241c',
    fontWeight: '800',
    fontSize: 16,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: '#f6c645',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontWeight: '800',
    color: '#2c241c',
    fontSize: 16,
  },
  ringWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
});
