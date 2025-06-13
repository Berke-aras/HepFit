import React, {useState, useEffect} from 'react';
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

const FriendActivityFeedScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [friendActivities, setFriendActivities] = useState([]);

  useEffect(() => {
    // Mock arkadaş aktiviteleri
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simüle edilmiş veri yenileme
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleLike = activityId => {
    setFriendActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? {
              ...activity,
              liked: !activity.liked,
              likes: activity.liked ? activity.likes - 1 : activity.likes + 1,
            }
          : activity,
      ),
    );
  };

  const getActivityColor = type => {
    switch (type) {
      case 'match_win':
        return '#4CAF50';
      case 'training_completed':
        return '#2196F3';
      case 'team_joined':
        return '#9C27B0';
      case 'achievement':
        return '#FF6B35';
      case 'event_created':
        return '#FF9800';
      default:
        return '#666666';
    }
  };

  const renderActivity = ({item}) => (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() =>
            navigation.navigate('UserProfileScreen', {userId: item.user.id})
          }>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{item.user.avatar}</Text>
            {item.user.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityContent}>
        <View style={styles.activityMain}>
          <View
            style={[
              styles.activityIconContainer,
              {backgroundColor: getActivityColor(item.type)},
            ]}>
            <Text style={styles.activityIcon}>{item.icon}</Text>
          </View>
          <View style={styles.activityText}>
            <Text style={styles.activityDescription}>
              <Text style={styles.userName}>{item.user.name}</Text>
              <Text style={styles.activityAction}> {item.activity}</Text>
            </Text>
            <Text style={styles.activityDetails}>{item.details}</Text>
          </View>
        </View>
      </View>

      <View style={styles.activityFooter}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}>
          <Text style={[styles.actionIcon, item.liked && styles.liked]}>
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

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() =>
            navigation.navigate('ChatScreen', {
              userId: item.user.id,
              userName: item.user.name,
              userAvatar: item.user.avatar,
            })
          }>
          <Text style={styles.messageIcon}>💌</Text>
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
        <Text style={styles.headerTitle}>Arkadaş Aktiviteleri</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('FriendsScreen')}>
          <Text style={styles.filterButtonText}>👥</Text>
        </TouchableOpacity>
      </View>

      {/* Aktivite Akışı */}
      {friendActivities.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🤝</Text>
          <Text style={styles.emptyStateTitle}>Arkadaş Aktivitesi Yok</Text>
          <Text style={styles.emptyStateSubtitle}>
            Arkadaşlarınızın aktivitelerini görmek için daha fazla kişi takip
            edin
          </Text>
          <TouchableOpacity
            style={styles.addFriendsButton}
            onPress={() => navigation.navigate('PlayerSearchScreen')}>
            <Text style={styles.addFriendsButtonText}>Arkadaş Ara</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={friendActivities}
          renderItem={renderActivity}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.feedContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 20,
  },
  feedContainer: {
    padding: 10,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 40,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 14,
    color: '#666666',
  },
  menuButton: {
    padding: 5,
  },
  menuButtonText: {
    fontSize: 20,
    color: '#666666',
  },
  activityContent: {
    marginBottom: 15,
  },
  activityMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityText: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  activityAction: {
    color: '#333333',
  },
  activityDetails: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  activityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  liked: {
    // Beğenilmiş durumu için özel stil
  },
  actionText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  messageButton: {
    padding: 8,
  },
  messageIcon: {
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
    marginBottom: 30,
  },
  addFriendsButton: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  addFriendsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendActivityFeedScreen;
