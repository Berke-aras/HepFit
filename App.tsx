/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerifyCodeScreen from './src/screens/VerifyCodeScreen';
import CreateNewPasswordScreen from './src/screens/CreateNewPasswordScreen';
import PasswordChangedSuccessScreen from './src/screens/PasswordChangedSuccessScreen';
import AppIntroScreen from './src/screens/AppIntroScreen';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateEventScreen from './src/screens/CreateEventScreen.js';
import CreateTrainingScreen from './src/screens/CreateTrainingScreen.js';
import CreateMatchScreen from './src/screens/CreateMatchScreen.js';
import CreateTeamScreen from './src/screens/CreateTeamScreen.js';
import MyActivitiesScreen from './src/screens/MyActivitiesScreen.js';
import SportsNewsScreen from './src/screens/SportsNewsScreen.js';
import SearchScreen from './src/screens/SearchScreen.js';
import ExploreScreen from './src/screens/ExploreScreen.js';
import SocialFeedScreen from './src/screens/SocialFeedScreen.js';
import DemoScreen from './src/screens/DemoScreen.js';
import PlayerSearchScreen from './src/screens/PlayerSearchScreen.js';
import FriendsScreen from './src/screens/FriendsScreen.js';
import MessagesScreen from './src/screens/MessagesScreen.js';
import ChatScreen from './src/screens/ChatScreen.js';
import UserProfileScreen from './src/screens/UserProfileScreen.js';
import FriendActivityFeedScreen from './src/screens/FriendActivityFeedScreen.js';
import {
  HomeIcon,
  CalendarIcon,
  MapIcon,
  ProfileIcon,
} from './src/components/TabIcons';
import Svg, {Path} from 'react-native-svg';

// Navigation stack tiplerini tanımlıyoruz
export type RootStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  RegisterScreen: undefined; // OnboardingScreen'den kullanılıyor
  ForgotPasswordScreen: undefined;
  VerifyCodeScreen: {email: string};
  CreateNewPasswordScreen: {email: string};
  PasswordChangedSuccessScreen: {email: string};
  AppIntroScreen: undefined;
  MainTabs: undefined;
  CreateEventScreen: undefined;
  CreateTrainingScreen: undefined;
  CreateMatchScreen: undefined;
  CreateTeamScreen: undefined;
  MyActivitiesScreen: undefined;
  SportsNewsScreen: undefined;
  SearchScreen: undefined;
  ExploreScreen: undefined;
  SocialFeedScreen: undefined;
  DemoScreen: undefined;
  PlayerSearchScreen: undefined;
  FriendsScreen: undefined;
  MessagesScreen: undefined;
  ChatScreen: {
    userId: number;
    userName: string;
    userAvatar: string;
    isGroup?: boolean;
  };
  UserProfileScreen: {userId: number};
  FriendActivityFeedScreen: undefined;
};

// Tab Navigator tipleri
export type TabParamList = {
  Home: undefined;
  Calendar: undefined;
  Add: undefined; // Plus button placeholder
  Map: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

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
  warning: '#F59E0B',
  error: '#EF4444',
};

// Özel ikon bileşenleri
const CreateIcon = ({color}: {color: string}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C13.1 2 14 2.9 14 4V5H16C17.1 5 18 5.9 18 7V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7C6 5.9 6.9 5 8 5H10V4C10 2.9 10.9 2 12 2ZM12 4V6H12V4ZM8 7V19H16V7H8ZM10 9H14V11H10V9ZM10 13H14V15H10V13Z"
      fill={color}
    />
  </Svg>
);

const CalendarTabIcon = ({color}: {color: string}) => (
  <View
    style={{
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        width: 16,
        height: 14,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 2,
      }}>
      <View
        style={{
          width: '100%',
          height: 4,
          backgroundColor: color,
          marginTop: 3,
          borderRadius: 1,
        }}
      />
    </View>
    <View
      style={{
        width: 2,
        height: 4,
        backgroundColor: color,
        position: 'absolute',
        top: -1,
        left: 4,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        width: 2,
        height: 4,
        backgroundColor: color,
        position: 'absolute',
        top: -1,
        right: 4,
        borderRadius: 1,
      }}
    />
  </View>
);

const TeamIcon = ({color}: {color: string}) => (
  <View
    style={{
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{width: 6, height: 6, borderRadius: 3, backgroundColor: color}}
      />
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
          marginHorizontal: 2,
        }}
      />
      <View
        style={{width: 6, height: 6, borderRadius: 3, backgroundColor: color}}
      />
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
      <View
        style={{width: 4, height: 6, backgroundColor: color, borderRadius: 1}}
      />
      <View
        style={{
          width: 6,
          height: 8,
          backgroundColor: color,
          borderRadius: 1,
          marginHorizontal: 1,
        }}
      />
      <View
        style={{width: 4, height: 6, backgroundColor: color, borderRadius: 1}}
      />
    </View>
  </View>
);

