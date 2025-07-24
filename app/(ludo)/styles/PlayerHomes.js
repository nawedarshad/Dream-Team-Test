import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const HOME_SIZE = width * 0.35;

export const PlayerHomeStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: HOME_SIZE,
    height: HOME_SIZE,
    borderRadius: HOME_SIZE / 2,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player1: {
    top: width * 0.05,
    left: width * 0.05,
    borderColor: '#FF5252',
    backgroundColor: 'rgba(255, 82, 82, 0.15)',
  },
  player2: {
    top: width * 0.05,
    right: width * 0.05,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  player3: {
    bottom: width * 0.05,
    right: width * 0.05,
    borderColor: '#FFC107',
    backgroundColor: 'rgba(255, 193, 7, 0.15)',
  },
  player4: {
    bottom: width * 0.05,
    left: width * 0.05,
    borderColor: '#2196F3',
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
  },
  tokenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
  },
});

export const RowStyles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});