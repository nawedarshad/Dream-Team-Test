import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Rewards() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0.6, // 60% progress
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false
    }).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(18,18,18,0.9)', 'rgba(18,18,18,0)']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerText}>DREAMTEAM REWARDS</Text>
          <TouchableOpacity style={styles.coinContainer}>
            <MaterialIcons name="monetization-on" size={24} color="#FFD700" />
            <Text style={styles.coinText}>35</Text>
            <MaterialIcons name="add" size={20} color="#FFD700" style={styles.addIcon} />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Progress Card */}
        <View style={[styles.card, styles.elevatedCard]}>
          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <MaterialIcons name="stars" size={24} color="#FFD700" />
              <Text style={styles.cardTitle}>Champion Progress</Text>
            </View>
            <Text style={styles.cardSubtitle}>Play 5 more matches to win cash prize up to ₹100</Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>0</Text>
                <Text style={styles.progressText}>5</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <Animated.View 
                  style={[
                    styles.progressBarFill,
                    { width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%']
                      }) 
                    }
                  ]}
                />
              </View>
            </View>
            
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>VIEW REWARDS</Text>
              <AntDesign name="arrowright" size={16} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Daily Rewards */}
        <View style={[styles.card, styles.elevatedCard]}>
          <LinearGradient
            colors={['#1E0B36', '#2D1B48']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <MaterialIcons name="calendar-today" size={24} color="#FFD700" />
              <Text style={styles.cardTitle}>Daily Login Rewards</Text>
            </View>
            <Text style={styles.cardSubtitle}>Log in to get daily reward bonuses</Text>
            
            <View style={styles.rewardsRow}>
              {[100, 150, 200, 250, 300].map((amount, idx) => (
                <View key={idx} style={styles.rewardCircle}>
                  <LinearGradient
                    colors={idx === 2 ? ['#FDCB6E', '#E17055'] : ['#5a3bcf', '#3d2e74']}
                    style={styles.rewardGradient}
                  >
                    <MaterialIcons name="monetization-on" size={20} color="#fff" />
                    <Text style={styles.rewardAmount}>+{amount}</Text>
                    {idx === 2 && <View style={styles.highlightBadge}><Text style={styles.highlightText}>2X</Text></View>}
                  </LinearGradient>
                  <Text style={styles.dayText}>Day {idx+1}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={[styles.cardButton, styles.primaryButton]}>
              <Text style={styles.cardButtonText}>CLAIM TODAY'S REWARD</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Buy Coins */}
        <View style={[styles.card, styles.elevatedCard]}>
          <LinearGradient
            colors={['#1E0B36', '#2D1B48']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <MaterialIcons name="attach-money" size={24} color="#FFD700" />
              <Text style={styles.cardTitle}>Get More Coins</Text>
            </View>
            
            {[{ amount: 50, price: 20 }, { amount: 150, price: 50 }, { amount: 400, price: 100 }].map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.coinPackage}>
                <View style={styles.coinPackageLeft}>
                  <MaterialIcons name="monetization-on" size={28} color="#FFD700" />
                  <View>
                    <Text style={styles.coinPackageAmount}>{item.amount} Coins</Text>
                    <Text style={styles.coinPackageBonus}>{idx === 2 && '+ 50 Bonus Coins'}</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#8e2de2', '#4a00e0']}
                  style={styles.buyButtonGradient}
                >
                  <Text style={styles.buyButtonText}>₹{item.price}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </View>

        {/* 30 Day Challenge */}
        <View style={[styles.card, styles.elevatedCard]}>
          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <FontAwesome name="trophy" size={24} color="#FFD700" />
              <Text style={styles.cardTitle}>30 Day Challenge</Text>
            </View>
            <Text style={styles.cardSubtitle}>Play 30 days for exciting rewards</Text>
            
            <View style={styles.challengeContainer}>
              <Image 
                source={require('../../assets/trophy.png')} 
                style={styles.trophyImage}
                resizeMode="contain"
              />
              <View style={styles.challengeProgress}>
                <Text style={styles.challengeText}>Current Progress</Text>
                <Text style={styles.challengeCount}>1,240 players joined</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '15%' }]} />
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={[styles.cardButton, styles.primaryButton]}>
              <Text style={styles.cardButtonText}>JOIN CHALLENGE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.7)',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  coinText: {
    color: '#FFD700',
    marginHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  addIcon: {
    marginLeft: 5,
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  progressBarBackground: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    marginTop: 10,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: '#8e2de2',
    borderWidth: 0,
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rewardCircle: {
    alignItems: 'center',
  },
  rewardGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  rewardAmount: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 2,
  },
  dayText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  highlightBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  highlightText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  coinPackage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  coinPackageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinPackageAmount: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 12,
  },
  coinPackageBonus: {
    color: '#FFD700',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginLeft: 12,
    marginTop: 2,
  },
  buyButtonGradient: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  challengeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  trophyImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  challengeProgress: {
    flex: 1,
    justifyContent: 'center',
  },
  challengeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 5,
  },
  challengeCount: {
    color: '#FFD700',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
});