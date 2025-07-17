import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      triggerShake();
      return;
    }

    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (username === 'admin' && password === '1234') {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      router.replace('/(tabs)');
    } else {
      triggerShake();
      alert('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <Animated.View style={[styles.content, {
          transform: [{ translateX: shakeAnimation }]
        }]}>
          <Image
            source={require('../assets/logo-white.png')} // Replace with your logo
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subheading}>Sign in to continue</Text>
          
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color={focusedInput === 'username' ? '#fff' : '#6e6e8a'} style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#6e6e8a"
              style={[
                styles.input,
                focusedInput === 'username' && styles.inputFocused
              ]}
              onChangeText={setUsername}
              value={username}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color={focusedInput === 'password' ? '#fff' : '#6e6e8a'} style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#6e6e8a"
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused
              ]}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <LinearGradient
              colors={['#8e2de2', '#4a00e0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>LOGIN</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <TouchableOpacity style={styles.socialButton}>
            <MaterialIcons name="fingerprint" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Use Biometric Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 30,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter_700Bold', // Use custom font if available
  },
  subheading: {
    fontSize: 16,
    color: '#a0a0c0',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Inter_400Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 56,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  inputFocused: {
    borderColor: '#8e2de2',
  },
  button: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    height: 56,
    shadowColor: '#8e2de2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  forgotText: {
    color: '#a0a0c0',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: '#a0a0c0',
    marginHorizontal: 10,
    fontSize: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 12,
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  footerText: {
    color: '#a0a0c0',
    fontSize: 14,
  },
  footerLink: {
    color: '#8e2de2',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});