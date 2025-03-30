import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './globalStyles';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Lung Cancer Detection</Text>
      <Text style={styles.subtitle}>AI-Powered Early Detection Tool</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
});

export default Header;