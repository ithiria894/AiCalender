import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import Event from './components/Event'; // Import the Event component

const generateMonthGrid = (year, month) => {
  const startDate = startOfMonth(new Date(year, month - 1)); // Month is 0-based in JavaScript Date
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
}

const App = () => {
  const [monthGrid, setMonthGrid] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Example usage
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Month is 0-based in JavaScript Date
    setYear(currentYear);
    setMonth(currentMonth);
    const generatedMonthGrid = generateMonthGrid(currentYear, currentMonth);
    setMonthGrid(generatedMonthGrid);
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.monthYear}>{`${format(new Date(year, month - 1), 'MMMM yyyy')}`}</Text>
      {monthGrid.map((week, index) => (
        <View key={index} style={styles.weekContainer}>
          {week.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayContainer}>
              <Text style={styles.dayNumber}>{day.getDate().toString()}</Text>
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
                      onPress={() => console.log('Edit event:', event)}
                      style={styles.eventContainer}
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
        <TouchableOpacity style={styles.prevButton} onPress={() => handleMonthChange(month - 1)}><Text>Prev Month</Text></TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => handleMonthChange(month + 1)}><Text>Next Month</Text></TouchableOpacity>
        <TouchableOpacity style={styles.prevButton} onPress={() => handleYearChange(year - 1)}><Text>Prev Year</Text></TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => handleYearChange(year + 1)}><Text>Next Year</Text></TouchableOpacity>
      </View>
      <Event onSave={handleSaveEvent} /> {/* Add the Event component here */}
    </View>
  );
}

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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  dayNumber: {
    fontSize: 10, // Adjust the font size as needed
  },
  eventContainer: {
    marginTop: 5,
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
