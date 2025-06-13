/**
 * Etkinlik Oluşturma Ekranı
 * Basketbol etkinlikleri oluşturmak için modern arayüz
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const CreateEventScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    eventTitle: '',
    eventType: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    maxParticipants: '',
    skillLevel: '',
    requirements: '',
    isPrivate: false,
  });

  // Etkinlik türleri
  const eventTypes = [
    {
      id: 'training',
      title: 'Antrenman',
      description: 'Teknik geliştirme',
      icon: '🏀',
    },
    {
      id: 'match',
      title: 'Dostluk Maçı',
      description: 'Eğlenceli maç',
      icon: '⚡',
    },
    {
      id: 'tournament',
      title: 'Turnuva',
      description: 'Rekabetçi organizasyon',
      icon: '🏆',
    },
    {
      id: 'skills',
      title: 'Beceri Gelişimi',
      description: 'Özel yetenekler',
      icon: '🎯',
    },
  ];

  // Seviye seçenekleri
  const skillLevels = [
    {id: 'beginner', title: 'Başlangıç', description: 'Yeni başlayanlar'},
    {id: 'amateur', title: 'Amatör', description: 'Deneyimli oyuncular'},
    {id: 'advanced', title: 'İleri', description: 'Profesyonel seviye'},
  ];

  // Süre seçenekleri
  const durations = [
    {id: '1h', title: '1 Saat', description: 'Kısa etkinlik'},
    {id: '1.5h', title: '1.5 Saat', description: 'Orta süre'},
    {id: '2h', title: '2 Saat', description: 'Uzun etkinlik'},
    {id: '3h', title: '3+ Saat', description: 'Tam gün'},
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateEvent();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateEvent = () => {
    Alert.alert(
      'Etkinlik Oluşturuldu! 🎯',
      `${eventData.eventTitle} etkinliği başarıyla oluşturuldu. Katılımcılar davet edilebilir.`,
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const updateEventData = (field, value) => {
    setEventData(prev => ({...prev, [field]: value}));
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <Text style={styles.stepText}>
        {String(currentStep).padStart(2, '0')} / 03
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, {width: `${(currentStep / 3) * 100}%`}]}
        />
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Etkinlik Bilgileri</Text>
      <Text style={styles.stepSubtitle}>
        Etkinliğinizin temel bilgilerini girin
      </Text>

      {/* Etkinlik Türü */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Etkinlik Türü *</Text>
        <View style={styles.optionsGrid}>
          {eventTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionCard,
                eventData.eventType === type.id && styles.optionCardSelected,
              ]}
              onPress={() => updateEventData('eventType', type.id)}>
              <Text style={styles.optionIcon}>{type.icon}</Text>
              <Text
                style={[
                  styles.optionTitle,
                  eventData.eventType === type.id && styles.optionTitleSelected,
                ]}>
                {type.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  eventData.eventType === type.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {type.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Etkinlik Başlığı */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Etkinlik Başlığı *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: Basketbol Antrenmanı"
          value={eventData.eventTitle}
          onChangeText={text => updateEventData('eventTitle', text)}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Açıklama */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Açıklama</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Etkinlik hakkında detaylar..."
          value={eventData.description}
          onChangeText={text => updateEventData('description', text)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor={COLORS.gray}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Tarih & Konum</Text>
      <Text style={styles.stepSubtitle}>
        Etkinliğinizin zamanını ve yerini belirleyin
      </Text>

      {/* Tarih */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tarih *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 15 Mart 2024"
          value={eventData.date}
          onChangeText={text => updateEventData('date', text)}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Saat */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Saat *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 19:00"
          value={eventData.time}
          onChangeText={text => updateEventData('time', text)}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Süre */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Süre *</Text>
        <View style={styles.optionsGrid}>
          {durations.map(duration => (
            <TouchableOpacity
              key={duration.id}
              style={[
                styles.optionCard,
                eventData.duration === duration.id && styles.optionCardSelected,
              ]}
              onPress={() => updateEventData('duration', duration.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  eventData.duration === duration.id &&
                    styles.optionTitleSelected,
                ]}>
                {duration.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  eventData.duration === duration.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {duration.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Konum */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Konum *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Spor salonu, park vb."
          value={eventData.location}
          onChangeText={text => updateEventData('location', text)}
          placeholderTextColor={COLORS.gray}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Katılımcı Ayarları</Text>
      <Text style={styles.stepSubtitle}>
        Katılımcı kriterleri ve sınırları belirleyin
      </Text>

      {/* Seviye Seçimi */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Seviye *</Text>
        <View style={styles.optionsGrid}>
          {skillLevels.map(level => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.optionCard,
                eventData.skillLevel === level.id && styles.optionCardSelected,
              ]}
              onPress={() => updateEventData('skillLevel', level.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  eventData.skillLevel === level.id &&
                    styles.optionTitleSelected,
                ]}>
                {level.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  eventData.skillLevel === level.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {level.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Maksimum Katılımcı */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Maksimum Katılımcı *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 10"
          value={eventData.maxParticipants}
          onChangeText={text => updateEventData('maxParticipants', text)}
          keyboardType="numeric"
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Özel Gereksinimler */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Özel Gereksinimler</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Deneyim, ekipman vb..."
          value={eventData.requirements}
          onChangeText={text => updateEventData('requirements', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor={COLORS.gray}
        />
      </View>

      {/* Gizlilik */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={styles.privacyOption}
          onPress={() => updateEventData('isPrivate', !eventData.isPrivate)}>
          <View
            style={[
              styles.checkbox,
              eventData.isPrivate && styles.checkboxSelected,
            ]}>
            {eventData.isPrivate && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Özel Etkinlik</Text>
            <Text style={styles.privacyDescription}>
              Sadece davet edilen kişiler katılabilir
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
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1A1D29" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Etkinlik Oluştur</Text>
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
            (!eventData.eventTitle || !eventData.eventType) &&
              currentStep === 1 &&
              styles.nextButtonDisabled,
          ]}
          onPress={nextStep}
          disabled={
            (!eventData.eventTitle || !eventData.eventType) && currentStep === 1
          }>
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'Etkinliği Oluştur' : 'Devam Et'}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
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
  optionCardSelected: {
    borderColor: COLORS.primaryBright,
    backgroundColor: COLORS.cardBackground,
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
    textAlign: 'center',
  },
  optionTitleSelected: {
    color: COLORS.primaryBright,
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  optionDescriptionSelected: {
    color: COLORS.primaryBright,
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
});

export default CreateEventScreen;
