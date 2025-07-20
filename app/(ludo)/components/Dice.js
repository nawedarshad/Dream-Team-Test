import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

// Static image map
const diceImages = {
  1: require('../assets/dice1.png'),
  2: require('../assets/dice2.png'),
  3: require('../assets/dice3.png'),
  4: require('../assets/dice4.png'),
  5: require('../assets/dice5.png'),
  6: require('../assets/dice6.png'),
  default: require('../assets/dice6.png'),
};

export default function Dice({ value, onRoll, disabled, color = '#FFF', isActive }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive && !disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
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
  }, [isActive, disabled]);

  const imageSource = diceImages[value] || diceImages.default;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onRoll}
        disabled={disabled}
        style={[
          styles.diceWrapper,
          {
            borderColor: color,
            backgroundColor: isActive ? color + '22' : '#1a1a1a',
            opacity: disabled ? 0.5 : 1,
          }
        ]}
      >
        <Image
          source={imageSource}
          style={styles.diceImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  diceWrapper: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  diceImage: {
    width: '100%',
    height: '100%',
  },
});
