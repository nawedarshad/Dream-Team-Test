import { useState } from 'react';

export default function useLudoGame() {
  const initialPositions = {
    1: [-1, -1, -1, -1],
    2: [-1, -1, -1, -1],
    3: [-1, -1, -1, -1],
    4: [-1, -1, -1, -1],
  };
  const [positions, setPositions] = useState(initialPositions);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [dice, setDice] = useState(1);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDice(value);
    return value;
  };

  const moveToken = (player, index) => {
    setPositions(prev => {
      const updated = { ...prev };
      let pos = updated[player][index];
      if (pos < 0) {
        if (dice === 6) pos = 0;
      } else {
        pos = (pos + dice) % 52;
      }
      updated[player][index] = pos;
      return updated;
    });
    if (dice !== 6) setCurrentPlayer(p => (p % 4) + 1);
  };

  return { positions, currentPlayer, dice, rollDice, moveToken };
}
