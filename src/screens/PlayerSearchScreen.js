import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PlayerSearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Örnek kullanıcı verileri
  const mockUsers = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      username: '@ahmetyilmaz',
      avatar: '👨‍💼',
      sports: ['Basketbol', 'Futbol'],
      level: 'İleri',
      location: 'İstanbul, Kadıköy',
      followers: 245,
      following: 180,
      isFollowing: false,
      verified: true,
      lastActive: '2 saat önce',
    },
    {
      id: 2,
      name: 'Zeynep Demir',
      username: '@zeynepdemir',
      avatar: '👩‍💻',
      sports: ['Tenis', 'Voleybol'],
      level: 'Orta',
      location: 'İstanbul, Beşiktaş',
      followers: 156,
      following: 89,
      isFollowing: true,
      verified: false,
      lastActive: '5 dakika önce',
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      username: '@mehmetkaya',
      avatar: '🏃‍♂️',
      sports: ['Koşu', 'Fitness'],
      level: 'Profesyonel',
      location: 'İstanbul, Şişli',
      followers: 892,
      following: 234,
      isFollowing: false,
      verified: true,
      lastActive: '1 gün önce',
    },
  ];

  // Arama fonksiyonu
  const handleSearch = query => {
    if (query.trim()) {
      const filtered = mockUsers.filter(
        user =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.sports.some(sport =>
            sport.toLowerCase().includes(query.toLowerCase()),
          ),
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  // Takip etme/bırakma fonksiyonu
  const handleFollowToggle = userId => {
    setSearchResults(prev =>
      prev.map(user =>
        user.id === userId ? {...user, isFollowing: !user.isFollowing} : user,
      ),
    );
  };

  // Kullanıcı kartı render
  const renderUserCard = ({item}) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() =>
        navigation.navigate('UserProfileScreen', {userId: item.id})
      }
      activeOpacity={0.7}>
      <View style={styles.userHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{item.avatar}</Text>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <Text style={styles.location}>📍 {item.location}</Text>
          <Text style={styles.lastActive}>🕒 {item.lastActive}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.followButton,
            item.isFollowing && styles.followingButton,
          ]}
          onPress={() => handleFollowToggle(item.id)}>
          <Text
            style={[
              styles.followButtonText,
              item.isFollowing && styles.followingButtonText,
            ]}>
            {item.isFollowing ? 'Takipte' : 'Takip Et'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.followers}</Text>
          <Text style={styles.statLabel}>Takipçi</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.following}</Text>
          <Text style={styles.statLabel}>Takip</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.levelBadge}>{item.level}</Text>
        </View>
      </View>

      <View style={styles.sportsContainer}>
        {item.sports.map((sport, index) => (
          <View key={index} style={styles.sportTag}>
            <Text style={styles.sportText}>{sport}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Oyuncu Ara</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>🔧</Text>
        </TouchableOpacity>
      </View>

      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="İsim, kullanıcı adı veya spor dalı ara..."
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(searchQuery)}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Sonuçlar */}
      {searchQuery === '' ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>👥</Text>
          <Text style={styles.emptyStateTitle}>Oyuncu Ara</Text>
          <Text style={styles.emptyStateSubtitle}>
            Yeni arkadaşlar edinmek için oyuncu adı, kullanıcı adı veya spor
            dalı arayın
          </Text>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🔍</Text>
          <Text style={styles.emptyStateTitle}>Sonuç Bulunamadı</Text>
          <Text style={styles.emptyStateSubtitle}>
            Aradığınız kriterlere uygun oyuncu bulunamadı
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderUserCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resultsList}
        />
      )}
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
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#F5F6FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2E5BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  resultsList: {
    padding: 20,
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 50,
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
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    color: '#666666',
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  lastActive: {
    fontSize: 12,
    color: '#999999',
  },
  followButton: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: '#F0F0F0',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: '#666666',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: '500',
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportTag: {
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 5,
  },
  sportText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
});

export default PlayerSearchScreen;
