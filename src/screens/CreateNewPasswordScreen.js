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

// Basit ikon komponenti
const Icon = ({name, size, color}) => {
  if (name === 'lock') {
    return <Text style={{color: color, fontSize: size}}>🔒</Text>;
  }
  if (name === 'eye-off-outline') {
    return <Text style={{color: color, fontSize: size}}>🙈</Text>;
  }
  if (name === 'eye-outline') {
    return <Text style={{color: color, fontSize: size}}>👁</Text>;
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

const CreateNewPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validasyon fonksiyonu
  const validateForm = () => {
    const newErrors = {};

    // Şifre validasyonu
    if (!password.trim()) {
      newErrors.password = 'Şifre gereklidir';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    // Şifre onay validasyonu
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Şifre onayı gereklidir';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Şifre değiştirme fonksiyonu
  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock API çağrısı - gerçek uygulamada backend API'si kullanılacak
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Başarı ekranına yönlendir
      navigation.navigate('PasswordChangedSuccessScreen', {email: email});
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
            <Text style={styles.title}>Yeni Şifre Oluştur</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Şifre Oluşturun</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.password && styles.inputError,
                ]}>
                <Icon
                  name="lock"
                  size={20}
                  color={COLORS.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Şifreniz en az 6 karakter olmalıdır..."
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={!isPasswordVisible}
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
                  style={styles.eyeIcon}>
                  <Icon
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Şifre Onay</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.confirmPassword && styles.inputError,
                ]}>
                <Icon
                  name="lock"
                  size={20}
                  color={COLORS.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Şifrenizi tekrar giriniz..."
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={!isConfirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors(prev => ({...prev, confirmPassword: null}));
                    }
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  style={styles.eyeIcon}>
                  <Icon
                    name={
                      isConfirmPasswordVisible
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.changePasswordButton,
                isLoading && styles.changePasswordButtonDisabled,
              ]}
              onPress={handleChangePassword}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.changePasswordButtonText}>
                  Şifreyi değiştir
                </Text>
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
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
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
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
  },
  changePasswordButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  changePasswordButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
  changePasswordButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateNewPasswordScreen;
