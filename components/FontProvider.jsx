import React, { useEffect } from 'react';
import { Text } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function FontProvider({ children }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && Text) {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { ...(Text.defaultProps.style || {}), fontFamily: 'Poppins_400Regular' };
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return children;
}
