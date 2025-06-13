/**
 * Takım Oluşturma Ekranı
 * Basketbol takımları oluşturmak için modern arayüz
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

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
  warning: '#F59E0B',
  error: '#EF4444',
};

const CreateTeamScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: '',
    teamLogo: null,
    description: '',
    playerCount: '',
    level: '',
    location: '',
    coordinates: {
      latitude: 40.9614, // İstanbul merkezli başlangıç
      longitude: 29.0653,
    },
    positions: [],
    requirements: '',
    schedule: {
      days: [],
      time: '',
    },
    isPrivate: false,
  });

  // İstanbul için harita bölgesi
  const [mapRegion, setMapRegion] = useState({
    latitude: 40.9614,
    longitude: 29.0653,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Seviye seçenekleri
  const levels = [
    {id: 'amateur', title: 'Amatör', description: 'Yeni başlayanlar için'},
    {id: 'intermediate', title: 'Orta', description: 'Deneyimli oyuncular'},
    {id: 'advanced', title: 'İleri', description: 'Profesyonel seviye'},
  ];

  // Pozisyon seçenekleri
  const positions = [
    {id: 'pg', title: 'Point Guard', icon: '🎯'},
    {id: 'sg', title: 'Shooting Guard', icon: '🏹'},
    {id: 'sf', title: 'Small Forward', icon: '⚡'},
    {id: 'pf', title: 'Power Forward', icon: '💪'},
    {id: 'c', title: 'Center', icon: '🛡️'},
  ];

  // Günler
  const days = [
    {id: 'mon', title: 'Pazartesi', short: 'Pzt'},
    {id: 'tue', title: 'Salı', short: 'Sal'},
    {id: 'wed', title: 'Çarşamba', short: 'Çar'},
    {id: 'thu', title: 'Perşembe', short: 'Per'},
    {id: 'fri', title: 'Cuma', short: 'Cum'},
    {id: 'sat', title: 'Cumartesi', short: 'Cmt'},
    {id: 'sun', title: 'Pazar', short: 'Paz'},
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Takım oluşturma işlemi
      handleCreateTeam();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateTeam = () => {
    Alert.alert(
      'Takım Oluşturuldu! 🏀',
      `${teamData.teamName} takımı başarıyla oluşturuldu. Oyuncular davet edilebilir.`,
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const updateTeamData = (field, value) => {
    setTeamData(prev => ({...prev, [field]: value}));
  };

  const togglePosition = positionId => {
    const positions = teamData.positions.includes(positionId)
      ? teamData.positions.filter(p => p !== positionId)
      : [...teamData.positions, positionId];
    updateTeamData('positions', positions);
  };

  const toggleDay = dayId => {
    const days = teamData.schedule.days.includes(dayId)
      ? teamData.schedule.days.filter(d => d !== dayId)
      : [...teamData.schedule.days, dayId];
    updateTeamData('schedule', {...teamData.schedule, days});
  };

  // Harita için fonksiyonlar
  const handleMapPress = event => {
    // Geçici olarak sabit koordinatları kullan
    const latitude = 40.9614 + (Math.random() - 0.5) * 0.02;
    const longitude = 29.0653 + (Math.random() - 0.5) * 0.02;

    updateTeamData('coordinates', {latitude, longitude});

    // Koordinatları adrese çevir (basit versiyon)
    const locationName = `İstanbul - ${latitude.toFixed(
      4,
    )}, ${longitude.toFixed(4)}`;
    updateTeamData('location', locationName);
  };

  const toggleMapView = () => {
    setShowMap(!showMap);
  };

  const confirmLocation = () => {
    setShowMap(false);
    Alert.alert('Konum Seçildi', 'Takım konumu başarıyla belirlendi.');
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <Text style={styles.stepText}>
        {String(currentStep).padStart(2, '0')} / 04
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, {width: `${(currentStep / 4) * 100}%`}]}
        />
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Takım Bilgileri</Text>
      <Text style={styles.stepSubtitle}>
        Takımınızın temel bilgilerini girin
      </Text>

      {/* Takım Logosu */}
      <TouchableOpacity style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoIcon}>🏀</Text>
          <Text style={styles.logoText}>Logo Ekle</Text>
        </View>
      </TouchableOpacity>

      {/* Takım Adı */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Takım Adı *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: Golden State Warriors"
          value={teamData.teamName}
          onChangeText={text => updateTeamData('teamName', text)}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Açıklama */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Açıklama</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Takımınız hakkında kısa bilgi..."
          value={teamData.description}
          onChangeText={text => updateTeamData('description', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Oyuncu Sayısı */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Oyuncu Sayısı *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 12"
          value={teamData.playerCount}
          onChangeText={text => updateTeamData('playerCount', text)}
          keyboardType="numeric"
          placeholderTextColor={COLORS.gray}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Seviye & Konum</Text>
      <Text style={styles.stepSubtitle}>
        Takımınızın seviyesi ve konumunu belirleyin
      </Text>

      {/* Seviye Seçimi */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Takım Seviyesi *</Text>
        <View style={styles.optionsGrid}>
          {levels.map(level => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.optionCard,
                teamData.level === level.id && styles.optionCardSelected,
              ]}
              onPress={() => updateTeamData('level', level.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  teamData.level === level.id && styles.optionTitleSelected,
                ]}>
                {level.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  teamData.level === level.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {level.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Konum Seçimi */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Konum *</Text>

        {/* Konum seçim butonları */}
        <View style={styles.locationToggle}>
          <TouchableOpacity
            style={[
              styles.locationToggleButton,
              !showMap && styles.locationToggleButtonActive,
            ]}
            onPress={() => setShowMap(false)}>
            <Text
              style={[
                styles.locationToggleText,
                !showMap && styles.locationToggleTextActive,
              ]}>
              📝 Manuel Giriş
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.locationToggleButton,
              showMap && styles.locationToggleButtonActive,
            ]}
            onPress={() => setShowMap(true)}>
            <Text
              style={[
                styles.locationToggleText,
                showMap && styles.locationToggleTextActive,
              ]}>
              🗺️ Haritadan Seç
            </Text>
          </TouchableOpacity>
        </View>

        {/* Manuel konum girişi */}
        {!showMap && (
          <TextInput
            style={styles.textInput}
            placeholder="Şehir/İlçe"
            value={teamData.location}
            onChangeText={text => updateTeamData('location', text)}
            placeholderTextColor={COLORS.gray}
          />
        )}

        {/* Harita gösterimi */}
        {showMap && (
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
              <Text style={styles.mapPlaceholderTitle}>
                Harita Yükleniyor...
              </Text>
              <Text style={styles.mapPlaceholderSubtitle}>
                Konum seçmek için haritaya dokunun
              </Text>
              <TouchableOpacity
                style={styles.mapPlaceholderButton}
                onPress={handleMapPress}>
                <Text style={styles.mapPlaceholderButtonText}>
                  📍 Konum Seç
                </Text>
              </TouchableOpacity>
            </View>

            {/* Harita kontrolleri */}
            <View style={styles.mapControls}>
              <TouchableOpacity
                style={styles.mapControlButton}
                onPress={confirmLocation}>
                <Text style={styles.mapControlButtonText}>✓ Konumu Onayla</Text>
              </TouchableOpacity>
            </View>

            {/* Koordinat bilgisi */}
            <View style={styles.coordinateInfo}>
              <Text style={styles.coordinateText}>
                📍 {teamData.coordinates.latitude.toFixed(4)},{' '}
                {teamData.coordinates.longitude.toFixed(4)}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Özel Gereksinimler */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Özel Gereksinimler</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Deneyim, yaş aralığı vb..."
          value={teamData.requirements}
          onChangeText={text => updateTeamData('requirements', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Aranan Pozisyonlar</Text>
      <Text style={styles.stepSubtitle}>
        Hangi pozisyonlar için oyuncu arıyorsunuz?
      </Text>

      <View style={styles.positionsGrid}>
        {positions.map(position => (
          <TouchableOpacity
            key={position.id}
            style={[
              styles.positionCard,
              teamData.positions.includes(position.id) &&
                styles.positionCardSelected,
            ]}
            onPress={() => togglePosition(position.id)}>
            <Text style={styles.positionIcon}>{position.icon}</Text>
            <Text
              style={[
                styles.positionTitle,
                teamData.positions.includes(position.id) &&
                  styles.positionTitleSelected,
              ]}>
              {position.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.helperText}>
        Birden fazla pozisyon seçebilirsiniz
      </Text>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Antrenman Programı</Text>
      <Text style={styles.stepSubtitle}>
        Ne zaman antrenman yapmayı planlıyorsunuz?
      </Text>

      {/* Günler */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Antrenman Günleri *</Text>
        <View style={styles.daysGrid}>
          {days.map(day => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayCard,
                teamData.schedule.days.includes(day.id) &&
                  styles.dayCardSelected,
              ]}
              onPress={() => toggleDay(day.id)}>
              <Text
                style={[
                  styles.dayText,
                  teamData.schedule.days.includes(day.id) &&
                    styles.dayTextSelected,
                ]}>
                {day.short}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Saat */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Antrenman Saati</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 19:00-21:00"
          value={teamData.schedule.time}
          onChangeText={text =>
            updateTeamData('schedule', {...teamData.schedule, time: text})
          }
          placeholderTextColor="#999"
        />
      </View>

      {/* Gizlilik */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={styles.privacyOption}
          onPress={() => updateTeamData('isPrivate', !teamData.isPrivate)}>
          <View
            style={[
              styles.checkbox,
              teamData.isPrivate && styles.checkboxSelected,
            ]}>
            {teamData.isPrivate && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Özel Takım</Text>
            <Text style={styles.privacyDescription}>
              Sadece davet edilen oyuncular katılabilir
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Takım Oluştur</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!teamData.teamName || !teamData.playerCount) &&
              currentStep === 1 &&
              styles.nextButtonDisabled,
          ]}
          onPress={nextStep}
          disabled={
            (!teamData.teamName || !teamData.playerCount) && currentStep === 1
          }>
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? 'Takımı Oluştur' : 'Devam Et'}
          </Text>
        </TouchableOpacity>
      </View>
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
  closeButton: {
    color: COLORS.white,
    fontSize: 20,
    width: 40,
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primaryBright,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    borderStyle: 'dashed',
  },
  logoIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.primaryDark,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: COLORS.primaryBright,
    backgroundColor: COLORS.cardBackground,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: COLORS.primaryBright,
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
  optionDescriptionSelected: {
    color: COLORS.primaryBright,
  },
  positionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  positionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    width: (width - 56) / 2,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  positionCardSelected: {
    borderColor: COLORS.primaryBright,
    backgroundColor: COLORS.cardBackground,
  },
  positionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  positionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  positionTitleSelected: {
    color: COLORS.primaryBright,
  },
  helperText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    width: (width - 80) / 7,
    alignItems: 'center',
  },
  dayCardSelected: {
    backgroundColor: COLORS.primaryBright,
    borderColor: COLORS.primaryBright,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  dayTextSelected: {
    color: COLORS.white,
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primaryBright,
    borderColor: COLORS.primaryBright,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  nextButton: {
    backgroundColor: COLORS.primaryBright,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.primaryBright,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.lightGray,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    gap: 8,
  },
  locationToggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  locationToggleButtonActive: {
    backgroundColor: COLORS.primaryBright,
    borderColor: COLORS.primaryBright,
  },
  locationToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  locationToggleTextActive: {
    color: COLORS.white,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  mapPlaceholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  mapPlaceholderSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
  },
  mapPlaceholderButton: {
    backgroundColor: COLORS.primaryBright,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapPlaceholderButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  mapControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlButton: {
    backgroundColor: COLORS.primaryBright,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapControlButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  coordinateInfo: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 8,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  coordinateText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CreateTeamScreen;
