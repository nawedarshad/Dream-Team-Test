import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

export default function Dice({ onRoll, image, style, position = 'before' }) {
  const baseStyle = position === 'before'
    ? { width: 90, height: 70, marginLeft: 30, marginBottom: 10 }
    : { width: 90, height: 70, marginLeft: 30, marginTop: 10 };
  return (
    <TouchableOpacity onPress={onRoll}>
      <Image source={image} style={[baseStyle, style]} />
    </TouchableOpacity>
  );
}