const SearchIcon = ({color}: {color: string}) => (
  <View
    style={{
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: color,
      }}
    />
    <View
      style={{
        width: 6,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{rotate: '45deg'}],
        position: 'absolute',
        bottom: 2,
        right: 2,
      }}
    />
  </View>
);

const ListIcon = ({color}: {color: string}) => (
  <View
    style={{
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        width: 16,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        marginBottom: 2,
      }}
    />
    <View
      style={{
        width: 16,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        marginBottom: 2,
      }}
    />
    <View
      style={{
        width: 16,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        marginBottom: 2,
      }}
    />
    <View
      style={{width: 12, height: 2, backgroundColor: color, borderRadius: 1}}
    />
  </View>
);

const MessageIcon = ({color}: {color: string}) => (
  <View
    style={{
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        width: 16,
        height: 12,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: color,
      }}>
      <View
        style={{
          width: 8,
          height: 1.5,
          backgroundColor: color,
          borderRadius: 0.75,
          marginTop: 3,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          width: 6,
          height: 1.5,
          backgroundColor: color,
          borderRadius: 0.75,
          marginTop: 1,
          alignSelf: 'center',
        }}
      />
    </View>
  </View>
);

const FriendsIcon = ({color}: {color: string}) => (
  <View
    style={{
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{width: 7, height: 7, borderRadius: 3.5, backgroundColor: color}}
      />
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 3.5,
          backgroundColor: color,
          marginLeft: 2,
        }}
      />
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 1}}>
      <View
        style={{width: 5, height: 7, backgroundColor: color, borderRadius: 1}}
      />
      <View
        style={{
          width: 5,
          height: 7,
          backgroundColor: color,
          borderRadius: 1,
          marginLeft: 1,
        }}
      />
    </View>
  </View>
);

