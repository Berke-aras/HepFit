import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Ana renkler - Cursor kurallarına uygun şekilde
const COLORS = {
  primary: '#183B4E',
  white: '#FFFFFF',
  lightGray: '#E5E7EB',
  gray: '#6B7280',
  black: '#000000',
  error: '#EF4444',
  success: '#10B981',
  background: '#F9FAFB',
  blue: '#3B82F6',
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Spor kartı komponenti
const SportCard = ({sport, title, isSelected, onSelect}) => {
  const getIcon = () => {
    switch (sport) {
      case 'volleyball':
        return '🏐';
      case 'tennis':
        return '🎾';
      case 'football':
        return '⚽';
      case 'basketball':
        return '🏀';
      case 'running':
        return '🏃‍♂️';
      default:
        return '💪';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.sportCard, isSelected && styles.selectedSportCard]}
      onPress={onSelect}
      activeOpacity={0.8}>
      <View
        style={[
          styles.iconContainer,
          isSelected && styles.selectedIconContainer,
        ]}>
        <Text style={styles.sportIcon}>{getIcon()}</Text>
      </View>
      <Text
        style={[styles.sportTitle, isSelected && styles.selectedSportTitle]}>
        {title}
      </Text>
      {isSelected && (
        <View style={styles.checkMark}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Sayfa göstergesi komponenti
const PageIndicator = ({currentPage, totalPages}) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({length: totalPages}, (_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            index === currentPage && styles.activeIndicator,
          ]}
        />
      ))}
    </View>
  );
};

const AppIntroScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSport, setSelectedSport] = useState(null);

  // Spor aktiviteleri verileri
  const sportsData = [
    {
      id: 1,
      sport: 'volleyball',
      title: 'Voleybol',
    },
    {
      id: 2,
      sport: 'tennis',
      title: 'Tenis',
    },
    {
      id: 3,
      sport: 'football',
      title: 'Futbol',
    },
    {
      id: 4,
      sport: 'basketball',
      title: 'Basketbol',
    },
    {
      id: 5,
      sport: 'running',
      title: 'Koşu',
    },
  ];

  // Sayfa değişimi kontrolü
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / screenWidth);
    setCurrentPage(page);
  };

  // Spor seçimi
  const handleSelectSport = sportData => {
    setSelectedSport(sportData);
  };

  // Ana sayfaya git
  const goToMainPage = () => {
    Alert.alert(
      'Harika!',
      `${selectedSport.title} seçildi. Ana sayfaya yönlendiriliyorsunuz!`,
      [
        {
          text: 'Ana Sayfa',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{name: 'MainTabs'}],
            });
          },
        },
      ],
    );
  };

  // Sonraki sayfaya geçiş
  const handleNext = () => {
    if (currentPage < sportsData.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current?.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
      setCurrentPage(nextPage);
    } else {
      handleContinue();
    }
  };

  // Önceki sayfaya geçiş
  const handlePrevious = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      scrollViewRef.current?.scrollTo({
        x: prevPage * screenWidth,
        animated: true,
      });
      setCurrentPage(prevPage);
    }
  };

  // Geçme işlemi
  const handleSkip = () => {
    Alert.alert('Spor Seçimi', 'Spor seçmeden devam etmek istiyor musunuz?', [
      {text: 'Geri Dön', style: 'cancel'},
      {text: 'Geç', onPress: () => handleContinue()},
    ]);
  };

  // Devam etme işlemi
  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Üst başlık */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={[
              styles.navButton,
              currentPage === 0 && styles.hiddenButton,
            ]}>
            <Text style={styles.navButtonText}>← Geri</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Spor Türünü Seç</Text>
            <Text style={styles.headerSubtitle}>
              {currentPage + 1} / {sportsData.length}
            </Text>
          </View>

          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Geç</Text>
          </TouchableOpacity>
        </View>

        {/* Ana başlık */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Hangi sporu seviyorsun?</Text>
          <Text style={styles.mainSubtitle}>
            Sana özel antrenman programları hazırlayalım
          </Text>
        </View>

        {/* Kaydırmalı spor kartları */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          {sportsData.map((item, index) => (
            <View key={item.id} style={styles.pageContainer}>
              <SportCard
                sport={item.sport}
                title={item.title}
                isSelected={selectedSport?.id === item.id}
                onSelect={() => handleSelectSport(item)}
              />
            </View>
          ))}
        </ScrollView>

        {/* Seçili spor bilgisi */}
        {selectedSport && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              ✨ {selectedSport.title} seçildi
            </Text>
          </View>
        )}

        {/* Alt navigation */}
        <View style={styles.bottomNavigation}>
          <PageIndicator
            currentPage={currentPage}
            totalPages={sportsData.length}
          />

          <View style={styles.buttonContainer}>
            {/* Spor seçildiğinde ana sayfa butonu */}
            {selectedSport ? (
              <TouchableOpacity
                onPress={goToMainPage}
                style={styles.mainPageButton}>
                <Text style={styles.mainPageButtonText}>
                  🏠 Ana Sayfaya Git
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>
                  {currentPage === sportsData.length - 1
                    ? 'Ana Sayfa'
                    : 'Sonraki'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hiddenButton: {
    opacity: 0,
    pointerEvents: 'none',
  },
  navButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
  skipButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  pageContainer: {
    width: screenWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sportCard: {
    width: 280,
    height: 320,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    position: 'relative',
  },
  selectedSportCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#F8FAFF',
    transform: [{scale: 1.02}],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: COLORS.lightGray,
  },
  selectedIconContainer: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sportIcon: {
    fontSize: 60,
  },
  sportTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  selectedSportTitle: {
    color: COLORS.primary,
  },
  checkMark: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: COLORS.success,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectionInfo: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    color: COLORS.success,
    fontWeight: '600',
  },
  bottomNavigation: {
    paddingHorizontal: 30,
    paddingVertical: 25,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  selectedNextButton: {
    backgroundColor: COLORS.success,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedNextButtonText: {
    color: COLORS.white,
  },
  // Yeni ana sayfa butonu stilleri
  mainPageButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: COLORS.success,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  mainPageButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppIntroScreen;
