import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(value);

export default function TransactionCard({ item }) {
  const isIncome = item.type === 'income';
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Ionicons name={isIncome ? 'arrow-down-circle' : 'arrow-up-circle'} size={22} color={isIncome ? '#1f8a4d' : '#c0392b'} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.meta}>{item.category}</Text>
          <Text style={styles.meta}>{new Date(item.date).toLocaleDateString('pt-PT')}</Text>
        </View>
        <Text style={[styles.amount, { color: isIncome ? '#1f8a4d' : '#c0392b' }]}>
          {isIncome ? '' : '-'}
          {formatCurrency(item.amount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff7e5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    backgroundColor: '#f1d88a',
    borderRadius: 18,
    padding: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c241c',
  },
  meta: {
    fontSize: 12,
    color: '#6b5c4e',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
