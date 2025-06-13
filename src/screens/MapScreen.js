import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

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
  orange: '#FF6B35',
  error: '#EF4444',
};

const MapScreen = ({navigation}) => {
  const [viewMode, setViewMode] = useState('map'); // 'map' varsayılan oldu
  const [selectedFilter, setSelectedFilter] = useState('Tümü');
  const [selectedCourt, setSelectedCourt] = useState(null);

  // Yakındaki sahalar verisi - koordinatlarla genişletilmiş
  const courts = [
    {
      id: 1,
      name: 'Maltepe Basketbol Sahası',
      distance: '0.8 km',
      rating: 4.5,
      players: 8,
      maxPlayers: 10,
      availability: 'Müsait',
      type: 'Açık Saha',
      timeSlots: ['10:00', '14:00', '18:00'],
      price: 'Ücretsiz',
      facilities: ['WC', 'Soyunma Odası', 'Su'],
      description: 'Modern basketbol sahası, iyi aydınlatma',
      coordinates: {x: 0.3, y: 0.2}, // Harita üzerindeki pozisyon (0-1 arası)
    },
    {
      id: 2,
      name: 'Kadıköy Spor Kompleksi',
      distance: '1.2 km',
      rating: 4.8,
      players: 10,
      maxPlayers: 10,
      availability: 'Dolu',
      type: 'Kapalı Saha',
      timeSlots: ['12:00', '16:00', '20:00'],
      price: '₺50/saat',
      facilities: ['WC', 'Soyunma Odası', 'Duş', 'Kantin'],
      description: 'Profesyonel kapalı basketbol sahası',
      coordinates: {x: 0.7, y: 0.4},
    },
    {
      id: 3,
      name: 'Fenerbahçe Basketbol Sahası',
      distance: '2.1 km',
      rating: 4.7,
      players: 6,
      maxPlayers: 10,
      availability: 'Müsait',
      type: 'Açık Saha',
      timeSlots: ['11:00', '15:00', '19:00'],
      price: '₺25/saat',
      facilities: ['WC', 'Su'],
      description: 'Deniz manzaralı açık basketbol sahası',
      coordinates: {x: 0.5, y: 0.7},
    },
    {
      id: 4,
      name: 'Bostancı Spor Merkezi',
      distance: '1.8 km',
      rating: 4.3,
      players: 4,
      maxPlayers: 10,
      availability: 'Müsait',
      type: 'Kapalı Saha',
      timeSlots: ['09:00', '13:00', '17:00'],
      price: '₺40/saat',
      facilities: ['WC', 'Soyunma Odası', 'Duş'],
      description: 'Yenilenmiş modern spor kompleksi',
      coordinates: {x: 0.2, y: 0.6},
    },
  ];

  const filters = [
    'Tümü',
    'Açık Saha',
    'Kapalı Saha',
    'Yakın',
    'Uzak',
    'Ücretsiz',
  ];

  // Filtrelenmiş sahalar
  const filteredCourts = courts.filter(court => {
    if (selectedFilter === 'Tümü') return true;
    if (selectedFilter === 'Açık Saha' || selectedFilter === 'Kapalı Saha') {
      return court.type === selectedFilter;
    }
    if (selectedFilter === 'Yakın') {
      return parseFloat(court.distance) <= 1.5;
    }
    if (selectedFilter === 'Uzak') {
      return parseFloat(court.distance) > 1.5;
    }
    if (selectedFilter === 'Ücretsiz') {
      return court.price === 'Ücretsiz';
    }
    return true;
  });

  // Filter buton render
  const renderFilterButton = ({item}) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === item && styles.activeFilterButton,
      ]}
      onPress={() => setSelectedFilter(item)}>
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === item && styles.activeFilterButtonText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Harita üzerindeki saha marker'ı render
  const renderMapMarker = court => (
    <TouchableOpacity
      key={court.id}
      style={[
        styles.mapMarker,
        {
          left: `${court.coordinates.x * 100}%`,
          top: `${court.coordinates.y * 100}%`,
        },
        court.availability === 'Müsait'
          ? styles.availableMarker
          : styles.busyMarker,
        selectedCourt === court.id && styles.selectedMarker,
      ]}
      onPress={() => setSelectedCourt(court.id)}>
      <Text style={styles.markerIcon}>🏀</Text>
      <View style={styles.markerLabel}>
        <Text style={styles.markerText}>{court.name.split(' ')[0]}</Text>
      </View>
    </TouchableOpacity>
  );

  // Saha kartı render (liste görünümü için)
  const renderCourtCard = ({item}) => (
    <TouchableOpacity
      style={[
        styles.courtCard,
        selectedCourt === item.id && styles.selectedCourtCard,
      ]}
      onPress={() => setSelectedCourt(item.id)}>
      {/* Saha resmi ve durumu */}
      <View style={styles.courtHeader}>
        <View style={styles.courtImageContainer}>
          <Text style={styles.courtImageIcon}>🏀</Text>
        </View>
        <View style={styles.courtMainInfo}>
          <Text style={styles.courtName}>{item.name}</Text>
          <Text style={styles.courtType}>{item.type}</Text>
          <View style={styles.courtMetrics}>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>📍</Text>
              <Text style={styles.metricText}>{item.distance}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>⭐</Text>
              <Text style={styles.metricText}>{item.rating}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>💰</Text>
              <Text style={styles.metricText}>{item.price}</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.availabilityBadge,
            item.availability === 'Müsait'
              ? styles.availableBadge
              : styles.busyBadge,
          ]}>
          <Text style={styles.availabilityText}>{item.availability}</Text>
        </View>
      </View>

      {/* Oyuncu durumu */}
      <View style={styles.playersSection}>
        <View style={styles.playersInfo}>
          <Text style={styles.playersIcon}>👥</Text>
          <Text style={styles.playersText}>
            {item.players}/{item.maxPlayers} oyuncu
          </Text>
        </View>
        <View style={styles.playersBar}>
          <View
            style={[
              styles.playersProgress,
              {width: `${(item.players / item.maxPlayers) * 100}%`},
            ]}
          />
        </View>
      </View>

      {/* Zaman slotları */}
      <View style={styles.timeSlotsSection}>
        <Text style={styles.timeSlotsTitle}>Müsait Saatler:</Text>
        <View style={styles.timeSlots}>
          {item.timeSlots.map((time, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* İmkanlar */}
      <View style={styles.facilitiesSection}>
        <Text style={styles.facilitiesTitle}>İmkanlar:</Text>
        <View style={styles.facilities}>
          {item.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Aksiyon butonları */}
      <View style={styles.courtActions}>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Detaylar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.joinButton,
            item.availability !== 'Müsait' && styles.disabledJoinButton,
          ]}
          disabled={item.availability !== 'Müsait'}>
          <Text
            style={[
              styles.joinButtonText,
              item.availability !== 'Müsait' && styles.disabledJoinButtonText,
            ]}>
            {item.availability === 'Müsait' ? 'Katıl' : 'Dolu'}
          </Text>
        </TouchableOpacity>
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Yakındaki Sahalar</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === 'map' && styles.activeToggleButton,
              ]}
              onPress={() => setViewMode('map')}>
              <Text
                style={[
                  styles.toggleButtonText,
                  viewMode === 'map' && styles.activeToggleButtonText,
                ]}>
                Harita
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === 'list' && styles.activeToggleButton,
              ]}
              onPress={() => setViewMode('list')}>
              <Text
                style={[
                  styles.toggleButtonText,
                  viewMode === 'list' && styles.activeToggleButtonText,
                ]}>
                Liste
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Harita Görünümü */}
        {viewMode === 'map' && (
          <View style={styles.mapContainer}>
            <View style={styles.interactiveMap}>
              {/* Harita arkaplanı */}
              <View style={styles.mapBackground}>
                {/* Grid çizgileri */}
                <View style={styles.gridLines}>
                  {[...Array(6)].map((_, i) => (
                    <View
                      key={`h-${i}`}
                      style={[
                        styles.gridLine,
                        styles.horizontalLine,
                        {top: `${i * 20}%`},
                      ]}
                    />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <View
                      key={`v-${i}`}
                      style={[
                        styles.gridLine,
                        styles.verticalLine,
                        {left: `${i * 20}%`},
                      ]}
                    />
                  ))}
                </View>

                {/* Bölge etiketleri */}
                <View style={styles.areaLabels}>
                  <Text style={[styles.areaLabel, {top: '10%', left: '10%'}]}>
                    Maltepe
                  </Text>
                  <Text style={[styles.areaLabel, {top: '10%', right: '10%'}]}>
                    Kadıköy
                  </Text>
                  <Text
                    style={[styles.areaLabel, {bottom: '20%', left: '20%'}]}>
                    Bostancı
                  </Text>
                  <Text
                    style={[styles.areaLabel, {bottom: '10%', right: '30%'}]}>
                    Fenerbahçe
                  </Text>
                </View>

                {/* Kullanıcı konumu */}
                <View style={styles.userLocation}>
                  <View style={styles.userLocationDot}>
                    <Text style={styles.userLocationIcon}>📍</Text>
                  </View>
                  <Text style={styles.userLocationLabel}>Sen</Text>
                </View>
              </View>

              {/* Saha marker'ları */}
              {filteredCourts.map(renderMapMarker)}
            </View>

            {/* Konum butonu */}
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationButtonText}>🎯</Text>
            </TouchableOpacity>

            {/* Zoom butonları */}
            <View style={styles.zoomControls}>
              <TouchableOpacity style={styles.zoomButton}>
                <Text style={styles.zoomButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.zoomButton}>
                <Text style={styles.zoomButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Seçili saha bilgisi (harita görünümünde) */}
        {viewMode === 'map' && selectedCourt && (
          <View style={styles.selectedCourtInfo}>
            {(() => {
              const court = courts.find(c => c.id === selectedCourt);
              return court ? (
                <View style={styles.mapInfoCard}>
                  <View style={styles.mapInfoHeader}>
                    <View style={styles.mapInfoMain}>
                      <Text style={styles.mapInfoName}>{court.name}</Text>
                      <Text style={styles.mapInfoType}>
                        {court.type} • {court.distance}
                      </Text>
                      <View style={styles.mapInfoMetrics}>
                        <Text style={styles.mapInfoMetric}>
                          ⭐ {court.rating}
                        </Text>
                        <Text style={styles.mapInfoMetric}>
                          👥 {court.players}/{court.maxPlayers}
                        </Text>
                        <Text style={styles.mapInfoMetric}>
                          💰 {court.price}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.mapInfoBadge,
                        court.availability === 'Müsait'
                          ? styles.mapInfoAvailable
                          : styles.mapInfoBusy,
                      ]}>
                      <Text style={styles.mapInfoBadgeText}>
                        {court.availability}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mapInfoActions}>
                    <TouchableOpacity style={styles.mapInfoButton}>
                      <Text style={styles.mapInfoButtonText}>Detaylar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mapInfoJoinButton,
                        court.availability !== 'Müsait' &&
                          styles.mapInfoDisabledButton,
                      ]}
                      disabled={court.availability !== 'Müsait'}>
                      <Text
                        style={[
                          styles.mapInfoJoinText,
                          court.availability !== 'Müsait' &&
                            styles.mapInfoDisabledText,
                        ]}>
                        {court.availability === 'Müsait' ? 'Katıl' : 'Dolu'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null;
            })()}
          </View>
        )}

        {/* Filtreler */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Filtreler</Text>
          <FlatList
            data={filters}
            renderItem={renderFilterButton}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          />
        </View>

        {/* Sonuçlar */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {filteredCourts.length} saha bulundu
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortButtonText}>🔄 Sırala</Text>
            </TouchableOpacity>
          </View>

          {/* Sahalar Listesi */}
          <FlatList
            data={filteredCourts}
            renderItem={renderCourtCard}
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
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Tab bar için space
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeToggleButton: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  activeToggleButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },

  // Harita Container
  mapContainer: {
    height: 250,
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  interactiveMap: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  horizontalLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.cardBorder,
  },
  areaLabels: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  areaLabel: {
    position: 'absolute',
    padding: 4,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  userLocation: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
  },
  userLocationDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryBright,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 4,
  },
  userLocationIcon: {
    fontSize: 12,
  },
  userLocationLabel: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },

  // Harita kontrolleri
  locationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  locationButtonText: {
    fontSize: 18,
  },
  zoomControls: {
    position: 'absolute',
    top: 16,
    left: 16,
    gap: 8,
  },
  zoomButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  zoomButtonText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // Seçili saha bilgisi (harita için)
  selectedCourtInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mapInfoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  mapInfoHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  mapInfoMain: {
    flex: 1,
  },
  mapInfoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  mapInfoType: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  mapInfoMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  mapInfoMetric: {
    fontSize: 12,
    color: COLORS.gray,
  },
  mapInfoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  mapInfoAvailable: {
    backgroundColor: COLORS.success,
  },
  mapInfoBusy: {
    backgroundColor: COLORS.error,
  },
  mapInfoBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  mapInfoActions: {
    flexDirection: 'row',
    gap: 12,
  },
  mapInfoButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  mapInfoButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  mapInfoJoinButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primaryBright,
    alignItems: 'center',
  },
  mapInfoDisabledButton: {
    backgroundColor: COLORS.gray,
  },
  mapInfoJoinText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },
  mapInfoDisabledText: {
    color: COLORS.lightGray,
  },

  // Filtreler
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  filtersContainer: {
    paddingVertical: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },

  // Sonuçlar
  resultsSection: {
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sortButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Saha Kartları
  courtCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  selectedCourtCard: {
    borderWidth: 2,
    borderColor: COLORS.primaryBright,
  },
  courtHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  courtImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courtImageIcon: {
    fontSize: 28,
  },
  courtMainInfo: {
    flex: 1,
  },
  courtName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  courtType: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  courtMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metricText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  availableBadge: {
    backgroundColor: COLORS.success,
  },
  busyBadge: {
    backgroundColor: COLORS.error,
  },
  availabilityText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  // Oyuncu Durumu
  playersSection: {
    marginBottom: 16,
  },
  playersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playersIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  playersText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  playersBar: {
    height: 6,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 3,
    overflow: 'hidden',
  },
  playersProgress: {
    height: 6,
    backgroundColor: COLORS.primaryBright,
  },

  // Zaman Slotları
  timeSlotsSection: {
    marginBottom: 16,
  },
  timeSlotsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  timeSlots: {
    flexDirection: 'row',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timeSlotText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },

  // İmkanlar
  facilitiesSection: {
    marginBottom: 16,
  },
  facilitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  facilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  facilityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.orange,
    borderRadius: 6,
  },
  facilityText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '500',
  },

  // Aksiyon Butonları
  courtActions: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  joinButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primaryBright,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledJoinButton: {
    backgroundColor: COLORS.gray,
  },
  joinButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },
  disabledJoinButtonText: {
    color: COLORS.lightGray,
  },

  bottomSpacing: {
    height: 20,
  },

  // Harita Marker'ları
  mapMarker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{translateX: -20}, {translateY: -20}],
  },
  availableMarker: {
    // Müsait sahalar için stil
  },
  busyMarker: {
    opacity: 0.6,
  },
  selectedMarker: {
    transform: [{translateX: -20}, {translateY: -20}, {scale: 1.2}],
  },
  markerIcon: {
    fontSize: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: 32,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  markerLabel: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  markerText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default MapScreen;
