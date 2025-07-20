import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function PlayerScore({ player, score, color, isActive }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.07,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isActive]);

  useEffect(() => {
    opacityAnim.setValue(0.5);
    Animated.spring(opacityAnim, {
      toValue: 1,
      speed: 10,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  }, [score]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: color,
          shadowColor: color,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.playerLabel}>P{player + 1}</Text>

      <Animated.Text
        style={[
          styles.scoreText,
          {
            color: color,
            opacity: opacityAnim,
          },
        ]}
      >
        {score}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 2.5,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 6,
    backdropFilter: 'blur(6px)', // works in web, ignore for native
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  playerLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
