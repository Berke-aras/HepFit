import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mesaj konuşmaları
  const conversations = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      avatar: '👨‍💼',
      lastMessage: 'Yarın basketbol maçı için hazır mısın?',
      timestamp: '14:30',
      unreadCount: 2,
      isOnline: true,
      verified: true,
    },
    {
      id: 2,
      name: 'Takım Phoenix FC',
      avatar: '⚽',
      lastMessage: 'Bu hafta antrenman programı güncellendi',
      timestamp: '12:15',
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      avatar: '👩‍💻',
      lastMessage: "Tenis kortunu ayırdım, 16:00'da görüşürüz",
      timestamp: 'Dün',
      unreadCount: 1,
      isOnline: false,
      verified: false,
    },
    {
      id: 4,
      name: 'Voleybol Grubu',
      avatar: '🏐',
      lastMessage: 'Can: Harika maçtı arkadaşlar!',
      timestamp: 'Dün',
      unreadCount: 5,
      isOnline: false,
      isGroup: true,
    },
    {
      id: 5,
      name: 'Mehmet Kaya',
      avatar: '🏃‍♂️',
      lastMessage: 'Koşu rotası için önerilerin var mı?',
      timestamp: '2 gün önce',
      unreadCount: 0,
      isOnline: true,
      verified: true,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Konuşma kartı
  const renderConversationCard = ({item}) => (
    <TouchableOpacity
      style={styles.conversationCard}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          userId: item.id,
          userName: item.name,
          userAvatar: item.avatar,
          isGroup: item.isGroup,
        })
      }
      activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        {item.isOnline && !item.isGroup && (
          <View style={styles.onlineIndicator} />
        )}
        {item.verified && !item.isGroup && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.messagePreview}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
        <Text style={styles.headerTitle}>Mesajlar</Text>
        <TouchableOpacity
          style={styles.newMessageButton}
          onPress={() => navigation.navigate('PlayerSearchScreen')}>
          <Text style={styles.newMessageButtonText}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Mesajlarda ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Hızlı Erişim */}
      <View style={styles.quickAccessContainer}>
        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => navigation.navigate('FriendsScreen')}>
          <Text style={styles.quickAccessIcon}>👥</Text>
          <Text style={styles.quickAccessText}>Arkadaşlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => navigation.navigate('PlayerSearchScreen')}>
          <Text style={styles.quickAccessIcon}>🔍</Text>
          <Text style={styles.quickAccessText}>Oyuncu Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessButton}>
          <Text style={styles.quickAccessIcon}>📱</Text>
          <Text style={styles.quickAccessText}>Grup Oluştur</Text>
        </TouchableOpacity>
      </View>

      {/* Konuşmalar */}
      {filteredConversations.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>💬</Text>
          <Text style={styles.emptyStateTitle}>
            {searchQuery ? 'Sonuç Bulunamadı' : 'Henüz Mesaj Yok'}
          </Text>
          <Text style={styles.emptyStateSubtitle}>
            {searchQuery
              ? 'Aradığınız isimde konuşma bulunamadı'
              : 'Yeni arkadaşlar ekleyerek mesajlaşmaya başlayın'}
          </Text>
          {!searchQuery && (
            <TouchableOpacity
              style={styles.startChattingButton}
              onPress={() => navigation.navigate('PlayerSearchScreen')}>
              <Text style={styles.startChattingButtonText}>
                Oyuncu Aramaya Başla
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredConversations}
          renderItem={renderConversationCard}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.conversationsList}
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
  newMessageButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newMessageButtonText: {
    fontSize: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    height: 45,
    backgroundColor: '#F5F6FA',
    borderRadius: 22,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  quickAccessButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  quickAccessIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  quickAccessText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  conversationsList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  conversationCard: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
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
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  timestamp: {
    fontSize: 14,
    color: '#666666',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#2E5BFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  startChattingButton: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startChattingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MessagesScreen;
