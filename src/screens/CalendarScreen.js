import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

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

const CalendarScreen = ({navigation}) => {
  // Takvim ayarları
  const [currentMonth] = useState('Mayıs 2025');
  const [viewMode, setViewMode] = useState('month'); // 'month' veya 'week'
  const [selectedDate, setSelectedDate] = useState(18); // Figma'da seçili gün
  const [currentWeek, setCurrentWeek] = useState(2); // Mayıs'ın hangi haftası (0-4)

  // Hafta günleri
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Mayıs 2025 takvim günleri
  const calendarDays = [
    // İlk hafta (Perşembe başlıyor - 1 Mayıs)
    {day: null},
    {day: null},
    {day: null},
    {day: 1},
    {day: 2},
    {day: 3},
    {day: 4},
    // İkinci hafta
    {day: 5},
    {day: 6},
    {day: 7},
    {day: 8},
    {day: 9},
    {day: 10},
    {day: 11},
    // Üçüncü hafta
    {day: 12},
    {day: 13},
    {day: 14},
    {day: 15, hasEvent: true},
    {day: 16},
    {day: 17},
    {day: 18, hasEvent: true, selected: true},
    // Dördüncü hafta
    {day: 19},
    {day: 20},
    {day: 21},
    {day: 22, hasEvent: true},
    {day: 23},
    {day: 24},
    {day: 25, hasEvent: true},
    // Beşinci hafta
    {day: 26},
    {day: 27},
    {day: 28},
    {day: 29},
    {day: 30},
    {day: 31},
  ];

  // Haftalık görünüm için hafta verilerini organize et
  const organizeWeeks = () => {
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks;
  };

  const weeks = organizeWeeks();

  // Seçili günün hangi haftada olduğunu bul
  const findWeekOfSelectedDate = () => {
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];
      if (week.some(day => day.day === selectedDate)) {
        return weekIndex;
      }
    }
    return 0;
  };

  // Hafta navigasyonu
  const goToPreviousWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const goToNextWeek = () => {
    if (currentWeek < weeks.length - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  // Günün etkinlikleri
  const [todayEvents] = useState([
    {
      id: 1,
      title: 'Basketbol Turnuvası',
      time: '19:30',
      duration: '120 dk',
      location: 'Spor Salonu',
      description: 'Yerel Basketbol Ligi Çeyrek Final Maçı',
      icon: '🏀',
      type: 'tournament',
    },
    {
      id: 2,
      title: 'Kondisyon Antrenmanı',
      time: '16:00',
      duration: '90 dk',
      location: 'Fitness Center',
      description: 'Kardiyovasküler dayanıklılık çalışması',
      icon: '💪',
      type: 'training',
    },
  ]);

  // Takvim günü render (aylık görünüm)
  const renderCalendarDay = ({item, index}) => {
    if (!item.day) {
      return <View style={styles.emptyDay} />;
    }

    const isSelected = item.day === selectedDate;
    const hasEvent = item.hasEvent;

    return (
      <TouchableOpacity
        style={[styles.calendarDay, isSelected && styles.selectedCalendarDay]}
        onPress={() => setSelectedDate(item.day)}>
        <Text
          style={[
            styles.calendarDayText,
            isSelected && styles.selectedCalendarDayText,
          ]}>
          {item.day}
        </Text>
        {hasEvent && <View style={styles.eventDot} />}
      </TouchableOpacity>
    );
  };

  // Haftalık görünüm günü render
  const renderWeekDay = ({item, index}) => {
    if (!item.day) {
      return <View style={styles.emptyWeekDay} />;
    }

    const isSelected = item.day === selectedDate;
    const hasEvent = item.hasEvent;

    return (
      <TouchableOpacity
        style={[styles.weekDay, isSelected && styles.selectedWeekDay]}
        onPress={() => setSelectedDate(item.day)}>
        <Text style={styles.weekDayName}>{weekDays[index]}</Text>
        <Text
          style={[
            styles.weekDayNumber,
            isSelected && styles.selectedWeekDayNumber,
          ]}>
          {item.day}
        </Text>
        {hasEvent && <View style={styles.weekEventDot} />}
      </TouchableOpacity>
    );
  };

  // Etkinlik kartı render
  const renderEventCard = ({item}) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.eventIconContainer}>
          <Text style={styles.eventIcon}>{item.icon}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.eventDetails}>
            <View style={styles.eventDetailItem}>
              <Text style={styles.eventDetailIcon}>🕐</Text>
              <Text style={styles.eventDetailText}>{item.time}</Text>
            </View>
            <View style={styles.eventDetailSeparator}>
              <Text style={styles.separatorText}>•</Text>
            </View>
            <View style={styles.eventDetailItem}>
              <Text style={styles.eventDetailIcon}>⏱️</Text>
              <Text style={styles.eventDetailText}>{item.duration}</Text>
            </View>
            <View style={styles.eventDetailSeparator}>
              <Text style={styles.separatorText}>•</Text>
            </View>
            <View style={styles.eventDetailItem}>
              <Text style={styles.eventDetailIcon}>📍</Text>
              <Text style={styles.eventDetailText}>{item.location}</Text>
            </View>
          </View>
          <Text style={styles.eventDescription}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.eventActions}>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Katıl</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Detaylar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // View mode değişikliği
  const handleViewModeChange = mode => {
    setViewMode(mode);
    if (mode === 'week') {
      // Seçili günün haftasına geç
      const weekIndex = findWeekOfSelectedDate();
      setCurrentWeek(weekIndex);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.monthTitle}>{currentMonth}</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === 'month' && styles.activeToggleButton,
              ]}
              onPress={() => handleViewModeChange('month')}>
              <Text
                style={[
                  styles.toggleButtonText,
                  viewMode === 'month' && styles.activeToggleButtonText,
                ]}>
                Ay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === 'week' && styles.activeToggleButton,
              ]}
              onPress={() => handleViewModeChange('week')}>
              <Text
                style={[
                  styles.toggleButtonText,
                  viewMode === 'week' && styles.activeToggleButtonText,
                ]}>
                Hafta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Haftalık görünüm navigasyonu */}
        {viewMode === 'week' && (
          <View style={styles.weekNavigation}>
            <TouchableOpacity
              style={[
                styles.weekNavButton,
                currentWeek === 0 && styles.disabledNavButton,
              ]}
              onPress={goToPreviousWeek}
              disabled={currentWeek === 0}>
              <Text
                style={[
                  styles.weekNavButtonText,
                  currentWeek === 0 && styles.disabledNavButtonText,
                ]}>
                ‹
              </Text>
            </TouchableOpacity>
            <Text style={styles.weekTitle}>{currentWeek + 1}. Hafta</Text>
            <TouchableOpacity
              style={[
                styles.weekNavButton,
                currentWeek === weeks.length - 1 && styles.disabledNavButton,
              ]}
              onPress={goToNextWeek}
              disabled={currentWeek === weeks.length - 1}>
              <Text
                style={[
                  styles.weekNavButtonText,
                  currentWeek === weeks.length - 1 &&
                    styles.disabledNavButtonText,
                ]}>
                ›
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Aylık görünüm */}
        {viewMode === 'month' && (
          <>
            {/* Hafta günleri başlıkları */}
            <View style={styles.weekDaysHeader}>
              {weekDays.map((day, index) => (
                <View key={index} style={styles.weekDayContainer}>
                  <Text style={styles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Takvim Grid */}
            <View style={styles.calendarGrid}>
              <FlatList
                data={calendarDays}
                renderItem={renderCalendarDay}
                keyExtractor={(item, index) => index.toString()}
                numColumns={7}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        )}

        {/* Haftalık görünüm */}
        {viewMode === 'week' && (
          <View style={styles.weekView}>
            <FlatList
              data={weeks[currentWeek] || []}
              renderItem={renderWeekDay}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weekDaysContainer}
            />
          </View>
        )}

        {/* Günün Etkinlikleri */}
        <View style={styles.eventsSection}>
          <View style={styles.eventsSectionHeader}>
            <Text style={styles.eventsSectionTitle}>Günün Etkinlikleri</Text>
            <Text style={styles.selectedDateText}>
              {selectedDate} Mayıs 2025
            </Text>
          </View>

          <FlatList
            data={todayEvents}
            renderItem={renderEventCard}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Alt boşluk */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingBottom: 100, // Tab bar için space
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeToggleButton: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  activeToggleButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },

  // Hafta navigasyonu
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  weekNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledNavButton: {
    backgroundColor: COLORS.background,
  },
  weekNavButtonText: {
    fontSize: 18,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  disabledNavButtonText: {
    color: COLORS.lightGray,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },

  // Hafta günleri header
  weekDaysHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  weekDayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },

  // Aylık Takvim Grid
  calendarGrid: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  calendarDay: {
    width: '14.28%', // 7 gün için
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 4,
  },
  selectedCalendarDay: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  calendarDayText: {
    fontSize: 16,
    color: COLORS.primaryDark,
    fontWeight: '500',
  },
  selectedCalendarDayText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  eventDot: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.orange,
  },

  // Haftalık görünüm
  weekView: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  weekDaysContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  weekDay: {
    width: 45,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 12,
    position: 'relative',
  },
  selectedWeekDay: {
    backgroundColor: COLORS.primary,
  },
  emptyWeekDay: {
    width: 45,
    height: 70,
    marginHorizontal: 4,
  },
  weekDayName: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
    marginBottom: 8,
  },
  weekDayNumber: {
    fontSize: 18,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  selectedWeekDayNumber: {
    color: COLORS.white,
  },
  weekEventDot: {
    position: 'absolute',
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.orange,
  },

  // Etkinlikler Section
  eventsSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  eventsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  selectedDateText: {
    fontSize: 14,
    color: COLORS.gray,
  },

  // Etkinlik Kartları
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  eventIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventIcon: {
    fontSize: 24,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  eventDetailText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  eventDetailSeparator: {
    marginHorizontal: 8,
  },
  separatorText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  eventDescription: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    opacity: 0.8,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 12,
  },
  joinButton: {
    backgroundColor: COLORS.primaryBright,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  joinButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  detailsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CalendarScreen;
