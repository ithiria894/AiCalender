import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-native-big-calendar';
import { TouchableOpacity, Text, View, StyleSheet, Button } from 'react-native';

// Sample events data
const events = [
  {
    title: 'Meeting',
    start: new Date(2024, 0, 11, 10, 0),
    end: new Date(2024, 0, 11, 10, 30),
    summary: '3412 Piedmont Rd NE, GA 3035',
  },
  {
    title: 'Coffee break',
    start: new Date(2024, 0, 11, 15, 45),
    end: new Date(2024, 0, 11, 16, 30),
  },
];

const CalendarWrapper = ({ activeDate, onSwipeEnd }) => {
  return (
    <Calendar
      events={events}
      activeDate={activeDate}
      onSwipeEnd={onSwipeEnd}
      height={400}
      renderEvent={(event, touchableOpacityProps) => (
        <TouchableOpacity {...touchableOpacityProps}>
          <Text style={{ fontSize: 10, color: 'red' }}>{event.title}</Text>
        </TouchableOpacity>
      )}
      headerContentStyle={{ backgroundColor: 'yellow' }}
      mode="month"
      locale="en"
      showTime={true}
      weekStartsOn={0}
      weekEndsOn={6}
      ampm={true}
      scrollOffsetMinutes={480}
      swipeEnabled={true}
      showAdjacentMonths={true}
      sortedMonthView={true}
      overlapOffset={20}
      moreLabel="View More"
      showVerticalScrollIndicator={true}
      eventMinHeightForMonthView={10}
      eventCellStyle={(event) => ({
        backgroundColor: event.title === 'Meeting' ? 'green' : 'blue',
        borderRadius: 5,
      })}
    />
  );
};

const MyCalendar = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [key, setKey] = useState(0); // Use a key to force re-render

  const formatMonthYear = useCallback((date) => {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }, []);

  const handleSwipeEnd = useCallback((date) => {
    setActiveDate(date);
  }, []);

  const handleJumpToCurrentMonth = useCallback(() => {
    setActiveDate(new Date()); // Set to the current date
    setKey((prevKey) => prevKey + 1); // Increment the key to force rerender
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.monthYearContainer}>
        <Text style={styles.monthYearText}>{formatMonthYear(activeDate)}</Text>
      </View>
      <CalendarWrapper
        key={`calendar-${key}`} // Use a dynamic key
        activeDate={activeDate}
        onSwipeEnd={handleSwipeEnd}
      />
      <View style={styles.buttonContainer}>
        <Button title="Jump to Current Month" onPress={handleJumpToCurrentMonth} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    height: '60%',
  },
  monthYearContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default MyCalendar;
