import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

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
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  // Animasyon referansları
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const sportsIconsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Açılış animasyonu sekansı
    Animated.sequence([
      // İlk olarak genel fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Logo büyüme animasyonu
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      // Başlık yukarı kayma
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      // Butonlar yukarı kayma
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      // Spor ikonları döner animasyon
      Animated.loop(
        Animated.timing(sportsIconsAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        }),
      ),
    ]).start();
  }, [
    fadeAnim,
    logoScaleAnim,
    titleTranslateY,
    buttonTranslateY,
    sportsIconsAnim,
  ]);

  // Spor ikonları döner animasyon değeri
  const rotateInterpolate = sportsIconsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Floating animasyonu için
  const floatingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );
    floatingAnimation.start();
  }, [floatingAnim]);

  const floatingTranslateY = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
      />

      {/* Ana container */}
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
          },
        ]}>
        {/* Arka plan gradient */}
        <View style={styles.gradientBackground} />

        {/* Floating spor ikonları */}
        <View style={styles.backgroundElements}>
          <Animated.View
            style={[
              styles.floatingIcon,
              styles.icon1,
              {
                transform: [
                  {translateY: floatingTranslateY},
                  {rotate: rotateInterpolate},
                ],
              },
            ]}>
            <Text style={styles.iconText}>🏀</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.floatingIcon,
              styles.icon2,
              {
                transform: [
                  {translateY: floatingTranslateY},
                  {rotate: rotateInterpolate},
                ],
              },
            ]}>
            <Text style={styles.iconText}>⚽</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.floatingIcon,
              styles.icon3,
              {
                transform: [
                  {translateY: floatingTranslateY},
                  {rotate: rotateInterpolate},
                ],
              },
            ]}>
            <Text style={styles.iconText}>🎾</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.floatingIcon,
              styles.icon4,
              {
                transform: [
                  {translateY: floatingTranslateY},
                  {rotate: rotateInterpolate},
                ],
              },
            ]}>
            <Text style={styles.iconText}>🏐</Text>
          </Animated.View>
        </View>

        {/* Ana içerik */}
        <View style={styles.content}>
          {/* Logo ve uygulama adı */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{scale: logoScaleAnim}],
              },
            ]}>
            {/* Logo placeholder */}
            <View style={styles.logoCircle}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appName}>HepFit</Text>
            <View style={styles.underline} />
          </Animated.View>

          {/* Başlık ve açıklama */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                transform: [{translateY: titleTranslateY}],
              },
            ]}>
            <Text style={styles.title}>Spor Yolculuğunuz Başlıyor</Text>
            <Text style={styles.subtitle}>
              Hedeflerinize ulaşmak için ihtiyacınız olan her şey burada.
              Antrenman yapın. Spor etkinlikleri oluşturun. Maçlara katılın!
            </Text>
          </Animated.View>

          {/* Butonlar */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [{translateY: buttonTranslateY}],
              },
            ]}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => navigation.navigate('LoginScreen')}
              activeOpacity={0.8}>
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                Giriş Yap
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={() => navigation.navigate('SignUpScreen')}
              activeOpacity={0.8}>
              <Text style={[styles.buttonText, styles.registerButtonText]}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primaryDark,
    // Gradient efekti için şimdilik düz renk, ileride LinearGradient eklenebilir
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  floatingIcon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: {
    top: '15%',
    left: '10%',
  },
  icon2: {
    top: '25%',
    right: '15%',
  },
  icon3: {
    top: '60%',
    left: '5%',
  },
  icon4: {
    top: '70%',
    right: '10%',
  },
  iconText: {
    fontSize: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 31, // Cursor kurallarına göre screen padding
    paddingVertical: 48, // 2XL spacing
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24, // LG spacing
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    fontSize: 75, // Figma'daki boyuta uygun
    fontWeight: '700', // Bold weight
    color: COLORS.textPrimary,
    fontFamily: 'Helvetica',
    letterSpacing: 2,
  },
  underline: {
    width: 120,
    height: 4,
    backgroundColor: COLORS.primaryBright,
    marginTop: 16, // MD spacing
    borderRadius: 2,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16, // MD spacing
  },
  title: {
    fontSize: 25, // Figma'daki boyuta uygun
    fontWeight: '700', // Bold weight
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 16, // MD spacing
    fontFamily: 'Helvetica',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20, // Figma'daki boyuta uygun
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'Helvetica',
    fontWeight: '400', // Regular weight
  },
  buttonContainer: {
    width: '100%',
    gap: 16, // MD spacing
  },
  button: {
    height: 47, // Cursor kurallarındaki button height
    borderRadius: 12, // Large border radius
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButton: {
    backgroundColor: COLORS.textPrimary,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.textPrimary,
  },
  buttonText: {
    fontSize: 16, // Body font size
    fontWeight: '700', // Bold weight
    fontFamily: 'Lato', // Primary font family
  },
  loginButtonText: {
    color: COLORS.primary,
  },
  registerButtonText: {
    color: COLORS.textPrimary,
  },
});

export default OnboardingScreen;
