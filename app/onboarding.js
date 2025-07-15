import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      image: require('../assets/onboarding/1.png'),
      title: "Play Games & Earn Cash",
      subtitle: "Turn your skills into real rewards"
    },
    {
      image: require('../assets/onboarding/2.png'),
      title: "Compete With Friends",
      subtitle: "Challenge your network and climb the leaderboards"
    },
    {
      image: require('../assets/onboarding/3.png'),
      title: "Instant Withdrawals",
      subtitle: "Get your winnings in seconds, not days"
    }
  ];

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
    
    // Fade animation when scrolling
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  const goToNext = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start(() => {
      if (currentIndex < 2) {
        scrollRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
      } else {
        router.replace('/login');
      }
    });
  };

  return (
    <LinearGradient
      colors={['#0F0F15', '#1A1A2E']}
      style={styles.container}
    >
      {/* Skip Button */}
      {currentIndex < 2 && (
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => router.replace('/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
      
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {slides.map((slide, index) => (
          <Animated.View 
            key={index}
            style={[
              styles.slide,
              { opacity: fadeAnim }
            ]}
          >
            <Image
              source={slide.image}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              scrollRef.current?.scrollTo({ x: width * index, animated: true });
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Next/Get Started Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={goToNext}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={currentIndex === 2 ? ['#8A2BE2', '#4B0082'] : ['#4A00E0', '#8E2DE2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {currentIndex === 2 ? 'GET STARTED' : 'NEXT'}
            </Text>
            {currentIndex < 2 && (
              <AntDesign name="arrowright" size={20} color="#FFF" style={styles.arrowIcon} />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height: height - 100,
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.6,
    resizeMode: 'contain',
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    marginTop: 40,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 6,
    transitionProperty: 'all',
    transitionDuration: '300ms',
  },
  activeDot: {
    width: 30,
    backgroundColor: '#8A2BE2',
  },
  button: {
    marginHorizontal: 40,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  skipText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});