import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('friends');

  // Arkadaş listesi
  const friends = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      username: '@ahmetyilmaz',
      avatar: '👨‍💼',
      status: 'online',
      lastActivity: 'Basketbol maçına katıldı',
      mutualFriends: 12,
      verified: true,
    },
    {
      id: 2,
      name: 'Zeynep Demir',
      username: '@zeynepdemir',
      avatar: '👩‍💻',
      status: 'offline',
      lastActivity: 'Tenis antrenmanı tamamladı',
      mutualFriends: 8,
      verified: false,
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      username: '@mehmetkaya',
      avatar: '🏃‍♂️',
      status: 'playing',
      lastActivity: 'Futbol maçında',
      mutualFriends: 15,
      verified: true,
    },
  ];

  // Takip edilenler
  const following = [
    {
      id: 4,
      name: 'Ali Öztürk',
      username: '@aliozturk',
      avatar: '⚽',
      isFollowing: true,
      sport: 'Futbol',
      level: 'Profesyonel',
    },
    {
      id: 5,
      name: 'Ayşe Kara',
      username: '@aysekara',
      avatar: '🏀',
      isFollowing: true,
      sport: 'Basketbol',
      level: 'İleri',
    },
  ];

  // Takipçiler
  const followers = [
    {
      id: 6,
      name: 'Can Yıldız',
      username: '@canyildiz',
      avatar: '🎾',
      isFollowingBack: false,
      sport: 'Tenis',
      level: 'Orta',
    },
    {
      id: 7,
      name: 'Selin Ay',
      username: '@selinay',
      avatar: '🏐',
      isFollowingBack: true,
      sport: 'Voleybol',
      level: 'Başlangıç',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Arkadaş kartı
  const renderFriendCard = ({item}) => (
    <TouchableOpacity
      style={styles.friendCard}
      onPress={() =>
        navigation.navigate('UserProfileScreen', {userId: item.id})
      }
      activeOpacity={0.7}>
      <View style={styles.friendHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{item.avatar}</Text>
          <View
            style={[
              styles.statusDot,
              {backgroundColor: getStatusColor(item.status)},
            ]}
          />
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.lastActivity}>{item.lastActivity}</Text>
          <Text style={styles.mutualFriends}>
            {item.mutualFriends} ortak arkadaş
          </Text>
        </View>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => navigation.navigate('ChatScreen', {userId: item.id})}>
          <Text style={styles.messageButtonText}>💬</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Takip kartı
  const renderFollowCard = ({item}) => (
    <TouchableOpacity
      style={styles.followCard}
      onPress={() =>
        navigation.navigate('UserProfileScreen', {userId: item.id})
      }
      activeOpacity={0.7}>
      <View style={styles.followHeader}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <View style={styles.followInfo}>
          <Text style={styles.followName}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.sport}>
            {item.sport} • {item.level}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.followButton,
            selectedTab === 'followers' &&
              !item.isFollowingBack &&
              styles.followBackButton,
          ]}>
          <Text style={styles.followButtonText}>
            {selectedTab === 'following'
              ? 'Takipte'
              : item.isFollowingBack
              ? 'Arkadaş'
              : 'Takip Et'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = status => {
    switch (status) {
      case 'online':
        return '#4CAF50';
      case 'playing':
        return '#FF6B35';
      case 'offline':
      default:
        return '#999999';
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'friends':
        return (
          <FlatList
            data={friends}
            renderItem={renderFriendCard}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.listContainer}
          />
        );
      case 'following':
        return (
          <FlatList
            data={following}
            renderItem={renderFollowCard}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.listContainer}
          />
        );
      case 'followers':
        return (
          <FlatList
            data={followers}
            renderItem={renderFollowCard}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.listContainer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Arkadaşlar</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('PlayerSearchScreen')}>
          <Text style={styles.searchButtonText}>👥</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Seçiciler */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'friends' && styles.selectedTabButton,
          ]}
          onPress={() => setSelectedTab('friends')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'friends' && styles.selectedTabText,
            ]}>
            Arkadaşlar ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'following' && styles.selectedTabButton,
          ]}
          onPress={() => setSelectedTab('following')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'following' && styles.selectedTabText,
            ]}>
            Takip ({following.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'followers' && styles.selectedTabButton,
          ]}
          onPress={() => setSelectedTab('followers')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'followers' && styles.selectedTabText,
            ]}>
            Takipçi ({followers.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#F5F6FA',
  },
  selectedTabButton: {
    backgroundColor: '#2E5BFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 20,
  },
  friendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 50,
  },
  statusDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  username: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  lastActivity: {
    fontSize: 14,
    color: '#2E5BFF',
    marginBottom: 3,
  },
  mutualFriends: {
    fontSize: 12,
    color: '#999999',
  },
  messageButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2E5BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 20,
  },
  followCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  followHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followInfo: {
    flex: 1,
    marginLeft: 15,
  },
  followName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  sport: {
    fontSize: 14,
    color: '#2E5BFF',
  },
  followButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  followBackButton: {
    backgroundColor: '#2E5BFF',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
  },
});

export default FriendsScreen;
