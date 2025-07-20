import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TOKEN_SIZE = 28;

// Define unique gradient colors per player
const tokenGradients = {
  1: ['#9de69d', '#1b5e20'], // Green
  2: ['#fff59d', '#f9a825'], // Yellow
  3: ['#90caf9', '#0d47a1'], // Blue
  0: ['#ff7b7b', '#d50000'], // Red
};

const borderColors = {
  1: '#1b5e20',
  2: '#f9a825',
  3: '#0d47a1',
  0: '#d50000',
};

export default function Token({ player, currentPlayer, onPress, isHome }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isActive = player === currentPlayer;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isActive]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!isActive}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.outer, { transform: [{ scale: scaleAnim }] }]}>
        {isActive && (
          <View style={[styles.ring, { borderColor: borderColors[player] }]} />
        )}
        <LinearGradient
          colors={tokenGradients[player]}
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          style={[styles.token, { opacity: isHome ? 0.6 : 1 }]}
        >
          <View style={styles.highlight} />
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: TOKEN_SIZE + 6,
    height: TOKEN_SIZE + 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  token: {
    width: TOKEN_SIZE,
    height: TOKEN_SIZE,
    borderRadius: TOKEN_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  highlight: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '35%',
    height: '35%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  ring: {
    position: 'absolute',
    width: TOKEN_SIZE + 4,
    height: TOKEN_SIZE + 4,
    borderRadius: (TOKEN_SIZE + 4) / 2,
    borderWidth: 1.8,
  },
});
