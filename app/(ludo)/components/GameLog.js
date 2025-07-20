import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

export default function GameLog({ logs }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME LOG</Text>
      <ScrollView 
        style={styles.logContainer}
        contentContainerStyle={styles.logContent}
      >
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>
            {log}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    padding: 10,
    maxHeight: 150,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  logContainer: {
    flex: 1,
  },
  logContent: {
    paddingBottom: 5,
  },
  logText: {
    color: '#FFF',
    fontSize: 14,
    marginVertical: 2,
    paddingHorizontal: 5,
  },
});