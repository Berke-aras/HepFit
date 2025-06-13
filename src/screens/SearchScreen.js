import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'Basketbol maçı',
    'Futbol antrenmanı',
    'Tenis partneri',
  ]);

  // Kategoriler
  const categories = [
    {id: 'all', title: 'Tümü', icon: '🏆'},
    {id: 'match', title: 'Maçlar', icon: '⚡'},
    {id: 'training', title: 'Antrenmanlar', icon: '🏀'},
    {id: 'team', title: 'Takımlar', icon: '👥'},
    {id: 'event', title: 'Etkinlikler', icon: '🎯'},
  ];

  // Seviye filtreleri
  const levels = [
    {id: 'all', title: 'Tüm Seviyeler'},
    {id: 'beginner', title: 'Başlangıç'},
    {id: 'intermediate', title: 'Orta'},
    {id: 'advanced', title: 'İleri'},
    {id: 'professional', title: 'Profesyonel'},
  ];

  // Konum filtreleri
  const locations = [
    {id: 'all', title: 'Tüm Konumlar'},
    {id: 'nearby', title: 'Yakınımda (5km)'},
    {id: 'city', title: 'Şehrimde'},
    {id: 'district', title: 'İlçemde'},
  ];

  // Örnek arama sonuçları
  const mockResults = [
    {
      id: 1,
      type: 'match',
      title: 'Basketbol Maçı',
      subtitle: 'Amatör seviye • Bugün 19:00',
      location: 'Spor Salonu A',
      distance: '2.3 km',
      participants: '8/10',
      level: 'intermediate',
    },
    {
      id: 2,
      type: 'training',
      title: 'Futbol Antrenmanı',
      subtitle: 'Başlangıç seviye • Yarın 17:00',
      location: 'Sahil Spor Kompleksi',
      distance: '1.8 km',
      participants: '12/15',
      level: 'beginner',
    },
    {
      id: 3,
      type: 'team',
      title: 'Thunder Basketbol Takımı',
      subtitle: '15 üye • Aktif takım',
      location: 'Beşiktaş',
      distance: '3.1 km',
      participants: '15/20',
      level: 'advanced',
    },
  ];

  // Arama fonksiyonu
  const handleSearch = query => {
    if (query.trim()) {
      // Yakın zamanda arama geçmişine ekle
      const newRecentSearches = [
        query,
        ...recentSearches.filter(item => item !== query),
      ].slice(0, 5);
      setRecentSearches(newRecentSearches);

      // Filtreleme işlemi
      const filtered = mockResults.filter(item => {
        const matchesQuery = item.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || item.type === selectedCategory;
        const matchesLevel =
          selectedLevel === 'all' || item.level === selectedLevel;

        return matchesQuery && matchesCategory && matchesLevel;
      });

      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  // Filtre temizleme
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedLocation('all');
    setShowFilters(false);
    handleSearch(searchQuery);
  };

  // Sonuç kartı render
  const renderResultItem = ({item}) => (
    <TouchableOpacity style={styles.resultCard} activeOpacity={0.7}>
      <View style={styles.resultHeader}>
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle}>{item.title}</Text>
          <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
          <Text style={styles.resultLocation}>
            📍 {item.location} • {item.distance}
          </Text>
        </View>
        <View style={styles.resultStats}>
          <Text style={styles.participants}>{item.participants}</Text>
          <Text style={styles.participantsLabel}>Katılımcı</Text>
        </View>
      </View>
      <View style={styles.resultFooter}>
        <Text style={styles.levelBadge}>
          {levels.find(l => l.id === item.level)?.title}
        </Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Katıl</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Arama</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}>
          <Text style={styles.filterButtonText}>🔧</Text>
        </TouchableOpacity>
      </View>

      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Aktivite, takım veya etkinlik ara..."
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(searchQuery)}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Kategori Filtreleri */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton,
            ]}
            onPress={() => {
              setSelectedCategory(category.id);
              handleSearch(searchQuery);
            }}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}>
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* İçerik */}
      {searchQuery === '' ? (
        // Arama yapılmadığında gösterilecek
        <ScrollView style={styles.content}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Neleri arıyorsun?</Text>
            <Text style={styles.emptyStateSubtitle}>
              Yakınındaki aktiviteleri, takımları ve etkinlikleri keşfet
            </Text>

            {/* Son Aramalar */}
            {recentSearches.length > 0 && (
              <View style={styles.recentSearches}>
                <Text style={styles.sectionTitle}>Son Aramalar</Text>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchItem}
                    onPress={() => {
                      setSearchQuery(search);
                      handleSearch(search);
                    }}>
                    <Text style={styles.recentSearchText}>🕒 {search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        // Arama sonuçları
        <View style={styles.content}>
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsHeader}>
              {searchResults.length} sonuç bulundu
            </Text>
          </View>
          <FlatList
            data={searchResults}
            renderItem={renderResultItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.resultsContainer}
          />
        </View>
      )}

      {/* Filtre Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.modalCancelText}>İptal</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filtreler</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.modalClearText}>Temizle</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Seviye Filtresi */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Seviye</Text>
              {levels.map(level => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.filterOption,
                    selectedLevel === level.id && styles.selectedFilterOption,
                  ]}
                  onPress={() => setSelectedLevel(level.id)}>
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLevel === level.id &&
                        styles.selectedFilterOptionText,
                    ]}>
                    {level.title}
                  </Text>
                  {selectedLevel === level.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Konum Filtresi */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Konum</Text>
              {locations.map(location => (
                <TouchableOpacity
                  key={location.id}
                  style={[
                    styles.filterOption,
                    selectedLocation === location.id &&
                      styles.selectedFilterOption,
                  ]}
                  onPress={() => setSelectedLocation(location.id)}>
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLocation === location.id &&
                        styles.selectedFilterOptionText,
                    ]}>
                    {location.title}
                  </Text>
                  {selectedLocation === location.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setShowFilters(false);
                handleSearch(searchQuery);
              }}>
              <Text style={styles.applyButtonText}>Filtreleri Uygula</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#F5F6FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2E5BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  categoryScrollView: {
    marginBottom: 10,
  },
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
    minWidth: 80,
  },
  selectedCategoryButton: {
    backgroundColor: '#2E5BFF',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 30,
  },
  recentSearches: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  recentSearchItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    marginBottom: 8,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#333333',
  },
  resultsContainer: {
    padding: 20,
  },
  resultsHeader: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
  },
  resultCard: {
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  resultLocation: {
    fontSize: 14,
    color: '#666666',
  },
  resultStats: {
    alignItems: 'center',
  },
  participants: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },
  participantsLabel: {
    fontSize: 12,
    color: '#666666',
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Modal styles
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
  modalClearText: {
    fontSize: 16,
    color: '#2E5BFF',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  selectedFilterOption: {
    backgroundColor: '#E3F2FD',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedFilterOptionText: {
    color: '#2E5BFF',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: '#2E5BFF',
    fontWeight: 'bold',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  applyButton: {
    backgroundColor: '#2E5BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
