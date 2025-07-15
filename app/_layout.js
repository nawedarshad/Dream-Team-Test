import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('(tabs)');

  useEffect(() => {
    const checkAuth = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      if (!hasLaunched) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setInitialRoute('onboarding');
      } else if (isLoggedIn !== 'true') {
        setInitialRoute('login');
      }
      
      setAppReady(true);
    };

    checkAuth();
  }, []);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack initialRouteName={initialRoute}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}

