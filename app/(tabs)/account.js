import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Account() {
  const scrollY = useRef(new Animated.Value(0)).current;

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
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../../assets/spiderman.png')} 
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons name="edit" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Nawed Arshad</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>BASIC MEMBER</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={[styles.statCard, styles.elevatedCard]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>84</Text>
            <Text style={styles.statLabel}>Total Wins</Text>
            <FontAwesome name="trophy" size={20} color="rgba(255,255,255,0.3)" style={styles.statIcon} />
          </LinearGradient>

          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={[styles.statCard, styles.elevatedCard]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>66.67%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
            <MaterialIcons name="show-chart" size={20} color="rgba(255,255,255,0.3)" style={styles.statIcon} />
          </LinearGradient>

          <LinearGradient
            colors={['#2A0A5E', '#1A093A']}
            style={[styles.statCard, styles.elevatedCard]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>40%</Text>
            <Text style={styles.statLabel}>Profit</Text>
            <MaterialIcons name="trending-up" size={20} color="rgba(255,255,255,0.3)" style={styles.statIcon} />
          </LinearGradient>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, styles.elevatedCard]}>
          <LinearGradient
            colors={['#8e2de2', '#4a00e0']}
            style={styles.balanceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
            <Text style={styles.balanceValue}>₹300.00</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity style={styles.balanceButton}>
                <Text style={styles.balanceButtonText}>Add Money</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.balanceButton, styles.withdrawButton]}>
                <Text style={[styles.balanceButtonText, styles.withdrawButtonText]}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={[styles.menuItem, styles.elevatedCard]}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="card-giftcard" size={24} color="#FFD700" />
            </View>
            <Text style={styles.menuText}>Redeem Coins</Text>
            <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.elevatedCard]}>
            <View style={styles.menuIcon}>
              <Ionicons name="settings" size={24} color="#FFD700" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.elevatedCard]}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="help" size={24} color="#FFD700" />
            </View>
            <Text style={styles.menuText}>Help Center</Text>
            <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.elevatedCard]}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="logout" size={24} color="#FFD700" />
            </View>
            <Text style={styles.menuText}>Sign Out</Text>
            <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.5)" />
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#8e2de2',
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#8e2de2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: '#FFD700',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: width * 0.3,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  statValue: {
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
  balanceCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  balanceGradient: {
    padding: 20,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 5,
  },
  balanceValue: {
    color: '#FFD700',
    fontSize: 32,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 12,
    width: '48%',
    alignItems: 'center',
  },
  balanceButtonText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  withdrawButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  withdrawButtonText: {
    color: '#FFD700',
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(142,45,226,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});