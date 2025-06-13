import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Ana renkler - LoginScreen ile aynı
const COLORS = {
  // Primary Colors
  primaryDark: '#001F30',
  primaryMedium: '#002D46',
  primaryLight: '#003C5D',
  primary: '#004B73',
  primaryBright: '#01649A',

  // Secondary Colors
  backgroundDark: '#183B4E',
  textPrimary: '#FFFFFF',
  textSecondary: '#D9D9D9',
  textMuted: '#999999',

  // Card Colors
  cardBackground: '#F5F5F5',
  cardBorder: '#E5E5E5',
  cardShadow: 'rgba(0, 0, 0, 0.25)',

  // System Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Form Colors
  inputBackground: '#F8F9FA',
  inputBorder: '#E5E7EB',
  placeholder: '#6B7280',

  // Social Colors
  googleBlue: '#4285F4',
  googleGreen: '#34A853',
  googleYellow: '#FBBC05',
  googleRed: '#EA4335',
  facebookBlue: '#1877F2',
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Basit ikonlar - emoji yerine geometrik şekiller
const Icon = ({name, size = 20, color = COLORS.textMuted}) => {
  const iconStyle = {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  };

  switch (name) {
    case 'mail':
      return (
        <View style={iconStyle}>
          <View
            style={{
              width: size * 0.8,
              height: size * 0.6,
              borderWidth: 1.5,
              borderColor: color,
              borderRadius: 3,
            }}>
            <View
              style={{
                position: 'absolute',
                top: -1,
                left: size * 0.1,
                right: size * 0.1,
                height: size * 0.3,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderColor: color,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}
            />
          </View>
        </View>
      );
    case 'lock':
      return (
        <View style={iconStyle}>
          <View
            style={{
              width: size * 0.7,
              height: size * 0.5,
              borderWidth: 1.5,
              borderColor: color,
              borderRadius: 2,
              marginTop: size * 0.2,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: size * 0.1,
              width: size * 0.5,
              height: size * 0.3,
              borderWidth: 1.5,
              borderColor: color,
              borderRadius: size * 0.25,
              borderBottomWidth: 0,
            }}
          />
        </View>
      );
    case 'user':
      return (
        <View style={iconStyle}>
          <View
            style={{
              width: size * 0.4,
              height: size * 0.4,
              borderRadius: size * 0.2,
              borderWidth: 1.5,
              borderColor: color,
              marginBottom: 2,
            }}
          />
          <View
            style={{
              width: size * 0.7,
              height: size * 0.35,
              borderTopLeftRadius: size * 0.35,
              borderTopRightRadius: size * 0.35,
              borderWidth: 1.5,
              borderColor: color,
              borderBottomWidth: 0,
            }}
          />
        </View>
      );
    case 'eye':
      return (
        <View style={iconStyle}>
          <View
            style={{
              width: size * 0.8,
              height: size * 0.5,
              borderRadius: size * 0.4,
              borderWidth: 1.5,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: size * 0.3,
                height: size * 0.3,
                borderRadius: size * 0.15,
                backgroundColor: color,
              }}
            />
          </View>
        </View>
      );
    case 'eye-off':
      return (
        <View style={iconStyle}>
          <View
            style={{
              width: size * 0.8,
              height: size * 0.5,
              borderRadius: size * 0.4,
              borderWidth: 1.5,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: size * 0.3,
                height: size * 0.3,
                borderRadius: size * 0.15,
                backgroundColor: color,
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              width: size,
              height: 1.5,
              backgroundColor: color,
              transform: [{rotate: '45deg'}],
            }}
          />
        </View>
      );
    case 'google':
      return (
        <View
          style={[
            iconStyle,
            {backgroundColor: COLORS.googleBlue, borderRadius: size / 2},
          ]}>
          <Text
            style={{fontSize: size * 0.6, color: 'white', fontWeight: 'bold'}}>
            G
          </Text>
        </View>
      );
    case 'facebook':
      return (
        <View
          style={[
            iconStyle,
            {backgroundColor: COLORS.facebookBlue, borderRadius: size / 2},
          ]}>
          <Text
            style={{fontSize: size * 0.6, color: 'white', fontWeight: 'bold'}}>
            f
          </Text>
        </View>
      );
    default:
      return (
        <View
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: size / 2,
          }}
        />
      );
  }
};

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animasyon referansları
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.9)).current;
  const formSlideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Giriş animasyonu
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(formSlideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, slideAnim, logoScaleAnim, formSlideAnim]);

  // Form alanı güncelleme
  const updateField = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  // Form validasyon fonksiyonu
  const validateForm = () => {
    const newErrors = {};

    // Ad validasyonu
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad gereklidir';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Ad en az 2 karakter olmalıdır';
    }

    // Soyad validasyonu
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad gereklidir';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Soyad en az 2 karakter olmalıdır';
    }

    // E-posta validasyonu
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Şifre validasyonu
    if (!formData.password.trim()) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    // Şifre onay validasyonu
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Şifre onayı gereklidir';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Kayıt işlemi
  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock e-posta kontrolü
      if (formData.email === 'existing@hepfit.com') {
        Alert.alert('Hata', 'Bu e-posta adresi zaten kullanılıyor');
        return;
      }

      // Başarılı kayıt
      Alert.alert('Başarılı', 'Hesabınız oluşturuldu! Giriş yapabilirsiniz.', [
        {
          text: 'Giriş Yap',
          onPress: () => navigation.navigate('LoginScreen'),
        },
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sosyal medya kayıt fonksiyonları
  const handleGoogleSignUp = () => {
    Alert.alert('Google ile Kayıt', 'Google entegrasyonu henüz hazır değil');
  };

  const handleFacebookSignUp = () => {
    Alert.alert(
      'Facebook ile Kayıt',
      'Facebook entegrasyonu henüz hazır değil',
    );
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundDark}
      />

      {/* Arka plan resmi */}
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        {/* Arka plan overlay */}
        <View style={styles.backgroundOverlay} />
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          {/* Logo ve başlık - daha kompakt */}
          <Animated.View
            style={[
              styles.logoSection,
              {
                transform: [{scale: logoScaleAnim}],
              },
            ]}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appName}>HepFit</Text>
            <Text style={styles.greetingTitle}>Aramıza Katıl!</Text>
          </Animated.View>

          {/* Form container - daha kompakt */}
          <Animated.View
            style={[
              styles.formCard,
              {
                transform: [{translateY: formSlideAnim}],
              },
            ]}>
            <Text style={styles.formTitle}>Hesap Oluştur</Text>

            {/* Ad Soyad - tek satırda */}
            <View style={styles.nameRow}>
              <View style={[styles.inputGroup, styles.nameInput]}>
                <View
                  style={[
                    styles.inputContainer,
                    errors.firstName && styles.inputError,
                  ]}>
                  <Icon name="user" size={16} color={COLORS.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ad"
                    placeholderTextColor={COLORS.placeholder}
                    value={formData.firstName}
                    onChangeText={text => updateField('firstName', text)}
                    autoCapitalize="words"
                  />
                </View>
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>

              <View style={[styles.inputGroup, styles.nameInput]}>
                <View
                  style={[
                    styles.inputContainer,
                    errors.lastName && styles.inputError,
                  ]}>
                  <Icon name="user" size={16} color={COLORS.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Soyad"
                    placeholderTextColor={COLORS.placeholder}
                    value={formData.lastName}
                    onChangeText={text => updateField('lastName', text)}
                    autoCapitalize="words"
                  />
                </View>
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
            </View>

            {/* E-posta input */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  errors.email && styles.inputError,
                ]}>
                <Icon name="mail" size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="E-posta adresinizi girin..."
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={formData.email}
                  onChangeText={text => updateField('email', text)}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Şifre input */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  errors.password && styles.inputError,
                ]}>
                <Icon name="lock" size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Şifrenizi girin..."
                  placeholderTextColor={COLORS.placeholder}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={formData.password}
                  onChangeText={text => updateField('password', text)}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeButton}>
                  <Icon
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={16}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Şifre onay input */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  errors.confirmPassword && styles.inputError,
                ]}>
                <Icon name="lock" size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Şifrenizi tekrar girin..."
                  placeholderTextColor={COLORS.placeholder}
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={formData.confirmPassword}
                  onChangeText={text => updateField('confirmPassword', text)}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  style={styles.eyeButton}>
                  <Icon
                    name={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                    size={16}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Kayıt butonu */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                isLoading && styles.signUpButtonDisabled,
              ]}
              onPress={handleSignUp}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.textPrimary} size="small" />
              ) : (
                <Text style={styles.signUpButtonText}>HESAP OLUŞTUR</Text>
              )}
            </TouchableOpacity>

            {/* Sosyal medya ile kayıt */}
            <Text style={styles.socialDivider}>veya</Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleSignUp}>
                <Icon name="google" size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleFacebookSignUp}>
                <Icon name="facebook" size={20} />
              </TouchableOpacity>
            </View>

            {/* Giriş yap */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.backgroundDark,
    opacity: 0.7,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 36,
    height: 36,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textSecondary,
    fontFamily: 'Helvetica',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  formCard: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 8,
  },
  nameInput: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 12,
    height: 40,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    marginLeft: 8,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 6,
  },
  errorText: {
    fontSize: 11,
    color: COLORS.error,
    fontFamily: 'Helvetica',
    marginTop: 3,
    marginLeft: 4,
  },
  signUpButton: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
  },
  socialDivider: {
    fontSize: 12,
    color: COLORS.placeholder,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 12,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  socialButton: {
    width: 40,
    height: 36,
    backgroundColor: COLORS.textPrimary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 13,
    color: COLORS.placeholder,
    fontFamily: 'Helvetica',
  },
  loginLink: {
    fontSize: 13,
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    fontWeight: '500',
  },
});

export default SignUpScreen;
