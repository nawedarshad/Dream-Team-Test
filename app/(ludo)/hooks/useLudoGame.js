import { useState, useCallback } from 'react';

const WINNING_POSITION = 57;
const SAFE_ZONES = {
  1: [52, 53, 54, 55, 56],
  2: [13, 14, 15, 16, 17],
  3: [26, 27, 28, 29, 30],
  4: [39, 40, 41, 42, 43],
};
const PLAYER_COLORS = ['#FF5252', '#4CAF50', '#FFC107', '#2196F3'];

export default function useLudoGame() {
  const [state, setState] = useState({
    positions: {
      0: [-1, -1, -1, -1], // Using 0-3 for array consistency
      1: [-1, -1, -1, -1],
      2: [-1, -1, -1, -1],
      3: [-1, -1, -1, -1]
    },
    currentPlayer: 0,
    diceValue: 1,
    gameLog: ['Game started! Player 1 begins'],
    scores: [0, 0, 0, 0],
    canRoll: true,
    winner: null,
    animations: {
      diceRoll: false,
      tokenMove: Array(4).fill(false)
    }
  });

  const rollDice = useCallback(() => {
    if (!state.canRoll || state.winner) return;

    const value = Math.floor(Math.random() * 6) + 1;
    setState(prev => ({
      ...prev,
      diceValue: value,
      canRoll: false,
      gameLog: [...prev.gameLog, `Player ${prev.currentPlayer+1} rolled ${value}`],
      animations: { ...prev.animations, diceRoll: true }
    }));

    setTimeout(() => {
  setState(prev => ({
    ...prev,
    animations: { ...prev.animations, diceRoll: false }
  }));
}, 1000);
  }, [state.canRoll, state.winner]);

  const moveToken = useCallback((player, tokenIndex) => {
    if (player !== state.currentPlayer || state.canRoll || state.winner) return;

    setState(prev => {
      const newPositions = {...prev.positions};
      const currentPos = newPositions[player][tokenIndex];
      let shouldSwitchPlayer = true;

      // Movement logic
      if (currentPos === -1 && prev.diceValue === 6) {
        newPositions[player][tokenIndex] = 0;
        shouldSwitchPlayer = false;
      } 
      else if (currentPos >= 0) {
        const newPos = currentPos + prev.diceValue;
        
        if (newPos < 52) {
          newPositions[player][tokenIndex] = newPos;
          checkCaptures(player, newPos, newPositions);
        }
        else if (newPos < 57) {
          newPositions[player][tokenIndex] = newPos;
          checkWinCondition(player, newPositions);
        }
      }

      return {
        ...prev,
        positions: newPositions,
        currentPlayer: shouldSwitchPlayer && prev.diceValue !== 6 ? 
          (prev.currentPlayer + 1) % 4 : prev.currentPlayer,
        canRoll: true,
        animations: { ...prev.animations, tokenMove: prev.animations.tokenMove.map((_, i) => i === player) }
      };
    });
  }, [state.currentPlayer, state.diceValue, state.canRoll, state.winner]);

  // Helper functions
  const checkCaptures = (player, newPos, positions) => {
    Object.entries(positions).forEach(([p, tokens]) => {
      if (Number(p) !== player) {
        tokens.forEach((pos, idx) => {
          if (pos === newPos) {
            positions[p][idx] = -1;
            setState(prev => ({
              ...prev,
              gameLog: [...prev.gameLog, `Player ${player+1} captured Player ${Number(p)+1}'s token!`]
            }));
          }
        });
      }
    });
  };

  const checkWinCondition = (player, positions) => {
    if (positions[player].every(pos => pos >= 52)) {
      setState(prev => ({
        ...prev,
        winner: player,
        scores: prev.scores.map((score, i) => i === player ? score + 1 : score),
        gameLog: [...prev.gameLog, `PLAYER ${player+1} WINS!`]
      }));
    }
  };

  const resetGame = useCallback(() => {
    setState({
      positions: {
        0: [-1, -1, -1, -1],
        1: [-1, -1, -1, -1],
        2: [-1, -1, -1, -1],
        3: [-1, -1, -1, -1]
      },
      currentPlayer: 0,
      diceValue: 1,
      gameLog: ['New game started! Player 1 begins'],
      scores: [...state.scores],
      canRoll: true,
      winner: null,
      animations: {
        diceRoll: false,
        tokenMove: Array(4).fill(false)
      }
    });
  }, [state.scores]);

  return { 
    ...state,
    playerColors: PLAYER_COLORS,
    rollDice, 
    moveToken,
    resetGame
  };
}