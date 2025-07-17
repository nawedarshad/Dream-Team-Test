import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import React from 'react'
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Header() {
//       const headerOpacity = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [1, 0],
//     extrapolate: 'clamp'
//   });
  return (
    <Animated.View style={[styles.header, { opacity: 1 }]}>
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
  )
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