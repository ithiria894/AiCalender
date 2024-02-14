import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calendar = ({ monthGrid, containerWidth, year, month, handleMonthChange, handleYearChange, events, handleEventPress }) => {
  const cellWidth = containerWidth / 7;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.monthYear}>{`${month} ${year}`}</Text>
      {monthGrid.map((week, index) => (
        <View key={index} style={[styles.weekContainer, { width: containerWidth }]}>
          {week.map((day, dayIndex) => (
            <TouchableOpacity key={dayIndex} style={[styles.dayContainer, { width: cellWidth }]} onPress={() => handleEventPress(day)}>
              <Text style={[styles.dayNumber]}>{day.getDate().toString()}</Text>
              {events.map((event, eventIndex) => {
                const eventDate = new Date(event.startTime);
                if (eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month && eventDate.getDate() === day.getDate()) {
                  return (
                    <TouchableOpacity key={eventIndex} style={styles.eventContainer} onPress={() => handleEventPress(event)}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventContainer: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
});

export default Calendar;
