import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native';
import BoardGrid from './BoardGrid';
import Dice from './Dice';
import CornerProfile from './CornerProfile';
import PlayerScore from './PlayerScore';
import GameLog from './GameLog';
import useLudoGame from '../hooks/useLudoGame';

const { width, height } = Dimensions.get('window');

export default function LudoBoard() {
  const {
    positions,
    currentPlayer,
    diceValue,
    scores,
    gameLog,
    canRoll,
    winner,
    playerColors,
    rollDice,
    moveToken,
    resetGame,
    activeTokens = []
  } = useLudoGame();

  const playerNames = ["Computer 1", "Computer 2", "You", "Computer 3"];

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Game Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: playerColors[currentPlayer] }]}>
          {winner ? `🏆 Player ${winner+1} Wins!` : `Player ${currentPlayer+1}'s Turn`}
        </Text>
      </View>

      {/* Player Corners */}
      <View style={styles.topCorners}>
        {[0, 1].map(player => (
          <View key={player} style={styles.cornerWrapper}>
            <CornerProfile 
              player={player} 
              color={playerColors[player]} 
              currentPlayer={currentPlayer} 
              name={playerNames[player]}
              diceValue={currentPlayer === player ? diceValue : null}
            />
            {currentPlayer === player && (
              <Dice
                value={diceValue}
                onRoll={() => rollDice(player)}
                disabled={!canRoll || !!winner}
                color={playerColors[player]}
                isActive
              />
            )}
          </View>
        ))}
      </View>

      {/* Scores */}
      <View style={styles.scoreRow}>
        {scores.map((s, i) => (
          <PlayerScore
            key={i}
            player={i}
            score={s}
            color={playerColors[i]}
            isActive={currentPlayer === i}
          />
        ))}
      </View>

      {/* Game Board */}
      <View style={styles.boardContainer}>
        <BoardGrid
          positions={positions}
          currentPlayer={currentPlayer}
          moveToken={moveToken}
        />
      </View>

      {/* Bottom Corners */}
      <View style={styles.bottomCorners}>
        {[2, 3].map(player => (
          <View key={player} style={styles.cornerWrapper}>
            <CornerProfile 
              player={player} 
              color={playerColors[player]} 
              currentPlayer={currentPlayer} 
              name={playerNames[player]}
              diceValue={currentPlayer === player ? diceValue : null}
            />
            {currentPlayer === player && (
              <Dice
                value={diceValue}
                onRoll={() => rollDice(player)}
                disabled={!canRoll || !!winner}
                color={playerColors[player]}
                isActive
              />
            )}
          </View>
        ))}
      </View>

      <GameLog logs={gameLog} />

      {/* Winner Modal */}
      {winner && (
        <View style={styles.winnerOverlay}>
          <View style={[styles.winnerBox, { backgroundColor: playerColors[winner] }]}>
            <Text style={styles.winnerText}>Player {winner+1} Wins!</Text>
            <TouchableOpacity 
              style={styles.playAgainButton}
              onPress={resetGame}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#121212'
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },
  topCorners: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 100,
    marginBottom: 8
  },
  bottomCorners: {
    flexDirection: 'row',
    marginBottom: 80,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8
  },
  cornerWrapper: {
    alignItems: 'center',
    width: width * 0.4,
    gap: 8
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  winnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20
  },
  winnerBox: {
    width: width * 0.8,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 10
  },
  winnerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  playAgainButton: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24
  },
  playAgainText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#121212'
  }
});