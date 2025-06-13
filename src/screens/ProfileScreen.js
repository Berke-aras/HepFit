import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

const ProfileScreen = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(1); // 1-5 arası adımlar
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'position', 'skill', 'days', 'time'

  // Kullanıcı profil verisi
  const [profileData, setProfileData] = useState({
    name: 'Ahmet Mehmet',
    username: '@ahmetmehmet',
    email: 'ahmetmehmet@gmail.com',
    phone: '+90 • 5123456',
    password: '••••••••',
    position: 'Point Guard',
    skillLevel: 'Orta',
    availableDays: ['Pazartesi', 'Çarşamba', 'Cuma'],
    timeSlots: ['11:00', '14:00', '17:00'],
    badges: ['Tempo Ustası', 'Şahit Geçeği', 'Yol Kaşifi', 'Süa Rehberi'],
    stats: {
      matches: 24,
      wins: 18,
      points: 245,
      assists: 67,
      winRate: 75,
      averagePoints: 12.5,
    },
    preferences: {
      language: 'Türkçe',
      notifications: true,
      privacy: 'Kapalı',
    },
  });

  // Seçenekler
  const positions = [
    'Point Guard',
    'Shooting Guard',
    'Small Forward',
    'Power Forward',
    'Center',
  ];

  const skillLevels = ['Amatör', 'Orta', 'İleri', 'Profesyonel'];

  const days = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ];

  const timeSlots = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
  ];

  // Modal açma fonksiyonları
  const openModal = type => {
    setModalType(type);
    setShowModal(true);
  };

  // Profil düzenleme adımları
  const handleEditStep = step => {
    setEditStep(step);
    setIsEditing(true);
  };

  const handleNextStep = () => {
    if (editStep < 5) {
      setEditStep(editStep + 1);
    } else {
      handleSaveProfile();
    }
  };

  const handlePrevStep = () => {
    if (editStep > 1) {
      setEditStep(editStep - 1);
    } else {
      setIsEditing(false);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setEditStep(1);
    console.log('Profil güncellendi:', profileData);
  };

  // Seçim işlemleri
  const handleSelection = (type, value) => {
    if (type === 'position') {
      setProfileData({...profileData, position: value});
    } else if (type === 'skill') {
      setProfileData({...profileData, skillLevel: value});
    } else if (type === 'days') {
      const updatedDays = profileData.availableDays.includes(value)
        ? profileData.availableDays.filter(d => d !== value)
        : [...profileData.availableDays, value];
      setProfileData({...profileData, availableDays: updatedDays});
    } else if (type === 'time') {
      const updatedTimes = profileData.timeSlots.includes(value)
        ? profileData.timeSlots.filter(t => t !== value)
        : [...profileData.timeSlots, value];
      setProfileData({...profileData, timeSlots: updatedTimes});
    }
    setShowModal(false);
  };

  // Ana profil görünümü
  const renderProfileView = () => (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditStep(1)}>
          <Text style={styles.editButtonText}>Düzenle</Text>
        </TouchableOpacity>
      </View>

      {/* Profil Kartı */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>130 x 130</Text>
          </View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>🏀</Text>
          </View>
        </View>

        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileUsername}>{profileData.username}</Text>

        {/* Rozetler */}
        <View style={styles.badgesContainer}>
          {profileData.badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>

        {/* İlgi Alanları */}
        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>İlgi Alanları</Text>
          <View style={styles.interestsList}>
            <Text style={styles.interestItem}>Doğa</Text>
            <Text style={styles.interestItem}>Müzisyenler</Text>
            <Text style={styles.interestItem}>Yardım</Text>
            <Text style={styles.interestItem}>Koşu</Text>
          </View>
        </View>

        {/* Tercihler */}
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesTitle}>Tercihler</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Dil</Text>
            <TouchableOpacity style={styles.preferenceValue}>
              <Text style={styles.preferenceValueText}>
                {profileData.preferences.language} →
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Bildirimler</Text>
            <TouchableOpacity style={styles.preferenceValue}>
              <Text style={styles.preferenceValueText}>
                {profileData.preferences.privacy} →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>İstatistikler</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileData.stats.matches}</Text>
            <Text style={styles.statLabel}>Maç</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileData.stats.wins}</Text>
            <Text style={styles.statLabel}>Galibiyet</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileData.stats.winRate}%</Text>
            <Text style={styles.statLabel}>Kazanma</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {profileData.stats.averagePoints}
            </Text>
            <Text style={styles.statLabel}>Ortalama</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  // Düzenleme adımları
  const renderEditStep = () => {
    switch (editStep) {
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderPositionStep();
      case 3:
        return renderSkillStep();
      case 4:
        return renderAvailabilityStep();
      case 5:
        return renderTimeStep();
      default:
        return renderPersonalInfoStep();
    }
  };

  // Adım 1: Kişisel Bilgiler
  const renderPersonalInfoStep = () => (
    <View style={styles.editContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={handlePrevStep}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.editTitle}>Profil Düzenle</Text>
        <TouchableOpacity onPress={handleNextStep}>
          <Text style={styles.nextButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.editContent}>
        <View style={styles.editAvatarContainer}>
          <View style={styles.editAvatar}>
            <Text style={styles.editAvatarText}>130 x 130</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>İsim</Text>
          <TextInput
            style={styles.textInput}
            value={profileData.name}
            onChangeText={text => setProfileData({...profileData, name: text})}
            placeholder="Ahmet Mehmet"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>E-posta Adresi</Text>
          <TextInput
            style={styles.textInput}
            value={profileData.email}
            onChangeText={text => setProfileData({...profileData, email: text})}
            placeholder="ahmetmehmet@gmail.com"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Kullanıcı Adı</Text>
          <TextInput
            style={styles.textInput}
            value={profileData.username}
            onChangeText={text =>
              setProfileData({...profileData, username: text})
            }
            placeholder="ahmetmehmet"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Şifre</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={profileData.password}
              secureTextEntry={true}
              placeholder="••••••••"
            />
            <TouchableOpacity style={styles.passwordToggle}>
              <Text style={styles.passwordToggleText}>👁</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Telefon Numarası</Text>
          <TextInput
            style={styles.textInput}
            value={profileData.phone}
            onChangeText={text => setProfileData({...profileData, phone: text})}
            placeholder="+90 • 5123456"
            keyboardType="phone-pad"
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.continueButton} onPress={handleNextStep}>
        <Text style={styles.continueButtonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );

  // Adım 2: Pozisyon Seçimi
  const renderPositionStep = () => (
    <View style={styles.editContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={handlePrevStep}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.editTitle}>Profil Düzenle</Text>
        <TouchableOpacity onPress={handleNextStep}>
          <Text style={styles.nextButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Pozisyon</Text>
        <Text style={styles.stepNumber}>02</Text>

        <View style={styles.optionsGrid}>
          {positions.map((position, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                profileData.position === position && styles.selectedOption,
              ]}
              onPress={() => setProfileData({...profileData, position})}>
              <Text
                style={[
                  styles.optionText,
                  profileData.position === position &&
                    styles.selectedOptionText,
                ]}>
                {position}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleNextStep}>
        <Text style={styles.continueButtonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );

  // Adım 3: Seviye Seçimi
  const renderSkillStep = () => (
    <View style={styles.editContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={handlePrevStep}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.editTitle}>Profil Düzenle</Text>
        <TouchableOpacity onPress={handleNextStep}>
          <Text style={styles.nextButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Seviye</Text>
        <Text style={styles.stepNumber}>03</Text>

        <View style={styles.optionsGrid}>
          {skillLevels.map((skill, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                profileData.skillLevel === skill && styles.selectedOption,
              ]}
              onPress={() =>
                setProfileData({...profileData, skillLevel: skill})
              }>
              <Text
                style={[
                  styles.optionText,
                  profileData.skillLevel === skill && styles.selectedOptionText,
                ]}>
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleNextStep}>
        <Text style={styles.continueButtonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );

  // Adım 4: Müsait Günler
  const renderAvailabilityStep = () => (
    <View style={styles.editContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={handlePrevStep}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.editTitle}>Profil Düzenle</Text>
        <TouchableOpacity onPress={handleNextStep}>
          <Text style={styles.nextButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Müsait Zaman Seç</Text>
        <Text style={styles.stepNumber}>04</Text>

        <View style={styles.daysGrid}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                profileData.availableDays.includes(day) && styles.selectedDay,
              ]}
              onPress={() => {
                const updatedDays = profileData.availableDays.includes(day)
                  ? profileData.availableDays.filter(d => d !== day)
                  : [...profileData.availableDays, day];
                setProfileData({...profileData, availableDays: updatedDays});
              }}>
              <Text
                style={[
                  styles.dayText,
                  profileData.availableDays.includes(day) &&
                    styles.selectedDayText,
                ]}>
                {day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subTitle}>Pazartesi - Saatler</Text>
        <View style={styles.timeSlotsGrid}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlotButton,
                profileData.timeSlots.includes(time) && styles.selectedTimeSlot,
              ]}
              onPress={() => {
                const updatedTimes = profileData.timeSlots.includes(time)
                  ? profileData.timeSlots.filter(t => t !== time)
                  : [...profileData.timeSlots, time];
                setProfileData({...profileData, timeSlots: updatedTimes});
              }}>
              <Text
                style={[
                  styles.timeSlotText,
                  profileData.timeSlots.includes(time) &&
                    styles.selectedTimeSlotText,
                ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleNextStep}>
        <Text style={styles.continueButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );

  // Adım 5: Onay
  const renderTimeStep = () => (
    <View style={styles.editContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={handlePrevStep}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.editTitle}>Profil Düzenle</Text>
        <TouchableOpacity>
          <Text style={styles.nextButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.completionContent}>
        <View style={styles.checkmarkContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.completionTitle}>Profil Düzenlendi!</Text>
        <Text style={styles.completionSubtitle}>Profile Geri Dön</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleSaveProfile}>
        <Text style={styles.continueButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {isEditing ? renderEditStep() : renderProfileView()}
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
    paddingBottom: 100,
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
  editButton: {
    backgroundColor: COLORS.primaryBright,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // Profil Kartı
  profileCard: {
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  profileBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileBadgeText: {
    fontSize: 14,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 20,
  },

  // Rozetler
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },

  // İlgi Alanları
  interestsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  interestsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestItem: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  // Tercihler
  preferencesContainer: {
    width: '100%',
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  preferenceLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  preferenceValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceValueText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // İstatistikler
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryBright,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },

  // Düzenleme Ekranları
  editContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primaryDark,
  },
  backButton: {
    fontSize: 24,
    color: COLORS.white,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  nextButton: {
    fontSize: 20,
    color: COLORS.white,
  },
  editContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  editAvatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  editAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  editAvatarText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },

  // Form elemanları
  formSection: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.primaryDark,
    backgroundColor: COLORS.white,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  passwordToggle: {
    padding: 12,
  },
  passwordToggleText: {
    fontSize: 16,
  },

  // Adım İçerikleri
  stepContent: {
    flex: 1,
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 48,
    fontWeight: '300',
    color: COLORS.primary,
    textAlign: 'center',
    opacity: 0.3,
    marginBottom: 32,
  },
  subTitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },

  // Seçenekler
  optionsGrid: {
    gap: 12,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: COLORS.white,
  },

  // Günler Grid
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  dayButton: {
    width: 80,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: 14,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  selectedDayText: {
    color: COLORS.white,
  },

  // Zaman Slotları
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  timeSlotButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: COLORS.white,
  },

  // Tamamlama
  completionContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 32,
    color: COLORS.white,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  completionSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },

  // Devam Butonu
  continueButton: {
    backgroundColor: COLORS.primaryBright,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;
