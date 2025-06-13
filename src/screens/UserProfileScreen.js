import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userId} = route.params;

  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  // Kullanıcı bilgileri (normalde API'den gelecek)
  const userProfile = {
    id: userId,
    name: 'Ahmet Yılmaz',
    username: '@ahmetyilmaz',
    avatar: '👨‍💼',
    bio: 'Spor tutkunu, basketbol ve futbol oyuncusu. Her hafta aktif antrenman yapıyorum.',
    location: 'İstanbul, Kadıköy',
    joinDate: 'Mayıs 2023',
    verified: true,
    stats: {
      followers: 245,
      following: 180,
      posts: 89,
      matches: 156,
    },
    sports: ['Basketbol', 'Futbol', 'Tenis'],
    level: 'İleri',
    achievements: [
      'Basketbol Turnuvası Şampiyonu',
      '100 Maç Tamamladı',
      'Aktif Oyuncu',
    ],
  };

  // Son aktiviteler
  const recentActivities = [
    {
      id: 1,
      type: 'match',
      title: 'Basketbol Maçı',
      result: 'Kazandı',
      score: '85-72',
      date: '2 gün önce',
      icon: '🏀',
    },
    {
      id: 2,
      type: 'training',
      title: 'Futbol Antrenmanı',
      duration: '2 saat',
      date: '1 hafta önce',
      icon: '⚽',
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Yeni Başarı',
      description: '100 Maç Tamamladı',
      date: '2 hafta önce',
      icon: '🏆',
    },
  ];

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleFriendToggle = () => {
    setIsFriend(!isFriend);
  };

  const renderActivity = ({item}) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityIcon}>{item.icon}</Text>
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        {item.result && (
          <Text style={styles.activityResult}>
            {item.result} • {item.score}
          </Text>
        )}
        {item.duration && (
          <Text style={styles.activityDuration}>{item.duration}</Text>
        )}
        {item.description && (
          <Text style={styles.activityDescription}>{item.description}</Text>
        )}
        <Text style={styles.activityDate}>{item.date}</Text>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profil Bilgileri */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{userProfile.avatar}</Text>
            {userProfile.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>

          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.username}>{userProfile.username}</Text>
          <Text style={styles.bio}>{userProfile.bio}</Text>

          <View style={styles.locationInfo}>
            <Text style={styles.location}>📍 {userProfile.location}</Text>
            <Text style={styles.joinDate}>
              📅 {userProfile.joinDate} tarihinde katıldı
            </Text>
          </View>

          {/* İstatistikler */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userProfile.stats.followers}
              </Text>
              <Text style={styles.statLabel}>Takipçi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userProfile.stats.following}
              </Text>
              <Text style={styles.statLabel}>Takip</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.stats.posts}</Text>
              <Text style={styles.statLabel}>Gönderi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.stats.matches}</Text>
              <Text style={styles.statLabel}>Maç</Text>
            </View>
          </View>

          {/* Aksiyon Butonları */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollowToggle}>
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}>
                {isFollowing ? 'Takipte' : 'Takip Et'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.friendButton,
                isFriend && styles.friendButtonActive,
              ]}
              onPress={handleFriendToggle}>
              <Text
                style={[
                  styles.friendButtonText,
                  isFriend && styles.friendButtonActiveText,
                ]}>
                {isFriend ? 'Arkadaş' : 'Arkadaş Ekle'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.messageButton}
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  userId: userProfile.id,
                  userName: userProfile.name,
                  userAvatar: userProfile.avatar,
                })
              }>
              <Text style={styles.messageButtonText}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spor Dalları */}
        <View style={styles.sportsSection}>
          <Text style={styles.sectionTitle}>Spor Dalları</Text>
          <View style={styles.sportsContainer}>
            {userProfile.sports.map((sport, index) => (
              <View key={index} style={styles.sportTag}>
                <Text style={styles.sportText}>{sport}</Text>
              </View>
            ))}
            <View style={styles.levelTag}>
              <Text style={styles.levelText}>{userProfile.level}</Text>
            </View>
          </View>
        </View>

        {/* Başarılar */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Başarılar</Text>
          <View style={styles.achievementsContainer}>
            {userProfile.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>🏆</Text>
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Son Aktiviteler */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <FlatList
            data={recentActivities}
            renderItem={renderActivity}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
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
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 20,
    color: '#666666',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 80,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 15,
  },
  locationInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5BFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  followButton: {
    flex: 1,
    backgroundColor: '#2E5BFF',
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 8,
  },
  followingButton: {
    backgroundColor: '#F0F0F0',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  followingButtonText: {
    color: '#666666',
  },
  friendButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  friendButtonActive: {
    backgroundColor: '#4CAF50',
  },
  friendButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  friendButtonActiveText: {
    color: '#FFFFFF',
  },
  messageButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2E5BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageButtonText: {
    fontSize: 20,
  },
  sportsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  sportText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  levelTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  achievementsContainer: {
    // Stil tanımları
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementText: {
    fontSize: 16,
    color: '#F57C00',
    fontWeight: '500',
  },
  activitiesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  activityIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  activityResult: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 3,
  },
  activityDuration: {
    fontSize: 14,
    color: '#2E5BFF',
    marginBottom: 3,
  },
  activityDescription: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
    marginBottom: 3,
  },
  activityDate: {
    fontSize: 12,
    color: '#666666',
  },
});

export default UserProfileScreen;
