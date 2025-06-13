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
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const SocialFeedScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    // Örnek sosyal feed verileri
    const mockFeedPosts = [
      {
        id: 1,
        user: {
          name: 'Ahmet Yılmaz',
          avatar: '👨‍💼',
          verified: true,
        },
        timestamp: '2 saat önce',
        type: 'match_result',
        content:
          'Harika bir basketbol maçıydı! Rakip takımla 65-62 kazandık 🏀',
        match: {
          homeTeam: 'Thunder',
          awayTeam: 'Lightning',
          homeScore: 65,
          awayScore: 62,
          sport: 'Basketbol',
        },
        likes: 24,
        comments: 8,
        liked: false,
        location: 'Beşiktaş Spor Salonu',
      },
      {
        id: 2,
        user: {
          name: 'Zeynep Kaya',
          avatar: '👩‍💼',
          verified: false,
        },
        timestamp: '4 saat önce',
        type: 'training_completed',
        content:
          'Bugünkü CrossFit antrenmanı bitirdi! 💪 Kim bu akşam koşu için katılmak ister?',
        training: {
          type: 'CrossFit',
          duration: '45 dk',
          calories: 380,
        },
        likes: 15,
        comments: 5,
        liked: true,
        location: 'Fit Zone Gym',
      },
      {
        id: 3,
        user: {
          name: 'Mehmet Özkan',
          avatar: '👨‍🦱',
          verified: true,
        },
        timestamp: '6 saat önce',
        type: 'team_join',
        content: 'Phoenix FC takımına katıldım! Yeni sezona hazırız ⚽',
        team: {
          name: 'Phoenix FC',
          sport: 'Futbol',
          members: 23,
        },
        likes: 31,
        comments: 12,
        liked: false,
        location: 'Şişli',
      },
      {
        id: 4,
        user: {
          name: 'Ayşe Demir',
          avatar: '👩‍🦰',
          verified: false,
        },
        timestamp: '8 saat önce',
        type: 'event_created',
        content:
          'Cumartesi günü için tenis turnuvası düzenliyorum! Kim katılmak ister? 🎾',
        event: {
          title: 'Haftalık Tenis Turnuvası',
          date: '20 Oca',
          time: '14:00',
          participants: 8,
          maxParticipants: 16,
        },
        likes: 18,
        comments: 6,
        liked: true,
        location: 'Fenerbahçe Tenis Kulübü',
      },
      {
        id: 5,
        user: {
          name: 'Can Şener',
          avatar: '👨‍🎓',
          verified: false,
        },
        timestamp: '1 gün önce',
        type: 'achievement',
        content:
          'İlk maratomumu tamamladım! 42.2 km 3:45:30 ⏰ Teşekkürler destek için!',
        achievement: {
          type: 'Marathon',
          time: '3:45:30',
          distance: '42.2 km',
          pace: '5:20/km',
        },
        likes: 87,
        comments: 23,
        liked: false,
        location: 'İstanbul Maratonu',
      },
    ];

    setFeedPosts(mockFeedPosts);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simüle edilmiş veri yenileme
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleLike = postId => {
    setFeedPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  const handleCreatePost = () => {
    if (newPostText.trim()) {
      const newPost = {
        id: Date.now(),
        user: {
          name: 'Sen',
          avatar: '👤',
          verified: false,
        },
        timestamp: 'şimdi',
        type: 'general',
        content: newPostText,
        likes: 0,
        comments: 0,
        liked: false,
        location: 'İstanbul',
      };

      setFeedPosts(prevPosts => [newPost, ...prevPosts]);
      setNewPostText('');
      setShowCreatePost(false);
    }
  };

  // Post türüne göre özel içerik
  const renderPostContent = post => {
    switch (post.type) {
      case 'match_result':
        return (
          <View style={styles.matchResultContainer}>
            <View style={styles.matchHeader}>
              <Text style={styles.matchTitle}>Maç Sonucu</Text>
              <Text style={styles.matchSport}>{post.match.sport}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <View style={styles.teamScore}>
                <Text style={styles.teamName}>{post.match.homeTeam}</Text>
                <Text style={styles.score}>{post.match.homeScore}</Text>
              </View>
              <Text style={styles.vs}>VS</Text>
              <View style={styles.teamScore}>
                <Text style={styles.teamName}>{post.match.awayTeam}</Text>
                <Text style={styles.score}>{post.match.awayScore}</Text>
              </View>
            </View>
          </View>
        );

      case 'training_completed':
        return (
          <View style={styles.trainingContainer}>
            <View style={styles.trainingHeader}>
              <Text style={styles.trainingType}>{post.training.type}</Text>
              <Text style={styles.trainingDuration}>
                {post.training.duration}
              </Text>
            </View>
            <Text style={styles.trainingStats}>
              🔥 {post.training.calories} kalori yakıldı
            </Text>
          </View>
        );

      case 'team_join':
        return (
          <View style={styles.teamJoinContainer}>
            <Text style={styles.teamJoinTitle}>Takıma Katıldı</Text>
            <View style={styles.teamInfoRow}>
              <Text style={styles.teamJoinName}>{post.team.name}</Text>
              <Text style={styles.teamJoinSport}>{post.team.sport}</Text>
            </View>
            <Text style={styles.teamJoinMembers}>
              👥 {post.team.members} üye
            </Text>
          </View>
        );

      case 'event_created':
        return (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{post.event.title}</Text>
            <Text style={styles.eventDateTime}>
              📅 {post.event.date} • {post.event.time}
            </Text>
            <Text style={styles.eventParticipants}>
              👥 {post.event.participants}/{post.event.maxParticipants}{' '}
              katılımcı
            </Text>
            <TouchableOpacity style={styles.joinEventBtn}>
              <Text style={styles.joinEventBtnText}>Katıl</Text>
            </TouchableOpacity>
          </View>
        );

      case 'achievement':
        return (
          <View style={styles.achievementContainer}>
            <View style={styles.achievementHeader}>
              <Text style={styles.achievementType}>
                {post.achievement.type}
              </Text>
              <Text style={styles.achievementBadge}>🏆</Text>
            </View>
            <View style={styles.achievementStats}>
              <View style={styles.achievementStat}>
                <Text style={styles.achievementStatLabel}>Süre</Text>
                <Text style={styles.achievementStatValue}>
                  {post.achievement.time}
                </Text>
              </View>
              <View style={styles.achievementStat}>
                <Text style={styles.achievementStatLabel}>Mesafe</Text>
                <Text style={styles.achievementStatValue}>
                  {post.achievement.distance}
                </Text>
              </View>
              <View style={styles.achievementStat}>
                <Text style={styles.achievementStatLabel}>Tempo</Text>
                <Text style={styles.achievementStatValue}>
                  {post.achievement.pace}
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  // Feed post kartı
  const renderFeedPost = ({item}) => (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userAvatar}>{item.user.avatar}</Text>
          <View style={styles.userDetails}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{item.user.name}</Text>
              {item.user.verified && <Text style={styles.verifiedIcon}>✓</Text>}
            </View>
            <Text style={styles.postTimestamp}>{item.timestamp}</Text>
            <Text style={styles.postLocation}>📍 {item.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.postMenu}>
          <Text style={styles.postMenuIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Özel İçerik */}
      {renderPostContent(item)}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}>
          <Text style={[styles.actionIcon, item.liked && styles.likedIcon]}>
            {item.liked ? '❤️' : '🤍'}
          </Text>
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Paylaş</Text>
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Sosyal</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreatePost(true)}>
          <Text style={styles.createButtonText}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={feedPosts}
        renderItem={renderFeedPost}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.feedContainer}
      />

      {/* Create Post Modal */}
      <Modal
        visible={showCreatePost}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCreatePost(false)}>
              <Text style={styles.modalCancelText}>İptal</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Yeni Gönderi</Text>
            <TouchableOpacity onPress={handleCreatePost}>
              <Text style={styles.modalShareText}>Paylaş</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.createPostUser}>
              <Text style={styles.createPostAvatar}>👤</Text>
              <Text style={styles.createPostName}>Sen</Text>
            </View>

            <TextInput
              style={styles.createPostInput}
              placeholder="Ne yapmak istiyorsun? Aktiviteni paylaş..."
              multiline
              value={newPostText}
              onChangeText={setNewPostText}
              autoFocus
            />

            <View style={styles.createPostOptions}>
              <TouchableOpacity style={styles.createPostOption}>
                <Text style={styles.createPostOptionIcon}>📷</Text>
                <Text style={styles.createPostOptionText}>Fotoğraf</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createPostOption}>
                <Text style={styles.createPostOptionIcon}>📍</Text>
                <Text style={styles.createPostOptionText}>Konum</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createPostOption}>
                <Text style={styles.createPostOptionIcon}>🏃‍♂️</Text>
                <Text style={styles.createPostOptionText}>Aktivite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
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
  createButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 20,
  },
  feedContainer: {
    padding: 10,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  userAvatar: {
    fontSize: 40,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 5,
  },
  verifiedIcon: {
    fontSize: 14,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  postTimestamp: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  postLocation: {
    fontSize: 13,
    color: '#666666',
  },
  postMenu: {
    padding: 5,
  },
  postMenuIcon: {
    fontSize: 20,
    color: '#666666',
  },
  postContent: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
    marginBottom: 15,
  },
  // Maç sonucu stilleri
  matchResultContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  matchSport: {
    fontSize: 12,
    color: '#666666',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  teamScore: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  vs: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'bold',
  },
  // Antrenman stilleri
  trainingContainer: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trainingType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  trainingDuration: {
    fontSize: 14,
    color: '#666666',
  },
  trainingStats: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  // Takım katılımı stilleri
  teamJoinContainer: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  teamJoinTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 8,
  },
  teamInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  teamJoinName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  teamJoinSport: {
    fontSize: 14,
    color: '#666666',
  },
  teamJoinMembers: {
    fontSize: 14,
    color: '#9C27B0',
  },
  // Etkinlik stilleri
  eventContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  eventDateTime: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  eventParticipants: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  joinEventBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  joinEventBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Başarı stilleri
  achievementContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  achievementBadge: {
    fontSize: 24,
  },
  achievementStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementStat: {
    alignItems: 'center',
  },
  achievementStatLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 3,
  },
  achievementStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  // Post aksiyonları
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  likedIcon: {
    color: '#FF6B35',
  },
  actionText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  // Modal stilleri
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalShareText: {
    fontSize: 16,
    color: '#2E5BFF',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  createPostUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  createPostAvatar: {
    fontSize: 40,
    marginRight: 12,
  },
  createPostName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  createPostInput: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  createPostOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  createPostOption: {
    alignItems: 'center',
    padding: 15,
  },
  createPostOptionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  createPostOptionText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default SocialFeedScreen;
