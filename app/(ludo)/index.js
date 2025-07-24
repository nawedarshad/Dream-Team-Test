import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function LudoModeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePress = (route) => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      router.push(route);
    });
  };

  return (
    <ImageBackground 
      source={require('./assets/images/bg.jpg')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.title}>LUDO KING</Text>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonElevated]}
          onPress={() => handlePress('offline')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>OFFLINE PLAY</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonElevated]}
          onPress={() => handlePress('cpu')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>PLAY VS CPU</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonElevated]}
          onPress={() => handlePress('online')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>ONLINE MULTIPLAYER</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 50,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  button: {
    width: '100%',
    backgroundColor: 'rgba(142, 45, 226, 0.9)',
    paddingVertical: 18,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buttonElevated: {
    shadowColor: '#8e2de2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    zIndex: 1,
  },
  buttonGlow: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
    transform: [{ scale: 0 }],
    animation: 'pulse 2s infinite',
  },
});

// Add this to your global styles or App.js
const globalStyles = `
  @keyframes pulse {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
`;