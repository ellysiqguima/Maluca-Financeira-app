import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ label, value, accent = '#7b5336', background = '#fff7e5', helper }) {
  return (
    <View style={[styles.card, { backgroundColor: background }]}>
      <Text style={[styles.label, { color: accent }]}>{label}</Text>
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    minWidth: 140,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
  },
  helper: {
    marginTop: 4,
    color: '#6b5c4e',
    fontSize: 12,
  },
});
