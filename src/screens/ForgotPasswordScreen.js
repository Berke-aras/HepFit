import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
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

// Basit ikon komponenti
const Icon = ({name, size, color}) => {
  if (name === 'arrow-left') {
    return <Text style={{color: color, fontSize: size}}>←</Text>;
  }
  if (name === 'email') {
    return <Text style={{color: color, fontSize: size}}>📧</Text>;
  }
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
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // E-posta validasyon fonksiyonu
  const validateEmail = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Kod gönderme fonksiyonu
  const handleSendCode = async () => {
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock API çağrısı - gerçek uygulamada backend API'si kullanılacak
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Kod doğrulama ekranına yönlendir ve e-posta adresini gönder
      navigation.navigate('VerifyCodeScreen', {email: email});
    } catch (error) {
      Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Şifremi Unuttum</Text>

            <Text style={styles.description}>
              Endişelenme. Hesabına ait e-posta adresini gir. E-posta adresine{' '}
              gönderilen kodu girerek hesabını kurtarabilirsin.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-Mail</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.email && styles.inputError,
                ]}>
                <Icon
                  name="email"
                  size={20}
                  color={COLORS.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="E-posta adresinizi girin..."
                  placeholderTextColor={COLORS.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
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

            <TouchableOpacity
              style={[
                styles.sendCodeButton,
                isLoading && styles.sendCodeButtonDisabled,
              ]}
              onPress={handleSendCode}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.sendCodeButtonText}>Kod Gönder</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.primary,
  },
  formContainer: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    paddingHorizontal: 15,
    height: 55,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
  },
  sendCodeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  sendCodeButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
  sendCodeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
