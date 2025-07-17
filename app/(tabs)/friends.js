import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Friends() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const friends = Array.from({ length: 10 }).map((_, idx) => ({
    id: idx + 1,
    name: `User ${idx + 1}`,
    avatar: require('../../assets/user.png'),
    status: idx % 3 === 0 ? 'online' : 'offline',
    lastActive: idx % 3 === 0 ? 'Now' : `${idx + 2}h ago`
  }));

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
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={[styles.statCard, styles.elevatedCard]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Total Friends</Text>
            <FontAwesome name="users" size={20} color="rgba(255,255,255,0.3)" style={styles.statIcon} />
          </LinearGradient>

          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={[styles.statCard, styles.elevatedCard]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Total Referrals</Text>
            <MaterialIcons name="share" size={20} color="rgba(255,255,255,0.3)" style={styles.statIcon} />
          </LinearGradient>

          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={[styles.statCard, styles.elevatedCard]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statNumber}>₹154.21</Text>
            <Text style={styles.statLabel}>Earnings</Text>
            <MaterialIcons name="attach-money" size={20} color="rgba(255,255,255,0.3)" style={styles.statIcon} />
          </LinearGradient>
        </View>

        {/* Referral Banner */}
        <TouchableOpacity style={[styles.referCard, styles.elevatedCard]}>
          <LinearGradient
            colors={['#8e2de2', '#4a00e0']}
            style={styles.referGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.referContent}>
              <Text style={styles.referTitle}>Refer Friends & Earn</Text>
              <Text style={styles.referSubtitle}>Get ₹30 for each successful referral</Text>
            </View>
            <View style={styles.referBadge}>
              <Text style={styles.referBadgeText}>₹30</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Friends List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>My Friends</Text>
          <TouchableOpacity>
            <Text style={styles.listAction}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Friends List */}
        {friends.map((friend) => (
          <View key={friend.id} style={[styles.friendCard, styles.elevatedCard]}>
            <View style={styles.friendInfo}>
              <View style={styles.avatarContainer}>
                <Image source={friend.avatar} style={styles.avatar} />
                {friend.status === 'online' && <View style={styles.onlineBadge} />}
              </View>
              <View style={styles.friendDetails}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendStatus}>
                  {friend.status === 'online' ? 'Online' : `Last active ${friend.lastActive}`}
                </Text>
              </View>
            </View>
            <View style={styles.friendActions}>
              <TouchableOpacity style={styles.chatButton}>
                <Ionicons name="chatbubble-ellipses" size={20} color="#8e2de2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.challengeButton}>
                <Text style={styles.challengeText}>Challenge</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

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
    paddingTop: 120,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: width * 0.3,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFD700',
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 5,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginBottom: 10,
  },
  statIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  referCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  referGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referContent: {
    flex: 1,
  },
  referTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 5,
  },
  referSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  referBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  referBadgeText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  listAction: {
    color: '#8e2de2',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  friendCard: {
    backgroundColor: '#1E1E2F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#1E1E2F',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  friendStatus: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  friendActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: 'rgba(142,45,226,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  challengeButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  challengeText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
});