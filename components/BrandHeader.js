import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LOGO_URI =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80';

export default function BrandHeader({ onBack }) {
  const BackSlot = onBack ? (
    <TouchableOpacity style={styles.backBtn} onPress={onBack} accessibilityLabel="Voltar">
      <Ionicons name="arrow-back" size={22} color="#2c241c" />
    </TouchableOpacity>
  ) : (
    <View style={styles.backPlaceholder} />
  );

  return (
    <View style={styles.container}>
      {BackSlot}
      <Image source={{ uri: LOGO_URI }} style={styles.logo} />
      <View style={styles.backPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginBottom: 10,
  },
  logo: {
    width: 86,
    height: 86,
    resizeMode: 'contain',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f1d88a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: {
    width: 38,
    height: 38,
  },
});
