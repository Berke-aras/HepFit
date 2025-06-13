import React, {useState, useRef, useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';

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

const VerifyCodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params || {};

  const [code, setCode] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // TextInput referansları
  const inputRefs = useRef([]);

  useEffect(() => {
    // İlk input'a odaklan
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Kod giriş fonksiyonu
  const handleCodeChange = (value, index) => {
    // Sadece rakam kabul et
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Hata temizle
    if (errors.code) {
      setErrors(prev => ({...prev, code: null}));
    }

    // Sonraki input'a odaklan
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace tuşu kontrolü
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Kod validasyon fonksiyonu
  const validateCode = () => {
    const newErrors = {};
    const codeString = code.join('');

    if (codeString.length !== 5) {
      newErrors.code = 'Lütfen 5 haneli kodu tam olarak girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Kod doğrulama fonksiyonu
  const handleVerifyCode = async () => {
    if (!validateCode()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock API çağrısı - gerçek uygulamada backend API'si kullanılacak
      await new Promise(resolve => setTimeout(resolve, 2000));

      const codeString = code.join('');

      // Mock kod kontrolü - gerçek uygulamada backend'den gelecek
      if (codeString === '12345') {
        // Yeni şifre oluşturma ekranına yönlendir
        navigation.navigate('CreateNewPasswordScreen', {email: email});
      } else {
        Alert.alert('Hata', 'Girilen kod hatalı. Lütfen tekrar deneyin.');
      }
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
            <Text style={styles.title}>Kodu Doğrula</Text>

            <Text style={styles.description}>
              {email || 'example@example.com'} adresine gönderdiğimiz kodu gir.
            </Text>

            <View style={styles.codeInputContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.codeInput,
                    digit && styles.codeInputFilled,
                    errors.code && styles.codeInputError,
                  ]}
                  value={digit}
                  onChangeText={value => handleCodeChange(value, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

            <TouchableOpacity
              style={[
                styles.verifyButton,
                isLoading && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerifyCode}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.verifyButtonText}>Doğrula</Text>
              )}
            </TouchableOpacity>

            <View style={styles.testInfo}>
              <Text style={styles.testInfoTitle}>Test için:</Text>
              <Text style={styles.testInfoText}>Kod: 12345</Text>
            </View>
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
    textAlign: 'center',
    marginBottom: 40,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
  codeInputFilled: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  codeInputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
  verifyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  testInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  testInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  testInfoText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});

export default VerifyCodeScreen;
