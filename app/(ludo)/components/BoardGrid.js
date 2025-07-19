import React from 'react';
import { View, StyleSheet } from 'react-native';
import Token from './Token';

export default function BoardGrid({ positions, onMove }) {
  const cells = Array.from({ length: 52 }, (_, i) => i);
  return (
    <View style={styles.board}>
      {cells.map((cell) => (
        <View key={cell} style={styles.cell}>
          {Object.entries(positions).map(([player, tokens]) =>
            tokens.map((pos, idx) =>
              pos === cell ? (
                <Token key={`${player}-${idx}`} player={+player} onPress={() => onMove(+player, idx)} />
              ) : null
            )
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 260,
  },
  cell: {
    width: 20,
    height: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
