/**
 * Aktivitelerim Ekranı
 * Oluşturulan takım, etkinlik, antrenman ve maçları görüntüleme
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  LinearGradient,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

// Ana renkler - Cursor kurallarına uygun şekilde
const COLORS = {
  primaryDark: '#001F30', // Ana koyu mavi renk
  primaryMedium: '#002D46', // Orta ton mavi
  primaryLight: '#003C5D', // Açık mavi ton
  primary: '#004B73', // Standart mavi
  primaryBright: '#01649A', // Parlak mavi, butonlar için
  cardBackground: '#F5F5F5', // Kart arka planı
  cardBorder: '#E5E5E5', // Kart kenarlığı
  cardShadow: 'rgba(0, 0, 0, 0.25)', // Kart gölgesi
  white: '#FFFFFF',
  background: '#F9FAFB',
  gray: '#666666',
  lightGray: '#E5E5E5',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// Modern aktivite türü renkleri ve ikonları
const ACTIVITY_TYPES = {
  team: {
    color: COLORS.primaryBright,
    gradient: ['#01649A', '#004B73'],
    icon: '👥',
    bgIcon: '🏀',
  },
  event: {
    color: COLORS.success,
    gradient: ['#10B981', '#059669'],
    icon: '🎯',
    bgIcon: '⭐',
  },
  training: {
    color: COLORS.warning,
    gradient: ['#F59E0B', '#D97706'],
    icon: '🏋️',
    bgIcon: '💪',
  },
  match: {
    color: COLORS.error,
    gradient: ['#EF4444', '#DC2626'],
    icon: '⚡',
    bgIcon: '🔥',
  },
};

const MyActivitiesScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - gerçek uygulamada API'den gelecek
  const mockData = {
    teams: [
      {
        id: '1',
        type: 'team',
        title: 'Golden State Warriors',
        description:
          'Profesyonel basketbol takımı - Haftalık antrenmanlar ve turnuvalar',
        date: '15 Mart 2024',
        participants: 12,
        maxParticipants: 15,
        level: 'İleri',
        status: 'active',
        location: 'Beşiktaş Spor Salonu',
        category: 'Profesyonel',
      },
      {
        id: '2',
        type: 'team',
        title: 'Street Ballers',
        description:
          'Sokak basketbolu severleri - Eğlenceli ortam ve dostluk maçları',
        date: '10 Mart 2024',
        participants: 8,
        maxParticipants: 12,
        level: 'Amatör',
        status: 'active',
        location: 'Kadıköy Sahil',
        category: 'Rekreasyonel',
      },
    ],
    events: [
      {
        id: '3',
        type: 'event',
        title: '3v3 Basketbol Turnuvası',
        description: 'Üç kişilik takımlarla hızlı tempolu basketbol turnuvası',
        date: '18 Mart 2024',
        time: '19:00',
        participants: 24,
        maxParticipants: 32,
        level: 'Amatör',
        status: 'upcoming',
        location: 'Fenerbahçe Ülker Arena',
        category: 'Turnuva',
      },
      {
        id: '4',
        type: 'event',
        title: 'Beceri Geliştirme Kampı',
        description: 'Profesyonel antrenörlerle özel yetenekler geliştirme',
        date: '20 Mart 2024',
        time: '15:00',
        participants: 18,
        maxParticipants: 25,
        level: 'İleri',
        status: 'upcoming',
        location: 'Akatlar Spor Kompleksi',
        category: 'Eğitim',
      },
    ],
    trainings: [
      {
        id: '5',
        type: 'training',
        title: 'Temel Basket Becerisi',
        description: 'Dribbling, şut teknikleri ve oyun kuralları eğitimi',
        date: '22 Mart 2024',
        time: '18:00',
        participants: 8,
        maxParticipants: 12,
        level: 'Başlangıç',
        status: 'upcoming',
        location: 'Zorlu Center Spor',
        category: 'Teknik',
      },
      {
        id: '6',
        type: 'training',
        title: 'Kondisyon & Fitness',
        description: 'Basketbol odaklı fiziksel hazırlık ve dayanıklılık',
        date: '25 Mart 2024',
        time: '17:00',
        participants: 12,
        maxParticipants: 15,
        level: 'Orta',
        status: 'upcoming',
        location: 'Nişantaşı Fitness',
        category: 'Kondisyon',
      },
    ],
    matches: [
      {
        id: '7',
        type: 'match',
        title: 'Gece Basketbol Ligi',
        description: 'Profesyonel seviye dostluk maçı - 5v5 tam saha',
        date: '30 Mart 2024',
        time: '20:00',
        participants: 10,
        maxParticipants: 10,
        level: 'İleri',
        status: 'upcoming',
        location: 'Etiler Spor Kulübü',
        category: 'Liga',
      },
    ],
  };

  const tabs = [
    {id: 'all', title: 'Tümü', count: getAllCount()},
    {id: 'teams', title: 'Takım', count: mockData.teams.length},
    {id: 'events', title: 'Etkinlik', count: mockData.events.length},
    {id: 'trainings', title: 'Antrenman', count: mockData.trainings.length},
    {id: 'matches', title: 'Maç', count: mockData.matches.length},
  ];

  function getAllCount() {
    return (
      mockData.teams.length +
      mockData.events.length +
      mockData.trainings.length +
      mockData.matches.length
    );
  }

  const getFilteredData = () => {
    switch (activeTab) {
      case 'teams':
        return mockData.teams;
      case 'events':
        return mockData.events;
      case 'trainings':
        return mockData.trainings;
      case 'matches':
        return mockData.matches;
      default:
        return [
          ...mockData.teams,
          ...mockData.events,
          ...mockData.trainings,
          ...mockData.matches,
        ].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'upcoming':
        return '#FF9800';
      case 'completed':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'upcoming':
        return 'Yaklaşan';
      case 'completed':
        return 'Tamamlandı';
      default:
        return 'Bilinmiyor';
    }
  };

  const getTypeText = type => {
    switch (type) {
      case 'team':
        return 'Takım';
      case 'event':
        return 'Etkinlik';
      case 'training':
        return 'Antrenman';
      case 'match':
        return 'Maç';
      default:
        return 'Diğer';
    }
  };

  const handleItemPress = item => {
    // Item detay ekranına navigate
    console.log('Item pressed:', item);
  };

  const renderActivityCard = ({item}) => {
    const activityType = ACTIVITY_TYPES[item.type];

    return (
      <TouchableOpacity
        style={styles.activityCard}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.8}>
        {/* Gradyen Header */}
        <View style={styles.cardGradientHeader}>
          <View style={styles.cardGradientContent}>
            {/* Sol taraf - Ana bilgiler */}
            <View style={styles.cardHeaderLeft}>
              <View
                style={[
                  styles.iconContainer,
                  {backgroundColor: activityType.color},
                ]}>
                <Text style={styles.cardIcon}>{activityType.icon}</Text>
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.categoryRow}>
                  <Text style={styles.cardType}>{getTypeText(item.type)}</Text>
                  <Text style={styles.cardCategory}>• {item.category}</Text>
                </View>
              </View>
            </View>

            {/* Sağ taraf - Durum badge */}
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: getStatusColor(item.status)},
              ]}>
              <Text style={styles.statusText}>
                {getStatusText(item.status)}
              </Text>
            </View>
          </View>
        </View>

        {/* İçerik Alanı */}
        <View style={styles.cardContent}>
          {/* Açıklama */}
          <Text style={styles.cardDescription}>{item.description}</Text>

          {/* Lokasyon */}
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>

          {/* Tarih ve Saat Bilgileri */}
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeItem}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>📅</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>Tarih</Text>
                <Text style={styles.infoValue}>{item.date}</Text>
              </View>
            </View>

            {item.time && (
              <View style={styles.dateTimeItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>🕐</Text>
                </View>
                <View>
                  <Text style={styles.infoLabel}>Saat</Text>
                  <Text style={styles.infoValue}>{item.time}</Text>
                </View>
              </View>
            )}
          </View>

          {/* İstatistik ve Progress Bar */}
          <View style={styles.statsSection}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{item.participants}</Text>
                <Text style={styles.statLabel}>Katılımcı</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{item.maxParticipants}</Text>
                <Text style={styles.statLabel}>Maksimum</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{item.level}</Text>
                <Text style={styles.statLabel}>Seviye</Text>
              </View>
            </View>

            {/* Modern Progress Bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Doluluk Oranı</Text>
                <Text style={styles.progressPercentage}>
                  %
                  {Math.round((item.participants / item.maxParticipants) * 100)}
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${
                        (item.participants / item.maxParticipants) * 100
                      }%`,
                      backgroundColor: activityType.color,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktivitelerim</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScrollView}
        contentContainerStyle={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}>
              {tab.title}
            </Text>
            <View
              style={[
                styles.tabBadge,
                activeTab === tab.id && styles.activeTabBadge,
              ]}>
              <Text
                style={[
                  styles.tabBadgeText,
                  activeTab === tab.id && styles.activeTabBadgeText,
                ]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <FlatList
        data={getFilteredData()}
        renderItem={renderActivityCard}
        keyExtractor={item => item.id}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>Henüz aktivite yok</Text>
            <Text style={styles.emptyText}>
              Yeni takım, etkinlik, antrenman veya maç oluşturmaya başlayın
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 24,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  tabsScrollView: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    maxHeight: 50,
  },
  tabsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: COLORS.cardBackground,
    gap: 5,
    marginRight: 6,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    height: 32,
  },
  activeTab: {
    backgroundColor: COLORS.primaryBright,
    shadowColor: COLORS.primaryBright,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.white,
  },
  tabBadge: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  activeTabBadgeText: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    marginTop: 0,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  cardGradientHeader: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGradientContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    zIndex: 1,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  cardType: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: 14,
    color: COLORS.primaryBright,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cardContent: {
    padding: 20,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
    lineHeight: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.primaryDark,
    fontWeight: '500',
    flex: 1,
  },
  dateTimeRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  infoIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryBright,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoIcon: {
    fontSize: 14,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  statsSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryBright,
  },
  progressTrack: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
});

export default MyActivitiesScreen;
