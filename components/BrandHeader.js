import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LOGO = require('../images/8919fe7a-c921-497c-8cef-2cc185477a93.png');

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
      <Image source={LOGO} style={styles.logo} />
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
