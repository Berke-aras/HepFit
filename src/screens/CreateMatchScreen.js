/**
 * Maç Oluşturma Ekranı
 * Basketbol maçları organize etmek için modern arayüz
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

const CreateMatchScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [matchData, setMatchData] = useState({
    matchTitle: '',
    matchType: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    teamSize: '',
    skillLevel: '',
    requirements: '',
    isCompetitive: false,
    isPrivate: false,
  });

  // Maç türleri
  const matchTypes = [
    {
      id: 'friendly',
      title: 'Dostluk Maçı',
      description: 'Eğlenceli karşılaşma',
      icon: '🤝',
    },
    {
      id: 'tournament',
      title: 'Turnuva',
      description: 'Rekabetçi organizasyon',
      icon: '🏆',
    },
    {
      id: '3v3',
      title: '3v3 Sokak',
      description: 'Hızlı maç formatı',
      icon: '⚡',
    },
    {
      id: '5v5',
      title: '5v5 Klasik',
      description: 'Standart basketbol',
      icon: '🏀',
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
    {id: '30min', title: '30 Dakika', description: 'Kısa maç'},
    {id: '1h', title: '1 Saat', description: 'Standart süre'},
    {id: '1.5h', title: '1.5 Saat', description: 'Uzun maç'},
    {id: '2h', title: '2+ Saat', description: 'Turnuva formatı'},
  ];

  // Takım büyüklüğü
  const teamSizes = [
    {id: '3v3', title: '3v3', description: '6 oyuncu'},
    {id: '4v4', title: '4v4', description: '8 oyuncu'},
    {id: '5v5', title: '5v5', description: '10 oyuncu'},
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateMatch();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateMatch = () => {
    Alert.alert(
      'Maç Oluşturuldu! ⚡',
      `${matchData.matchTitle} maçı başarıyla oluşturuldu. Takımlar davet edilebilir.`,
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const updateMatchData = (field, value) => {
    setMatchData(prev => ({...prev, [field]: value}));
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
      <Text style={styles.stepTitle}>Maç Bilgileri</Text>
      <Text style={styles.stepSubtitle}>Maçınızın temel bilgilerini girin</Text>

      {/* Maç Türü */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Maç Türü *</Text>
        <View style={styles.optionsGrid}>
          {matchTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionCard,
                matchData.matchType === type.id && styles.optionCardSelected,
              ]}
              onPress={() => updateMatchData('matchType', type.id)}>
              <Text style={styles.optionIcon}>{type.icon}</Text>
              <Text
                style={[
                  styles.optionTitle,
                  matchData.matchType === type.id && styles.optionTitleSelected,
                ]}>
                {type.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  matchData.matchType === type.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {type.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Maç Başlığı */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Maç Başlığı *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: Akşam Basketbol Maçı"
          value={matchData.matchTitle}
          onChangeText={text => updateMatchData('matchTitle', text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Takım Büyüklüğü */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Takım Büyüklüğü *</Text>
        <View style={styles.optionsGrid}>
          {teamSizes.map(size => (
            <TouchableOpacity
              key={size.id}
              style={[
                styles.optionCard,
                matchData.teamSize === size.id && styles.optionCardSelected,
              ]}
              onPress={() => updateMatchData('teamSize', size.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  matchData.teamSize === size.id && styles.optionTitleSelected,
                ]}>
                {size.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  matchData.teamSize === size.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {size.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Açıklama */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Açıklama</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Maç kuralları ve detayları..."
          value={matchData.description}
          onChangeText={text => updateMatchData('description', text)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Tarih & Konum</Text>
      <Text style={styles.stepSubtitle}>
        Maçınızın zamanını ve yerini belirleyin
      </Text>

      {/* Tarih */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tarih *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 15 Mart 2024"
          value={matchData.date}
          onChangeText={text => updateMatchData('date', text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Saat */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Saat *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 19:00"
          value={matchData.time}
          onChangeText={text => updateMatchData('time', text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Süre */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Maç Süresi *</Text>
        <View style={styles.optionsGrid}>
          {durations.map(duration => (
            <TouchableOpacity
              key={duration.id}
              style={[
                styles.optionCard,
                matchData.duration === duration.id && styles.optionCardSelected,
              ]}
              onPress={() => updateMatchData('duration', duration.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  matchData.duration === duration.id &&
                    styles.optionTitleSelected,
                ]}>
                {duration.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  matchData.duration === duration.id &&
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
          placeholder="Spor sahası, park vb."
          value={matchData.location}
          onChangeText={text => updateMatchData('location', text)}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Katılımcı Ayarları</Text>
      <Text style={styles.stepSubtitle}>
        Katılımcı kriterleri ve maç kuralları
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
                matchData.skillLevel === level.id && styles.optionCardSelected,
              ]}
              onPress={() => updateMatchData('skillLevel', level.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  matchData.skillLevel === level.id &&
                    styles.optionTitleSelected,
                ]}>
                {level.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  matchData.skillLevel === level.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {level.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Özel Gereksinimler */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Özel Gereksinimler</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Ekipman, deneyim, kurallar vb..."
          value={matchData.requirements}
          onChangeText={text => updateMatchData('requirements', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </View>

      {/* Rekabetçi Maç */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={styles.privacyOption}
          onPress={() =>
            updateMatchData('isCompetitive', !matchData.isCompetitive)
          }>
          <View
            style={[
              styles.checkbox,
              matchData.isCompetitive && styles.checkboxSelected,
            ]}>
            {matchData.isCompetitive && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Rekabetçi Maç</Text>
            <Text style={styles.privacyDescription}>
              Skorlu ve ciddi maç formatı
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Gizlilik */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={styles.privacyOption}
          onPress={() => updateMatchData('isPrivate', !matchData.isPrivate)}>
          <View
            style={[
              styles.checkbox,
              matchData.isPrivate && styles.checkboxSelected,
            ]}>
            {matchData.isPrivate && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Özel Maç</Text>
            <Text style={styles.privacyDescription}>
              Sadece davet edilen takımlar katılabilir
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
        <Text style={styles.headerTitle}>Maç Organize Et</Text>
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
            (!matchData.matchTitle || !matchData.matchType) &&
              currentStep === 1 &&
              styles.nextButtonDisabled,
          ]}
          onPress={nextStep}
          disabled={
            (!matchData.matchTitle || !matchData.matchType) && currentStep === 1
          }>
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'Maçı Oluştur' : 'Devam Et'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#1A1D29',
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
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 20,
    width: 40,
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1D29',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
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
    color: '#1A1D29',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D29',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1D29',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    width: (width - 56) / 2,
    alignItems: 'center',
  },
  optionCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F1',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D29',
    marginBottom: 4,
    textAlign: 'center',
  },
  optionTitleSelected: {
    color: '#FF6B35',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  optionDescriptionSelected: {
    color: '#FF6B35',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D29',
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateMatchScreen;