// Plus butonu için özel bileşen
const PlusButton = ({navigation}: {navigation: any}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  const rotateValue = React.useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      // Açılma animasyonu
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Kapanma animasyonu
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsMenuOpen(false);
      });
    }
  };

  const navigateToScreen = (screenName: string) => {
    // Önce menüyü kapat
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsMenuOpen(false);
      // Sonra navigate et
      navigation.getParent()?.navigate(screenName);
    });
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const menuItems = [
    // Temel Oluşturma İşlemleri (Birinci Kategori)
    {
      id: 'event',
      title: 'Etkinlik Oluştur',
      subtitle: 'Yeni etkinlik düzenle',
      icon: CreateIcon,
      color: COLORS.primaryBright,
      screen: 'CreateEventScreen',
    },
    {
      id: 'team',
      title: 'Takım Oluştur',
      subtitle: 'Yeni takım oluştur',
      icon: TeamIcon,
      color: COLORS.primary,
      screen: 'CreateTeamScreen',
    },

    // Haber ve Bilgi (Yeni Kategori)
    {
      id: 'news',
      title: 'Spor Haberleri',
      subtitle: 'Güncel basketbol haberleri',
      icon: ListIcon,
      color: COLORS.primaryMedium,
      screen: 'SportsNewsScreen',
    },

    // Sosyal Özellikler (İkinci Kategori)
    {
      id: 'search',
      title: 'Oyuncu Ara',
      subtitle: 'Yeni arkadaşlar bul',
      icon: SearchIcon,
      color: COLORS.primaryMedium,
      screen: 'PlayerSearchScreen',
    },
    {
      id: 'friends',
      title: 'Arkadaşlar',
      subtitle: 'Arkadaş listesi ve takipçiler',
      icon: FriendsIcon,
      color: COLORS.primaryLight,
      screen: 'FriendsScreen',
    },
    {
      id: 'messages',
      title: 'Mesajlar',
      subtitle: 'Sohbet ve mesajlaşma',
      icon: MessageIcon,
      color: COLORS.primaryDark,
      screen: 'MessagesScreen',
    },

    // Görüntüleme ve Takip (Üçüncü Kategori)
    {
      id: 'activities',
      title: 'Aktivitelerim',
      subtitle: 'Oluşturduklarımı görüntüle',
      icon: ListIcon,
      color: COLORS.gray,
      screen: 'MyActivitiesScreen',
    },
  ];

  return (
    <>
      {/* Modal Overlay */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <StatusBar
              backgroundColor="rgba(0,0,0,0.5)"
              barStyle="light-content"
            />

            {/* Menu Container */}
            <Animated.View
              style={[
                styles.modernMenuContainer,
                {
                  transform: [{scale: scaleValue}],
                  opacity: opacityValue,
                },
              ]}>
              {/* Header */}
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Hızlı İşlemler</Text>
                <Text style={styles.menuSubtitle}>Ne yapmak istiyorsun?</Text>
              </View>

              {/* Menu Items Grid */}
              <ScrollView
                style={styles.menuScrollView}
                showsVerticalScrollIndicator={false}
                bounces={true}>
                <View style={styles.menuGrid}>
                  {menuItems.map((item, _index) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.gridMenuItem}
                      onPress={() => navigateToScreen(item.screen)}
                      activeOpacity={0.7}>
                      <View
                        style={[
                          styles.gridMenuIconContainer,
                          {backgroundColor: item.color},
                        ]}>
                        <item.icon color={COLORS.white} />
                      </View>
                      <Text style={styles.gridMenuTitle}>{item.title}</Text>
                      <Text style={styles.gridMenuSubtitle}>
                        {item.subtitle}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.menuFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={toggleMenu}>
                  <Text style={styles.cancelButtonText}>İptal</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Plus Button */}
      <View style={styles.plusButtonContainer}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={toggleMenu}
          activeOpacity={0.8}>
          <Animated.Text
            style={[
              styles.plusButtonText,
              {
                transform: [{rotate}],
              },
            ]}>
            +
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// Ana tab navigator bileşeni
function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({navigation: _navigation}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 90,
          paddingBottom: 25,
          paddingTop: 15,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 0, // Gizle labels
          fontWeight: '500',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <View style={styles.tabIconContainer}>
              <HomeIcon color={focused ? '#000000' : '#666666'} size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <View style={styles.tabIconContainer}>
              <CalendarIcon color={focused ? '#000000' : '#666666'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={View} // Dummy component
        options={({navigation}) => ({
          tabBarLabel: '',
          tabBarIcon: () => <PlusButton navigation={navigation} />,
        })}
        listeners={{
          tabPress: e => {
            e.preventDefault(); // Prevent default tab behavior
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <View style={styles.tabIconContainer}>
              <MapIcon color={focused ? '#000000' : '#666666'} size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <View style={styles.tabIconContainer}>
              <ProfileIcon color={focused ? '#000000' : '#666666'} size={24} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnboardingScreen"
          screenOptions={{
            headerShown: false, // Ekranların kendi header'larını kullanması için
            gestureEnabled: true, // iOS swipe gesture'ı aktif
            animation: 'slide_from_right', // Modern slide animasyonu
          }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="RegisterScreen" component={SignUpScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
          <Stack.Screen
            name="CreateNewPasswordScreen"
            component={CreateNewPasswordScreen}
          />
          <Stack.Screen
            name="PasswordChangedSuccessScreen"
            component={PasswordChangedSuccessScreen}
          />
          <Stack.Screen name="AppIntroScreen" component={AppIntroScreen} />
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />

          {/* Yeni ekranlar - modal stilinde */}
          <Stack.Screen
            name="CreateEventScreen"
            component={CreateEventScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="CreateTrainingScreen"
            component={CreateTrainingScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="CreateMatchScreen"
            component={CreateMatchScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="CreateTeamScreen"
            component={CreateTeamScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="MyActivitiesScreen"
            component={MyActivitiesScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="SportsNewsScreen"
            component={SportsNewsScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="SocialFeedScreen"
            component={SocialFeedScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="DemoScreen"
            component={DemoScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="PlayerSearchScreen"
            component={PlayerSearchScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="FriendsScreen"
            component={FriendsScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="MessagesScreen"
            component={MessagesScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="FriendActivityFeedScreen"
            component={FriendActivityFeedScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Tab Icon Styles
  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  activeTabIconContainer: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    fontSize: 26,
    color: '#000000',
  },
  activeTabIcon: {
    color: '#000000',
  },
  unicodeIcon: {
    fontSize: 24,
    textAlign: 'center',
  },

  // Plus Button Styles
  plusButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E5BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  plusButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },

  // Modern Modal Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modernMenuContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    height: Dimensions.get('window').height * 0.75, // Yüksekliği artırdık
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 20,
  },
  menuHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  menuSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  menuScrollView: {
    flex: 1,
    paddingBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  gridMenuItem: {
    width: '48%',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  gridMenuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  gridMenuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
    marginBottom: 4,
  },
  gridMenuSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
  menuFooter: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
  },
  cancelButton: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 120,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default App;
