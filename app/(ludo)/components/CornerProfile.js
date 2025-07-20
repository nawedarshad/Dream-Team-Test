import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CornerProfile({ player, color, currentPlayer, name, diceValue }) {
  const isActive = player === currentPlayer;

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={[
        styles.profileContainer,
        { 
          borderColor: isActive ? color : 'transparent',
          backgroundColor: '#1A1A1A',
        }
      ]}>
        {/* Status indicator */}
        <View style={[
            styles.statusIndicator,
            { 
                backgroundColor: color,
                borderColor: isActive ? '#FFF' : 'rgba(255,255,255,0.3)'
            }
        ]} />
        
        {/* Player name */}
        <Text style={styles.playerName} numberOfLines={1}>
          {name || `Player ${player + 1}`}
        </Text>
        
        {/* Dice value */}
        <View style={[
            styles.diceBadge,
            { backgroundColor: isActive ? color : '#333' }
        ]}>
          <Text style={styles.diceValue}>{diceValue || '-'}</Text>
        </View>
      </View>
    </TouchableOpacity>
            // </ View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderRadius: 8,
    minWidth: 120,
    maxWidth: 160,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
  },
  playerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
    flex: 1,
    letterSpacing: 0.2,
  },
  diceBadge: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  diceValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
});