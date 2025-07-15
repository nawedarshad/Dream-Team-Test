import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Battle 1v1');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [claimed, setClaimed] = useState(false);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const handleClaim = () => {
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true
    }).start(() => setClaimed(true));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(18,18,18,0.9)', 'rgba(18,18,18,0)']}
          style={styles.headerGradient}
        >
          <Text style={styles.title}>DREAMTEAM</Text>
          <View style={styles.coinsContainer}>
            <MaterialIcons name="monetization-on" size={24} color="#FFD700" />
            <Text style={styles.coinsText}>35</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={20} color="#FFD700" />
            </TouchableOpacity>
          </View>
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
        {/* Daily Reward */}
        <Animated.View style={[styles.rewardBox, styles.elevatedCard]}>
          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={styles.rewardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View>
              <Text style={styles.rewardSubtitle}>Daily Bonus</Text>
              <Text style={styles.rewardText}>Your Daily Reward</Text>
            </View>
            <TouchableOpacity 
              style={[styles.claimButton, claimed && styles.claimedButton]}
              onPress={handleClaim}
              disabled={claimed}
            >
              <LinearGradient
                colors={claimed ? ['#4CAF50', '#2E7D32'] : ['#FDCB6E', '#E17055']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <MaterialIcons name="monetization-on" size={20} color="#fff" />
                <Text style={styles.claimText}>
                  {claimed ? 'CLAIMED' : '10 COINS'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, styles.elevatedCard]}>
          <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search Games" 
            placeholderTextColor="#aaa" 
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <FontAwesome name="sliders" size={20} color="#8e2de2" />
          </TouchableOpacity>
        </View>

        {/* Featured Banner */}
        <TouchableOpacity style={[styles.banner, styles.elevatedCard]}>
          <Image 
            source={require('../../assets/cricket.png')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTag}>NEW RELEASE</Text>
              <Text style={styles.bannerTitle}>Fantasy World of CRICKET</Text>
              <View style={styles.comingSoon}>
                <Text style={styles.comingText}>PLAY NOW</Text>
                <AntDesign name="arrowright" size={16} color="#fff" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {['Battle 1v1', 'Casual', 'Tournaments', 'Fantasy', 'Arcade'].map((category) => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.category,
                activeCategory === category && styles.categoryActive
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Games */}
        <Text style={styles.sectionTitle}>Trending Games</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gamesContainer}
        >
          {[1, 2, 3, 4].map((game) => (
            <TouchableOpacity key={game} style={[styles.gameCard, styles.elevatedCard]}>
              <Image 
                source={require('../../assets/logo-white.png')} 
                style={styles.gameImage}
              />
              <View style={styles.gameDetails}>
                <Text style={styles.gameTitle}>Ludo King</Text>
                <View style={styles.gameStats}>
                  <MaterialIcons name="monetization-on" size={16} color="#FFD700" />
                  <Text style={styles.gamePrize}>10,000</Text>
                  <Text style={styles.gamePlayers}>• 2.4K players</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Tournament */}
        <Text style={styles.sectionTitle}>Featured Tournament</Text>
        <TouchableOpacity style={[styles.tournamentBox, styles.elevatedCard]}>
          <LinearGradient
            colors={['#2d1b48', '#1a1033']}
            style={styles.tournamentGradient}
          >
            <View style={styles.tournamentContent}>
              <Image 
                source={require('../../assets/logo-white.png')} 
                style={styles.tournamentImage}
              />
              <View style={styles.tournamentDetails}>
                <Text style={styles.tournamentTitle}>Ludo Rush Championship</Text>
                <View style={styles.tournamentInfo}>
                  <View style={styles.infoItem}>
                    <MaterialIcons name="monetization-on" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>200 Entry</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <MaterialIcons name="emoji-events" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>1200 Prize</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="people" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>1.2K Players</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.enterButton}>
                <Text style={styles.enterText}>JOIN</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Leaderboard */}
        <Text style={styles.sectionTitle}>Top Players</Text>
        <View style={[styles.leaderboardBox, styles.elevatedCard]}>
          {[1, 2, 3, 4, 5].map((rank) => (
            <TouchableOpacity key={rank} style={styles.leaderRow}>
              <Text style={[
                styles.rank,
                rank === 1 && styles.goldRank,
                rank === 2 && styles.silverRank,
                rank === 3 && styles.bronzeRank
              ]}>
                #{rank}
              </Text>
              <View style={styles.playerInfo}>
                <Image 
                  source={require('../../assets/logo-white.png')} 
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.playerName}>Player {rank}</Text>
                  <Text style={styles.league}>Champion League</Text>
                </View>
              </View>
              <View style={styles.coinsBadge}>
                <MaterialIcons name="monetization-on" size={16} color="#FFD700" />
                <Text style={styles.coins}>{(6-rank)*1000}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>VIEW FULL LEADERBOARD</Text>
            <AntDesign name="arrowright" size={16} color="#8e2de2" />
          </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.7)',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  coinsText: {
    color: '#FFD700',
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  addButton: {
    marginLeft: 8,
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  rewardBox: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 50,
    marginBottom: 16,
  },
  rewardGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  rewardText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  claimButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  claimedButton: {
    opacity: 0.9,
  },
  searchContainer: {
    backgroundColor: '#1E1E2F',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 24,
    color: '#fff',
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerContent: {
    maxWidth: '70%',
  },
  bannerTag: {
    color: '#FFD700',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 12,
  },
  comingSoon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8e2de2',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  comingText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    marginRight: 4,
  },
  categoriesContainer: {
    paddingBottom: 8,
    marginBottom: 16,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#1E1E2F',
  },
  categoryActive: {
    backgroundColor: '#8e2de2',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 16,
  },
  gamesContainer: {
    paddingBottom: 16,
  },
  gameCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: 120,
  },
  gameDetails: {
    padding: 12,
    backgroundColor: '#1E1E2F',
  },
  gameTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  gameStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamePrize: {
    color: '#FFD700',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 4,
  },
  gamePlayers: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginLeft: 8,
  },
  tournamentBox: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  tournamentGradient: {
    padding: 16,
  },
  tournamentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tournamentImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  tournamentInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  enterButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  enterText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  leaderboardBox: {
    backgroundColor: '#1E1E2F',
    borderRadius: 16,
    overflow: 'hidden',
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  rank: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    width: 32,
  },
  goldRank: {
    color: '#FFD700',
  },
  silverRank: {
    color: '#C0C0C0',
  },
  bronzeRank: {
    color: '#CD7F32',
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  playerName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  league: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  coinsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  coins: {
    color: '#FFD700',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  viewAllText: {
    color: '#8e2de2',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    marginRight: 8,
  },
});