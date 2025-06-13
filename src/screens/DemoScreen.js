import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DemoScreen = () => {
  const navigation = useNavigation();

  const features = [
    {
      id: 'search',
      title: 'Gelişmiş Arama',
      description:
        'Yakındaki aktiviteler, seviye bazlı filtreleme, konum bazlı arama',
      icon: '🔍',
      color: '#FF9800',
      screen: 'SearchScreen',
      features: [
        '• Maç, antrenman, takım arama',
        '• Seviye bazlı filtreleme',
        '• Konum bazlı arama',
        '• Son aramalar',
        '• Kategori filtreleri',
      ],
    },
    {
      id: 'explore',
      title: 'Keşif Ekranı',
      description: 'Popüler etkinlikler, önerilen takımlar, trend aktiviteler',
      icon: '🌟',
      color: '#E91E63',
      screen: 'ExploreScreen',
      features: [
        '• Popüler etkinlikler',
        '• Önerilen takımlar',
        '• Trend olan aktiviteler',
        '• Doğrulanmış takımlar',
        '• Büyüme istatistikleri',
      ],
    },
    {
      id: 'social',
      title: 'Sosyal Feed',
      description: 'Aktivite paylaşımları ve sosyal etkileşim',
      icon: '📱',
      color: '#3F51B5',
      screen: 'SocialFeedScreen',
      features: ['Aktivite paylaşımı', 'Beğeni ve yorum', 'Gönderi oluşturma'],
    },
    {
      id: 5,
      title: 'Oyuncu Arama',
      description: 'Sporcular ve takım arkadaşları bul',
      icon: '👥',
      color: '#9C27B0',
      screen: 'PlayerSearchScreen',
      features: ['Gelişmiş arama', 'Filtreleme', 'Takip sistemi'],
    },
    {
      id: 6,
      title: 'Arkadaş Sistemi',
      description: 'Arkadaş listesi ve takip sistemi',
      icon: '🤝',
      color: '#FF5722',
      screen: 'FriendsScreen',
      features: ['Arkadaş listesi', 'Takipçi/Takip', 'Çevrimiçi durum'],
    },
    {
      id: 7,
      title: 'Mesajlaşma',
      description: 'Gerçek zamanlı sohbet sistemi',
      icon: '💬',
      color: '#795548',
      screen: 'MessagesScreen',
      features: ['Birebir mesaj', 'Grup sohbeti', 'Dosya paylaşımı'],
    },
    {
      id: 8,
      title: 'Arkadaş Aktiviteleri',
      description: 'Arkadaşların aktivite akışı',
      icon: '📈',
      color: '#607D8B',
      screen: 'FriendActivityFeedScreen',
      features: ['Aktivite takibi', 'Etkileşim', 'Gerçek zamanlı'],
    },
  ];

  const renderFeatureCard = feature => (
    <View key={feature.id} style={styles.featureCard}>
      <View style={styles.featureHeader}>
        <View style={[styles.iconContainer, {backgroundColor: feature.color}]}>
          <Text style={styles.featureIcon}>{feature.icon}</Text>
        </View>
        <View style={styles.featureInfo}>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
      </View>

      <View style={styles.featuresList}>
        {feature.features.map((item, index) => (
          <Text key={index} style={styles.featureItem}>
            {item}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.testButton, {backgroundColor: feature.color}]}
        onPress={() => navigation.navigate(feature.screen)}>
        <Text style={styles.testButtonText}>Test Et</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Yeni Özellikler</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ana Açıklama */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>🎉 Arama ve Keşif Özellikleri</Text>
          <Text style={styles.introDescription}>
            HepFit uygulamasına eklenen yeni arama, keşif ve sosyal
            özelliklerini keşfedin. Her özellik için "Test Et" butonuna
            tıklayarak demo yapabilirsiniz.
          </Text>
        </View>

        {/* Özellik Kartları */}
        <View style={styles.featuresContainer}>
          {features.map(renderFeatureCard)}
        </View>

        {/* Ek Bilgiler */}
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalTitle}>💡 Ek Özellikler</Text>
          <View style={styles.additionalList}>
            <Text style={styles.additionalItem}>
              🎯 Yakındaki aktiviteleri otomatik gösterim
            </Text>
            <Text style={styles.additionalItem}>
              📈 Gerçek zamanlı trend analizi
            </Text>
            <Text style={styles.additionalItem}>
              🔄 Pull-to-refresh ile güncelleme
            </Text>
            <Text style={styles.additionalItem}>
              💬 Yorumlar ve beğeni sistemi
            </Text>
            <Text style={styles.additionalItem}>
              📍 Konum bazlı içerik filtreleme
            </Text>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  introSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 10,
  },
  featureCard: {
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
  featureHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 3,
  },
  testButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfo: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  additionalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  additionalList: {
    paddingLeft: 10,
  },
  additionalItem: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default DemoScreen;
