import { View, StyleSheet } from 'react-native';
import LudoBoard from './components/LudoBoard';

export default function OfflineLudo() {
  return (
    <View style={styles.container}>
      <LudoBoard />
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
});
