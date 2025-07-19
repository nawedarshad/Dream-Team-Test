import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const colors = ['red', 'green', 'yellow', 'blue'];

export default function Token({ player, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors[player - 1] }} />
    </TouchableOpacity>
  );
}
