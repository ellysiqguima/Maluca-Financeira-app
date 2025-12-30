import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatCard from '../components/StatCard';
import { useTransactions } from '../context/TransactionsContext';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(value);

export default function ReportsScreen() {
  const { totals } = useTransactions();

  const chartData = useMemo(() => {
    const items = [
      { label: 'Entradas', value: totals.income, color: '#1f8a4d' },
      { label: 'Saídas', value: totals.expense, color: '#c0392b' },
      { label: 'Lucro', value: totals.balance, color: '#d88b1c' },
    ];
    const max = Math.max(...items.map((i) => Math.abs(i.value)), 1);
    return items.map((item) => ({
      ...item,
      height: Math.max(16, (Math.abs(item.value) / max) * 120),
    }));
  }, [totals.balance, totals.expense, totals.income]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo de Relatórios</Text>
      <Text style={styles.subtitle}>Veja como o negócio está indo</Text>

      <View style={styles.cardRow}>
        <StatCard label="Total de Entradas" value={formatCurrency(totals.income)} background="#fff7e5" />
        <StatCard label="Total de Saídas" value={formatCurrency(totals.expense)} background="#ffe5d0" accent="#c0392b" />
      </View>

      <View style={styles.cardRow}>
        <StatCard
          label="Lucro"
          value={formatCurrency(totals.balance)}
          background="#f1d88a"
          accent="#2c241c"
          helper={totals.balance >= 0 ? 'Continue assim!' : 'Revise seus custos'}
        />
      </View>

      <View style={styles.chart}>
        {chartData.map((item) => (
          <View key={item.label} style={styles.barItem}>
            <View style={[styles.bar, { height: item.height, backgroundColor: item.color }]} />
            <Text style={styles.barLabel}>{item.label}</Text>
            <Text style={styles.barValue}>{formatCurrency(item.value)}</Text>
          </View>
        ))}
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
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c241c',
  },
  subtitle: {
    color: '#6b5c4e',
    marginBottom: 16,
    fontWeight: '600',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  chart: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: '#fff7e5',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  barItem: {
    alignItems: 'center',
    width: '30%',
  },
  bar: {
    width: '60%',
    borderRadius: 10,
    marginBottom: 8,
  },
  barLabel: {
    fontWeight: '700',
    color: '#2c241c',
    marginBottom: 4,
  },
  barValue: {
    color: '#6b5c4e',
    fontSize: 12,
    textAlign: 'center',
  },
});
