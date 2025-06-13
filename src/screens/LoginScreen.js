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

// Ana renkler - Cursor kurallarına uygun şekilde
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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  // Form validasyon fonksiyonu - daha esnek
  const validateForm = () => {
    const newErrors = {};

    // E-posta validasyonu (opsiyonel)
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Şifre validasyonu (opsiyonel)
    if (password.trim() && password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Giriş işlemi - hesap bilgisi gerektirmiyor
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Direkt başarılı giriş - hesap kontrolü yok
      Alert.alert('Başarılı', 'Giriş yapıldı!', [
        {
          text: 'Tamam',
          onPress: () => {
            navigation.navigate('AppIntroScreen');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sosyal medya giriş fonksiyonları
  const handleGoogleLogin = () => {
    Alert.alert('Google ile Giriş', 'Google entegrasyonu henüz hazır değil');
  };

  const handleFacebookLogin = () => {
    Alert.alert(
      'Facebook ile Giriş',
      'Facebook entegrasyonu henüz hazır değil',
    );
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
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
        {/* Arka plan overlay - resimdeki detayları hafifçe koyulaştırmak için */}
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
          {/* Logo ve başlık */}
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
            <Text style={styles.greetingTitle}>Merhaba Sporcu!</Text>
            <Text style={styles.greetingSubtitle}>Antrenmanına devam et</Text>
          </Animated.View>

          {/* Form container */}
          <Animated.View
            style={[
              styles.formCard,
              {
                transform: [{translateY: formSlideAnim}],
              },
            ]}>
            <Text style={styles.formTitle}>Giriş Yap</Text>

            {/* E-posta input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-Mail</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.email && styles.inputError,
                ]}>
                <Icon name="mail" size={18} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="E-posta adresinizi girin... (opsiyonel)"
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors(prev => ({...prev, email: null}));
                    }
                  }}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Şifre input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.password && styles.inputError,
                ]}>
                <Icon name="lock" size={18} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Şifrenizi girin... (opsiyonel)"
                  placeholderTextColor={COLORS.placeholder}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors(prev => ({...prev, password: null}));
                    }
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeButton}>
                  <Icon
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={18}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Şifremi unuttum */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
            </TouchableOpacity>

            {/* Giriş butonu */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.textPrimary} size="small" />
              ) : (
                <Text style={styles.loginButtonText}>GİRİŞ</Text>
              )}
            </TouchableOpacity>

            {/* Sosyal medya ile giriş */}
            <Text style={styles.socialDivider}>veya şununla devam et</Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}>
                <Icon name="google" size={22} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleFacebookLogin}>
                <Icon name="facebook" size={22} />
              </TouchableOpacity>
            </View>

            {/* Kayıt ol */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Hesabınız yok mu? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signupLink}>Hemen Katıl</Text>
              </TouchableOpacity>
            </View>

            {/* Test bilgisi */}
            <View style={styles.testInfo}>
              <Text style={styles.testInfoText}>
                💡 Test için: Herhangi bir bilgi girmeden direkt giriş
                yapabilirsiniz!
              </Text>
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
    opacity: 0.7, // Arka plan resmini hafif koyulaştırıyoruz
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
    marginBottom: 20,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
    width: 48,
    height: 48,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  greetingSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    fontFamily: 'Helvetica',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  formCard: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    // Arka plan üzerinde daha belirgin görünmesi için
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 14,
    height: 44,
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
    marginLeft: 10,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    fontFamily: 'Helvetica',
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    fontWeight: '400',
  },
  loginButton: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
  },
  socialDivider: {
    fontSize: 12,
    color: COLORS.placeholder,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    width: 44,
    height: 40,
    backgroundColor: COLORS.textPrimary,
    borderRadius: 10,
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signupText: {
    fontSize: 14,
    color: COLORS.placeholder,
    fontFamily: 'Helvetica',
  },
  signupLink: {
    fontSize: 14,
    color: COLORS.backgroundDark,
    fontFamily: 'Helvetica',
    fontWeight: '400',
  },
  testInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.success,
  },
  testInfoText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
    textAlign: 'center',
  },
});

export default LoginScreen;
