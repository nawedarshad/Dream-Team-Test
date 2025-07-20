import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Token from './Token';
import { BOARD_PATH, SAFE_ZONE } from '../utils/boardPositions';

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

export default function LudoGrid({ positions, currentPlayer, moveToken }) {
  const rows = Array(CELL_COUNT).fill(0);

  const getTokenPosition = (pos, homeArray, index) => {
    if (pos === -1) {
      const [r, c] = homeArray[index];
      return { top: r * CELL_SIZE, left: c * CELL_SIZE };
    }

    if (pos >= 52) {
      const [r, c] = SAFE_ZONE[pos - 52];
      return { top: r * CELL_SIZE, left: c * CELL_SIZE };
    }

    const [r, c] = BOARD_PATH[pos];
    return { top: r * CELL_SIZE, left: c * CELL_SIZE };
  };

  const homeMap = {
    0: homeTokenGridPositions.red,
    1: homeTokenGridPositions.green,
    2: homeTokenGridPositions.yellow,
    3: homeTokenGridPositions.blue,
  };

  return (
    <ImageBackground source={require('../assets/ludo.jpg')} style={styles.container}>
      <View style={styles.board}>
        {rows.map((_, r) => (
          <View key={r} style={styles.row}>
            {rows.map((_, c) => (
              <View
                key={`${r}-${c}`}
                style={styles.cell}
              />
            ))}
          </View>
        ))}

        {Object.entries(positions).map(([player, tokens]) =>
          tokens.map((pos, idx) => {
            const coord = getTokenPosition(pos, homeMap[player], idx);
            return (
              <View
                key={`${player}-${idx}`}
                style={{
                  position: 'absolute',
                  top: coord.top,
                  left: coord.left,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Token
                  player={Number(player)}
                  currentPlayer={currentPlayer}
                  onPress={() => moveToken(Number(player), idx)}
                  isHome={pos === -1}
                />
              </View>
            );
          })
        )}
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
