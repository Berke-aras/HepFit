import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('popular');

  // Popüler etkinlikler
  const popularEvents = [
    {
      id: 1,
      title: 'Haftalık Basketbol Turnuvası',
      type: 'tournament',
      location: 'Beşiktaş Spor Merkezi',
      date: '15 Oca',
      time: '18:00',
      participants: 24,
      maxParticipants: 32,
      level: 'Orta',
      price: 'Ücretsiz',
      image: '🏀',
      trending: true,
    },
    {
      id: 2,
      title: 'Kadın Futbol Ligi',
      type: 'league',
      location: 'Sarıyer Sahası',
      date: '16 Oca',
      time: '16:00',
      participants: 18,
      maxParticipants: 22,
      level: 'İleri',
      price: '50₺',
      image: '⚽',
      trending: false,
    },
    {
      id: 3,
      title: 'Tenis Partneri Buluşması',
      type: 'social',
      location: 'Fenerbahçe Tenis Kulübü',
      date: '17 Oca',
      time: '10:00',
      participants: 8,
      maxParticipants: 16,
      level: 'Başlangıç',
      price: '30₺',
      image: '🎾',
      trending: true,
    },
  ];

  // Önerilen takımlar
  const recommendedTeams = [
    {
      id: 1,
      name: 'Thunder Basketbol',
      sport: 'Basketbol',
      members: 15,
      maxMembers: 20,
      location: 'Kadıköy',
      level: 'Orta',
      description: 'Her hafta düzenli antrenman yapan aktif takım',
      image: '🏀',
      verified: true,
    },
    {
      id: 2,
      name: 'Phoenix FC',
      sport: 'Futbol',
      members: 22,
      maxMembers: 25,
      location: 'Şişli',
      level: 'İleri',
      description: 'Amatör ligde mücadele eden rekabetçi takım',
      image: '⚽',
      verified: true,
    },
    {
      id: 3,
      name: 'Voleybol Severler',
      sport: 'Voleybol',
      members: 12,
      maxMembers: 18,
      location: 'Beşiktaş',
      level: 'Başlangıç',
      description: 'Yeni başlayanlar için ideal dostane takım',
      image: '🏐',
      verified: false,
    },
  ];

  // Trend aktiviteler
  const trendingActivities = [
    {
      id: 1,
      title: 'Sabah Yoga Seansı',
      type: 'training',
      location: 'Maçka Parkı',
      date: 'Her gün',
      time: '07:00',
      participants: 45,
      growth: '+15%',
      image: '🧘‍♀️',
    },
    {
      id: 2,
      title: 'Crossfit Challenge',
      type: 'training',
      location: 'Fit Zone Gym',
      date: 'Hafta sonu',
      time: '09:00',
      participants: 30,
      growth: '+25%',
      image: '💪',
    },
    {
      id: 3,
      title: 'Beachvolley Turnuvası',
      type: 'event',
      location: 'Kilyos Plajı',
      date: '22 Oca',
      time: '14:00',
      participants: 16,
      growth: '+40%',
      image: '🏖️',
    },
  ];

  // Sekmeler
  const tabs = [
    {id: 'popular', title: 'Popüler', icon: '🔥'},
    {id: 'teams', title: 'Takımlar', icon: '👥'},
    {id: 'trending', title: 'Trend', icon: '📈'},
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simüle edilmiş veri yenileme
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Popüler etkinlik kartı
  const renderPopularEvent = ({item}) => (
    <TouchableOpacity style={styles.eventCard} activeOpacity={0.7}>
      {item.trending && (
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>🔥 TREND</Text>
        </View>
      )}
      <View style={styles.eventHeader}>
        <Text style={styles.eventIcon}>{item.image}</Text>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventLocation}>📍 {item.location}</Text>
          <Text style={styles.eventDateTime}>
            🗓️ {item.date} • {item.time}
          </Text>
        </View>
        <View style={styles.eventStats}>
          <Text style={styles.participants}>
            {item.participants}/{item.maxParticipants}
          </Text>
          <Text style={styles.participantsLabel}>Katılımcı</Text>
        </View>
      </View>
      <View style={styles.eventFooter}>
        <View style={styles.eventTags}>
          <Text style={styles.levelTag}>{item.level}</Text>
          <Text style={styles.priceTag}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.joinEventButton}>
          <Text style={styles.joinEventText}>Katıl</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Takım kartı
  const renderTeamCard = ({item}) => (
    <TouchableOpacity style={styles.teamCard} activeOpacity={0.7}>
      <View style={styles.teamHeader}>
        <View style={styles.teamIconContainer}>
          <Text style={styles.teamIcon}>{item.image}</Text>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{item.name}</Text>
          <Text style={styles.teamSport}>{item.sport}</Text>
          <Text style={styles.teamLocation}>📍 {item.location}</Text>
        </View>
        <View style={styles.teamStats}>
          <Text style={styles.teamMembers}>
            {item.members}/{item.maxMembers}
          </Text>
          <Text style={styles.teamMembersLabel}>Üye</Text>
        </View>
      </View>
      <Text style={styles.teamDescription}>{item.description}</Text>
      <View style={styles.teamFooter}>
        <Text style={styles.teamLevel}>{item.level}</Text>
        <TouchableOpacity style={styles.joinTeamButton}>
          <Text style={styles.joinTeamText}>Başvuru Yap</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Trend aktivite kartı
  const renderTrendingActivity = ({item}) => (
    <TouchableOpacity style={styles.trendingCard} activeOpacity={0.7}>
      <View style={styles.trendingHeader}>
        <Text style={styles.trendingIcon}>{item.image}</Text>
        <View style={styles.trendingInfo}>
          <Text style={styles.trendingTitle}>{item.title}</Text>
          <Text style={styles.trendingLocation}>📍 {item.location}</Text>
          <Text style={styles.trendingDateTime}>
            {item.date} • {item.time}
          </Text>
        </View>
        <View style={styles.growthBadge}>
          <Text style={styles.growthText}>{item.growth}</Text>
        </View>
      </View>
      <View style={styles.trendingFooter}>
        <Text style={styles.trendingParticipants}>
          {item.participants} katılımcı
        </Text>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Keşfet</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'popular':
        return (
          <FlatList
            data={popularEvents}
            renderItem={renderPopularEvent}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        );
      case 'teams':
        return (
          <FlatList
            data={recommendedTeams}
            renderItem={renderTeamCard}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        );
      case 'trending':
        return (
          <FlatList
            data={trendingActivities}
            renderItem={renderTrendingActivity}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
        <Text style={styles.headerTitle}>Keşfet</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchScreen')}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Seçiciler */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedTab === tab.id && styles.selectedTabButton,
            ]}
            onPress={() => setSelectedTab(tab.id)}>
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.id && styles.selectedTabText,
              ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* İçerik */}
      <View style={styles.content}>{renderContent()}</View>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#F5F6FA',
  },
  selectedTabButton: {
    backgroundColor: '#2E5BFF',
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  // Popüler etkinlik kartı stilleri
  eventCard: {
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
    position: 'relative',
  },
  trendingBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  trendingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  eventIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  eventDateTime: {
    fontSize: 14,
    color: '#666666',
  },
  eventStats: {
    alignItems: 'center',
  },
  participants: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  participantsLabel: {
    fontSize: 12,
    color: '#666666',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTags: {
    flexDirection: 'row',
  },
  levelTag: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  priceTag: {
    backgroundColor: '#E8F5E8',
    color: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  joinEventButton: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinEventText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Takım kartı stilleri
  teamCard: {
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
  teamHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  teamIconContainer: {
    position: 'relative',
    marginRight: 15,
  },
  teamIcon: {
    fontSize: 40,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
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
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  teamSport: {
    fontSize: 14,
    color: '#2E5BFF',
    fontWeight: '500',
    marginBottom: 3,
  },
  teamLocation: {
    fontSize: 14,
    color: '#666666',
  },
  teamStats: {
    alignItems: 'center',
  },
  teamMembers: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  teamMembersLabel: {
    fontSize: 12,
    color: '#666666',
  },
  teamDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 15,
  },
  teamFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamLevel: {
    backgroundColor: '#F3E5F5',
    color: '#9C27B0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: '500',
  },
  joinTeamButton: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinTeamText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Trend aktivite kartı stilleri
  trendingCard: {
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
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  trendingIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  trendingLocation: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  trendingDateTime: {
    fontSize: 14,
    color: '#666666',
  },
  growthBadge: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  growthText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  trendingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingParticipants: {
    fontSize: 14,
    color: '#666666',
  },
  exploreButton: {
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExploreScreen;
