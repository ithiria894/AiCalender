// App.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import Event from './components/Event';

const App = () => {
  const [monthGrid, setMonthGrid] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    setYear(currentYear);
    setMonth(currentMonth);
    const generatedMonthGrid = generateMonthGrid(currentYear, currentMonth);
    setMonthGrid(generatedMonthGrid);

    // Update container width when the window is resized
    const handleResize = () => {
      setContainerWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', handleResize);
    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const generateMonthGrid = (year, month) => {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(startDate);
    const startWeek = startOfWeek(startDate);
    const endWeek = endOfWeek(endDate);

    const days = eachDayOfInterval({ start: startWeek, end: endWeek });
    const monthGrid = [];
    let week = [];

    days.forEach((day, index) => {
      week.push(day);

      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        monthGrid.push(week);
        week = [];
      }
    });

    return monthGrid;
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    const generatedMonthGrid = generateMonthGrid(year, newMonth);
    setMonthGrid(generatedMonthGrid);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
    const generatedMonthGrid = generateMonthGrid(newYear, month);
    setMonthGrid(generatedMonthGrid);
  };

  const handleSaveEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true); // Show the modal
  };

  const getRowHeight = (week) => {
    let maxHeight = 100; // Default height
    week.forEach(day => {
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.startTime);
        return (
          eventDate.getFullYear() === year &&
          eventDate.getMonth() + 1 === month &&
          eventDate.getDate() === day.getDate()
        );
      });
      const cellHeight = Math.max(100, 30 + dayEvents.length * 20 + (dayEvents.length - 1) * 5); // Add gap between events
      maxHeight = Math.max(maxHeight, cellHeight);
    });
    return maxHeight;
  };

  const cellWidth = containerWidth / 7;

  return (
    <ScrollView horizontal={true}>
      <View style={[styles.container, { width: containerWidth }]}>
        <Text style={styles.monthYear}>{format(new Date(year, month - 1), 'MMMM yyyy')}</Text>
        {monthGrid.map((week, index) => (
          <View key={index} style={[styles.weekContainer, { width: containerWidth, height: getRowHeight(week) }]}>
            {week.map((day, dayIndex) => (
              <View key={dayIndex} style={[styles.dayContainer, { width: cellWidth }]}>
                <Text style={[styles.dayNumber]}>
                  {day.getDate().toString()}
                </Text>
                {events.map((event, eventIndex) => {
                  const eventDate = new Date(event.startTime);
                  if (
                    eventDate.getFullYear() === year &&
                    eventDate.getMonth() + 1 === month &&
                    eventDate.getDate() === day.getDate()
                  ) {
                    return (
                      <TouchableOpacity
                        key={eventIndex}
                        style={styles.eventContainer}
                        onPress={() => handleEventPress(event)}
                      >
                        <Text style={styles.eventTitle}>{event.title}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            ))}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={() => handleMonthChange(month - 1)}>
            <Text>Prev Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => handleMonthChange(month + 1)}>
            <Text>Next Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.prevButton} onPress={() => handleYearChange(year - 1)}>
            <Text>Prev Year</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => handleYearChange(year + 1)}>
            <Text>Next Year</Text>
          </TouchableOpacity>
        </View>
        <Event onSave={handleSaveEvent} selectedEvent={selectedEvent} visible={modalVisible} setVisible={setModalVisible} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: 'row',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  dayNumber: {
    fontSize: 10,
  },
  eventContainer: {
    marginTop: 2,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  prevButton: {
    marginHorizontal: 5,
  },
  nextButton: {
    marginHorizontal: 5,
  },
});

export default App;
