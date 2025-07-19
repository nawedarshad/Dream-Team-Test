import { View, Text, StyleSheet } from 'react-native';

export default function CpuLudo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CPU mode coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
