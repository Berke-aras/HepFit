import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const {width} = Dimensions.get('window');

// Figma'dan alınan renkler
const COLORS = {
  primary: '#1A1D29',
  blue: '#4A90E2', // Basketbol kartları için mavi
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  lightGray: '#F5F5F5',
  green: '#4CAF50', // Tamamlandı status için
  orange: '#FF6B35',
  background: '#F8F9FA',
};

const HomeScreen = ({navigation}) => {
  // Yaklaşan Etkinlikler
  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Basketbol Müsabakası',
      date: '15 Mayıs 2025, 10:00',
      location: 'H.Ü',
      duration: '2 Saat',
      type: 'basketball',
      logo: '64 × 64',
    },
    {
      id: 2,
      title: 'Basketbol Müsabakası',
      date: '15 Mayıs 2025, 10:00',
      location: 'H.Ü',
      duration: '2 Saat',
      type: 'basketball',
      logo: '64 × 64',
    },
    {
      id: 3,
      title: 'Basketbol Müsabakası',
      date: '16 Mayıs 2025, 14:00',
      location: 'A.Ü',
      duration: '2 Saat',
      type: 'basketball',
      logo: '64 × 64',
    },
  ]);

  // Katıldığım Etkinlikler
  const [joinedEvents] = useState([
    {
      id: 1,
      title: 'Basketbol Buluşması',
      date: '10 Nisan 2025',
      location: 'İzmir',
      status: 'Tamamlandı',
      type: 'football',
      logo: '64 × 64',
    },
    {
      id: 2,
      title: 'Basketbol Turnuvası',
      date: '5 Nisan 2025',
      location: 'Ankara',
      status: 'Tamamlandı',
      type: 'basketball',
      logo: '64 × 64',
    },
    {
      id: 3,
      title: 'Voleybol Maçı',
      date: '1 Nisan 2025',
      location: 'İstanbul',
      status: 'Tamamlandı',
      type: 'volleyball',
      logo: '64 × 64',
    },
  ]);

  // İndirilenler
  const [indirim] = useState([
    {
      id: 1,
      title: 'Basket Topu',
      date: '10 Nisan 2025',
      location: 'İzmir',
      status: 'Tamamlandı',
      type: 'football',
      logo: '64 × 64',
    },
    {
      id: 2,
      title: 'Basketbol Antrenmanı',
      date: '8 Nisan 2025',
      location: 'Bursa',
      status: 'Tamamlandı',
      type: 'basketball',
      logo: '64 × 64',
    },
  ]);

  // Yaklaşan etkinlik render
  const renderUpcomingEvent = ({item}) => (
    <TouchableOpacity style={styles.upcomingEventCard}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>{item.logo}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
            <View style={styles.metaDivider}>
              <Text style={styles.dividerText}>|</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.timeIcon}>🕐</Text>
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Normal etkinlik render (katıldığım/indirilenler)
  const renderNormalEvent = ({item}) => (
    <TouchableOpacity style={styles.normalEventCard}>
      <View style={styles.normalLogoContainer}>
        <Text style={styles.normalLogoText}>{item.logo}</Text>
      </View>
      <View style={styles.normalEventContent}>
        <Text style={styles.normalEventTitle}>{item.title}</Text>
        <Text style={styles.normalEventDate}>{item.date}</Text>
        <View style={styles.normalEventFooter}>
          {item.status && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.normalLocationText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Yaklaşan Etkinlikler */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Yaklaşan Etkinlikler</Text>
            <Text style={styles.eventCount}>
              {upcomingEvents.length} Etkinlik
            </Text>
          </View>
          <FlatList
            data={upcomingEvents}
            renderItem={renderUpcomingEvent}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Katıldığım Etkinlikler */}
        <View style={styles.section}>
          <View style={styles.darkSectionHeader}>
            <Text style={styles.darkSectionTitle}>Katıldığım Etkinlikler</Text>
            <Text style={styles.darkEventCount}>
              {joinedEvents.length} Etkinlik
            </Text>
          </View>
          <FlatList
            data={joinedEvents.slice(0, 1)} // Sadece ilk etkinlik gösteriliyor Figma'da
            renderItem={renderNormalEvent}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* İndirilenler */}
        <View style={styles.section}>
          <View style={styles.darkSectionHeader}>
            <Text style={styles.darkSectionTitle}>İndirimler</Text>
            <Text style={styles.darkEventCount}>{indirim.length} İndirim</Text>
          </View>
          <FlatList
            data={indirim.slice(0, 1)} // Sadece ilk etkinlik gösteriliyor Figma'da
            renderItem={renderNormalEvent}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Alt boşluk */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Tab bar için space
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  eventCount: {
    fontSize: 14,
    color: COLORS.gray,
  },

  // Dark Section Headers (Katıldığım/İndirilenler)
  darkSectionHeader: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  darkSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  darkEventCount: {
    fontSize: 14,
    color: COLORS.white,
  },

  // Yaklaşan Etkinlik Kartları (Mavi)
  upcomingEventCard: {
    backgroundColor: COLORS.blue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  eventDetails: {
    gap: 8,
  },
  eventDate: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 6,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  timeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.white,
  },
  metaDivider: {
    marginHorizontal: 12,
  },
  dividerText: {
    color: COLORS.white,
    fontSize: 14,
  },

  // Normal Etkinlik Kartları (Beyaz)
  normalEventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderTopWidth: 0,
  },
  normalLogoContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  normalLogoText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  normalEventContent: {
    flex: 1,
  },
  normalEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  normalEventDate: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  normalEventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  normalLocationText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;
