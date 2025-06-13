import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Ana renkler - Cursor kurallarına uygun şekilde
const COLORS = {
  primary: '#183B4E',
  white: '#FFFFFF',
  lightGray: '#D6D6D6',
  gray: '#6B7280',
  black: '#000000',
  error: '#EF4444',
  success: '#10B981',
  background: '#F8F9FA',
};

const {width} = Dimensions.get('window');

// Başarı ikonu komponenti
const SuccessIcon = () => {
  return (
    <View style={styles.successIconContainer}>
      <View style={styles.successIconCircle}>
        <Text style={styles.successIconText}>✓</Text>
      </View>
    </View>
  );
};

const PasswordChangedSuccessScreen = () => {
  const navigation = useNavigation();

  // Giriş ekranına yönlendirme fonksiyonu
  const handleGoToLogin = () => {
    // Stack'i temizleyerek giriş ekranına git
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Başarı popup alanı */}
        <View style={styles.successPopup}>
          <SuccessIcon />

          <Text style={styles.successTitle}>Şifreniz değiştirildi.</Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoToLogin}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>

        {/* Arka plan overlay */}
        <View style={styles.overlay} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yarı saydam arka plan
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successPopup: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    minWidth: width * 0.8,
    maxWidth: 350,
    zIndex: 1,
  },
  successIconContainer: {
    marginBottom: 30,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.success,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successIconText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 0,
  },
});

export default PasswordChangedSuccessScreen;
