import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Dice from './Dice';
import BoardGrid from './BoardGrid';
import useLudoGame from '../hooks/useLudoGame';

export default function LudoBoard() {
  const { positions, currentPlayer, dice, rollDice, moveToken } = useLudoGame();
  return (
    <View style={styles.container}>
      <Text style={styles.turn}>Player {currentPlayer}'s turn</Text>
      <Dice onRoll={rollDice} image={require('../assets/dice' + dice + '.png')} />
      <BoardGrid positions={positions} onMove={moveToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  turn: {
    fontSize: 18,
    marginBottom: 10,
  },
});
