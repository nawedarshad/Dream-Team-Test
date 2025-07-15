// File: app/(tabs)/friends.js
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Friends() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Friends Screen (Coming Soon)</Text>
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
