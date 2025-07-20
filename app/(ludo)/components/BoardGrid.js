import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Token from './Token';

const { width } = Dimensions.get('window');
const BOARD_SIZE = width * 0.9;
const CELL_COUNT = 15;
const CELL_SIZE = BOARD_SIZE / CELL_COUNT;

const homeTokenGridPositions = {
  green:    [ [1.7,1.9], [1.7,3.5], [3.4,1.9], [3.4,3.5] ],
  yellow:  [ [1.7,10.5], [1.7,12.1], [3.4,10.5], [3.4,12.1] ],
  blue: [ [10.2,10.5], [10.2,12.1], [11.9,10.5], [11.9,12.1] ],
  red:   [ [10.2,1.9], [10.2,3.5], [11.9,1.9], [11.9,3.5] ],
};

export default function LudoGrid() {
  const rows = Array(CELL_COUNT).fill(0);
  return (
    <ImageBackground source={require('../assets/ludo.jpg')} style={styles.container}>
      <View style={styles.board}>
        {rows.map((_, r) => (
          <View key={r} style={styles.row}>
            {rows.map((_, c) => (
              <View
                key={`${r}-${c}`}
                style={styles.cell} // invisible grid
              />
            ))}
          </View>
        ))}

        {Object.entries(homeTokenGridPositions).map(([color, positions], idx) => (
          positions.map((pos, i) => (
            <View
              key={`${color}-${i}`}
              style={{
                position: 'absolute',
                top: pos[0] * CELL_SIZE,
                left: pos[1] * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Token
                player={idx}
                currentPlayer={0}
                onPress={() => {}}
              />
            </View>
          ))
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  row: { flexDirection: 'row' },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'transparent', // grid invisible
    borderWidth: 0, // remove border
  },
});
