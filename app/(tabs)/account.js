// File: app/(tabs)/account.js
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Account() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Screen (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
