/**
 * Antrenman Oluşturma Ekranı
 * Basketbol antrenmanları oluşturmak için modern arayüz
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

const CreateTrainingScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [trainingData, setTrainingData] = useState({
    trainingTitle: '',
    trainingType: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    maxParticipants: '',
    difficultyLevel: '',
    focusAreas: [],
    requirements: '',
    isPrivate: false,
  });

  // Antrenman türleri
  const trainingTypes = [
    {
      id: 'technical',
      title: 'Teknik',
      description: 'Temel becerileri geliştir',
      icon: '🏀',
    },
    {
      id: 'tactical',
      title: 'Taktik',
      description: 'Oyun stratejileri',
      icon: '🧠',
    },
    {
      id: 'conditioning',
      title: 'Kondisyon',
      description: 'Fiziksel hazırlık',
      icon: '💪',
    },
    {id: 'shooting', title: 'Atış', description: 'Şut teknikleri', icon: '🎯'},
  ];

  // Zorluk seviyeleri
  const difficultyLevels = [
    {id: 'beginner', title: 'Başlangıç', description: 'Yeni başlayanlar'},
    {id: 'intermediate', title: 'Orta', description: 'Deneyimli oyuncular'},
    {id: 'advanced', title: 'İleri', description: 'Profesyonel seviye'},
  ];

  // Süre seçenekleri
  const durations = [
    {id: '1h', title: '1 Saat', description: 'Kısa antrenman'},
    {id: '1.5h', title: '1.5 Saat', description: 'Standart süre'},
    {id: '2h', title: '2 Saat', description: 'Uzun antrenman'},
    {id: '2.5h', title: '2.5+ Saat', description: 'Yoğun antrenman'},
  ];

  // Fokus alanları
  const focusAreasList = [
    {id: 'dribbling', title: 'Dribbling', icon: '🏀'},
    {id: 'shooting', title: 'Şut Atma', icon: '🎯'},
    {id: 'defense', title: 'Savunma', icon: '🛡️'},
    {id: 'teamwork', title: 'Takım Oyunu', icon: '🤝'},
    {id: 'conditioning', title: 'Kondisyon', icon: '🏃‍♂️'},
    {id: 'rebounding', title: 'Ribaund', icon: '⬆️'},
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateTraining();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateTraining = () => {
    Alert.alert(
      'Antrenman Oluşturuldu! 🏀',
      `${trainingData.trainingTitle} antrenmanı başarıyla oluşturuldu. Katılımcılar davet edilebilir.`,
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const updateTrainingData = (field, value) => {
    setTrainingData(prev => ({...prev, [field]: value}));
  };

  const toggleFocusArea = areaId => {
    const areas = trainingData.focusAreas.includes(areaId)
      ? trainingData.focusAreas.filter(a => a !== areaId)
      : [...trainingData.focusAreas, areaId];
    updateTrainingData('focusAreas', areas);
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
      <Text style={styles.stepTitle}>Antrenman Bilgileri</Text>
      <Text style={styles.stepSubtitle}>
        Antrenmanınızın temel bilgilerini girin
      </Text>

      {/* Antrenman Türü */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Antrenman Türü *</Text>
        <View style={styles.optionsGrid}>
          {trainingTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionCard,
                trainingData.trainingType === type.id &&
                  styles.optionCardSelected,
              ]}
              onPress={() => updateTrainingData('trainingType', type.id)}>
              <Text style={styles.optionIcon}>{type.icon}</Text>
              <Text
                style={[
                  styles.optionTitle,
                  trainingData.trainingType === type.id &&
                    styles.optionTitleSelected,
                ]}>
                {type.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  trainingData.trainingType === type.id &&
                    styles.optionDescriptionSelected,
                ]}>
                {type.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Antrenman Başlığı */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Antrenman Başlığı *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: Temel Basket Becerisi"
          value={trainingData.trainingTitle}
          onChangeText={text => updateTrainingData('trainingTitle', text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Açıklama */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Açıklama</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Antrenman içeriği ve hedefleri..."
          value={trainingData.description}
          onChangeText={text => updateTrainingData('description', text)}
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
        Antrenmanınızın zamanını ve yerini belirleyin
      </Text>

      {/* Tarih */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tarih *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 15 Mart 2024"
          value={trainingData.date}
          onChangeText={text => updateTrainingData('date', text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Saat */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Saat *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Örn: 19:00"
          value={trainingData.time}
          onChangeText={text => updateTrainingData('time', text)}
          placeholderTextColor="#999"
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
                trainingData.duration === duration.id &&
                  styles.optionCardSelected,
              ]}
              onPress={() => updateTrainingData('duration', duration.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  trainingData.duration === duration.id &&
                    styles.optionTitleSelected,
                ]}>
                {duration.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  trainingData.duration === duration.id &&
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
          placeholder="Spor salonu, saha vb."
          value={trainingData.location}
          onChangeText={text => updateTrainingData('location', text)}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Fokus Alanları</Text>
      <Text style={styles.stepSubtitle}>
        Hangi beceriler üzerinde çalışacaksınız?
      </Text>

      <View style={styles.focusGrid}>
        {focusAreasList.map(area => (
          <TouchableOpacity
            key={area.id}
            style={[
              styles.focusCard,
              trainingData.focusAreas.includes(area.id) &&
                styles.focusCardSelected,
            ]}
            onPress={() => toggleFocusArea(area.id)}>
            <Text style={styles.focusIcon}>{area.icon}</Text>
            <Text
              style={[
                styles.focusTitle,
                trainingData.focusAreas.includes(area.id) &&
                  styles.focusTitleSelected,
              ]}>
              {area.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.helperText}>Birden fazla alan seçebilirsiniz</Text>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Katılımcı Ayarları</Text>
      <Text style={styles.stepSubtitle}>
        Katılımcı kriterleri ve sınırları belirleyin
      </Text>

      {/* Zorluk Seviyesi */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Zorluk Seviyesi *</Text>
        <View style={styles.optionsGrid}>
          {difficultyLevels.map(level => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.optionCard,
                trainingData.difficultyLevel === level.id &&
                  styles.optionCardSelected,
              ]}
              onPress={() => updateTrainingData('difficultyLevel', level.id)}>
              <Text
                style={[
                  styles.optionTitle,
                  trainingData.difficultyLevel === level.id &&
                    styles.optionTitleSelected,
                ]}>
                {level.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  trainingData.difficultyLevel === level.id &&
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
          placeholder="Örn: 12"
          value={trainingData.maxParticipants}
          onChangeText={text => updateTrainingData('maxParticipants', text)}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>

      {/* Özel Gereksinimler */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Özel Gereksinimler</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Ekipman, deneyim vb..."
          value={trainingData.requirements}
          onChangeText={text => updateTrainingData('requirements', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </View>

      {/* Gizlilik */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={styles.privacyOption}
          onPress={() =>
            updateTrainingData('isPrivate', !trainingData.isPrivate)
          }>
          <View
            style={[
              styles.checkbox,
              trainingData.isPrivate && styles.checkboxSelected,
            ]}>
            {trainingData.isPrivate && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Özel Antrenman</Text>
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
      case 4:
        return renderStep4();
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
        <Text style={styles.headerTitle}>Antrenman Planla</Text>
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
            (!trainingData.trainingTitle || !trainingData.trainingType) &&
              currentStep === 1 &&
              styles.nextButtonDisabled,
          ]}
          onPress={nextStep}
          disabled={
            (!trainingData.trainingTitle || !trainingData.trainingType) &&
            currentStep === 1
          }>
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? 'Antrenmanı Oluştur' : 'Devam Et'}
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
  focusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  focusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    width: (width - 56) / 2,
    alignItems: 'center',
  },
  focusCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F1',
  },
  focusIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  focusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1D29',
    textAlign: 'center',
  },
  focusTitleSelected: {
    color: '#FF6B35',
  },
  helperText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
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

export default CreateTrainingScreen;
