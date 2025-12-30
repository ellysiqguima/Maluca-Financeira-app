import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTransactions } from '../context/TransactionsContext';
import TransactionCard from '../components/TransactionCard';

const formatMonth = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' });
};

export default function HistoryScreen() {
  const { transactions } = useTransactions();
  const navigation = useNavigation();
  const [typeFilter, setTypeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');

  const months = useMemo(() => {
    const unique = new Set();
    transactions.forEach((t) => {
      const monthKey = t.date.slice(0, 7);
      unique.add(monthKey);
    });
    return Array.from(unique).sort((a, b) => (a < b ? 1 : -1));
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (typeFilter === 'all' ? true : t.type === typeFilter))
      .filter((t) => (monthFilter === 'all' ? true : t.date.startsWith(monthFilter)));
  }, [monthFilter, transactions, typeFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={20} color="#2c241c" />
        </TouchableOpacity>
        <Text style={styles.title}>Tela de Histórico</Text>
        <Text style={styles.subtitle}>Acompanhe entradas e saídas</Text>
      </View>

      <View style={styles.filters}>
        <View style={styles.chipsRow}>
          {['all', 'income', 'expense'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, typeFilter === type && styles.chipActive]}
              onPress={() => setTypeFilter(type)}
            >
              <Text style={[styles.chipText, typeFilter === type && styles.chipTextActive]}>
                {type === 'all' ? 'Todos' : type === 'income' ? 'Entrada' : 'Saída'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.chipsRow}>
          <TouchableOpacity
            style={[styles.chip, monthFilter === 'all' && styles.chipActive]}
            onPress={() => setMonthFilter('all')}
          >
            <Text style={[styles.chipText, monthFilter === 'all' && styles.chipTextActive]}>Todos os meses</Text>
          </TouchableOpacity>
          {months.map((month) => (
            <TouchableOpacity
              key={month}
              style={[styles.chip, monthFilter === month && styles.chipActive]}
              onPress={() => setMonthFilter(month)}
            >
              <Text style={[styles.chipText, monthFilter === month && styles.chipTextActive]}>{formatMonth(month)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9eec9',
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  header: {
    marginBottom: 10,
    gap: 6,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f1d88a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c241c',
  },
  subtitle: {
    color: '#6b5c4e',
    fontWeight: '600',
  },
  filters: {
    marginVertical: 12,
    gap: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f1d88a',
  },
  chipActive: {
    backgroundColor: '#f6c645',
  },
  chipText: {
    fontWeight: '700',
    color: '#6b5c4e',
  },
  chipTextActive: {
    color: '#2c241c',
  },
  empty: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#6b5c4e',
    fontWeight: '600',
  },
});
