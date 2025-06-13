/**
 * Spor Haberleri Ekranı
 * Basketbol ve spor dünyasından güncel haberler
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
  Image,
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

const SportsNewsScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('latest');

  // Mock haber verisi
  const mockNews = {
    latest: [
      {
        id: '1',
        title: "NBA'da Yılın Transferi Gerçekleşti",
        summary:
          'Los Angeles Lakers, yıldız oyuncu ile 4 yıllık anlaşma imzaladı. Transfer piyasasının en büyük bombası patladı.',
        category: 'NBA',
        readTime: '3 dk',
        timestamp: '2 saat önce',
        image: '🏀',
        isBreaking: true,
      },
      {
        id: '2',
        title: 'EuroLeague Final Four Programı Açıklandı',
        summary:
          'Avrupa basketbolunun en prestijli turnuvasının final etabı için program belli oldu. Türk takımları da yarı finale kaldı.',
        category: 'EuroLeague',
        readTime: '5 dk',
        timestamp: '4 saat önce',
        image: '🏆',
        isBreaking: false,
      },
      {
        id: '3',
        title: 'Basketbol Federasyonu Yeni Kuralları Açıkladı',
        summary:
          'A Milli Takım için yeni seçim kriterleri ve oyuncu performans değerlendirmeleri güncellenecek.',
        category: 'Federasyon',
        readTime: '2 dk',
        timestamp: '6 saat önce',
        image: '📋',
        isBreaking: false,
      },
      {
        id: '4',
        title: "Genç Yetenek NBA Draft'ına Hazırlanıyor",
        summary:
          "Türk basketbolunun genç yıldızı, NBA Draft için Amerika'da çalışmalarını sürdürüyor.",
        category: 'Gençlik',
        readTime: '4 dk',
        timestamp: '8 saat önce',
        image: '⭐',
        isBreaking: false,
      },
    ],
    turkish: [
      {
        id: '5',
        title: 'BSL Playoff Yarı Final Eşleşmeleri Belli Oldu',
        summary:
          "Basketbol Süper Ligi'nde playoff heyecanı devam ediyor. Yarı final maçları bu hafta sonu başlayacak.",
        category: 'BSL',
        readTime: '3 dk',
        timestamp: '1 saat önce',
        image: '🇹🇷',
        isBreaking: false,
      },
      {
        id: '6',
        title: "Anadolu Efes EuroLeague'de Finale Yükseldi",
        summary:
          'Mavi-beyazlı takım, yarı final serisini 3-1 kazanarak finale yükselmeyi başardı.',
        category: 'Anadolu Efes',
        readTime: '4 dk',
        timestamp: '12 saat önce',
        image: '🔵',
        isBreaking: true,
      },
    ],
    international: [
      {
        id: '7',
        title: 'FIBA Dünya Kupası Hazırlıkları Başladı',
        summary:
          'Milli takımlar kamp programlarını açıkladı. Türkiye A Milli Takımı da hazırlıklara başlıyor.',
        category: 'FIBA',
        readTime: '6 dk',
        timestamp: '5 saat önce',
        image: '🌍',
        isBreaking: false,
      },
    ],
  };

  const tabs = [
    {id: 'latest', title: 'En Son', icon: '🔥'},
    {id: 'turkish', title: 'Türkiye', icon: '🇹🇷'},
    {id: 'international', title: 'Dünya', icon: '🌍'},
  ];

  const getFilteredNews = () => {
    return mockNews[activeTab] || [];
  };

  const handleNewsPress = newsItem => {
    // Haber detay ekranına navigate
    console.log('Haber açıldı:', newsItem);
  };

  const renderNewsCard = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.newsCard}
        onPress={() => handleNewsPress(item)}
        activeOpacity={0.8}>
        {/* Breaking News Badge */}
        {item.isBreaking && (
          <View style={styles.breakingBadge}>
            <Text style={styles.breakingText}>🔴 CANLI</Text>
          </View>
        )}

        {/* Ana İçerik */}
        <View style={styles.newsContent}>
          {/* Üst Bilgiler */}
          <View style={styles.newsHeader}>
            <View style={styles.categoryContainer}>
              <Text style={styles.newsImage}>{item.image}</Text>
              <Text style={styles.newsCategory}>{item.category}</Text>
            </View>
            <Text style={styles.newsTimestamp}>{item.timestamp}</Text>
          </View>

          {/* Başlık */}
          <Text style={styles.newsTitle}>{item.title}</Text>

          {/* Özet */}
          <Text style={styles.newsSummary}>{item.summary}</Text>

          {/* Alt Bilgiler */}
          <View style={styles.newsFooter}>
            <View style={styles.readTimeContainer}>
              <Text style={styles.readTimeIcon}>📖</Text>
              <Text style={styles.readTime}>{item.readTime} okuma</Text>
            </View>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareIcon}>↗️</Text>
              <Text style={styles.shareText}>Paylaş</Text>
            </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Spor Haberleri</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
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
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Haberler Listesi */}
      <FlatList
        data={getFilteredNews()}
        renderItem={renderNewsCard}
        keyExtractor={item => item.id}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📰</Text>
            <Text style={styles.emptyTitle}>Henüz haber yok</Text>
            <Text style={styles.emptyText}>
              Bu kategoride gösterilecek haber bulunmuyor
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
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  tabsScrollView: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    marginBottom: 0,
    paddingVertical: 0,
    maxHeight: 40,
    // backgroundColor: 'red', // Geçici debug rengi
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 0,
    gap: 15,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 32,
    borderRadius: 14,
    backgroundColor: COLORS.cardBackground,
    gap: 6,
  },
  activeTab: {
    backgroundColor: COLORS.primaryBright,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    marginTop: 0,
    // backgroundColor: 'blue', // Geçici debug rengi
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,
    gap: 16,
  },
  newsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  breakingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  breakingText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  newsContent: {
    padding: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  newsImage: {
    fontSize: 20,
  },
  newsCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryBright,
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newsTimestamp: {
    fontSize: 12,
    color: COLORS.gray,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSummary: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: 12,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readTimeIcon: {
    fontSize: 14,
  },
  readTime: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
  },
  shareIcon: {
    fontSize: 12,
  },
  shareText: {
    fontSize: 12,
    color: COLORS.primaryBright,
    fontWeight: '600',
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

export default SportsNewsScreen;
