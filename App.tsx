import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-native-big-calendar';
import { Modal, TouchableOpacity, Text, View, StyleSheet, Button, TextInput } from 'react-native';

// Initial events data
const initialEvents = [
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

const CalendarWrapper = ({ events, onSwipeEnd, onLongPressCell, onPressCell }) => {
  return (
    <View>
      <Calendar
        events={events}
        onSwipeEnd={onSwipeEnd}
        onLongPressCell={onLongPressCell}
        onPressCell={onPressCell} // Added onPressDateHeader callback
        height={600}
        renderEvent={(event, touchableOpacityProps) => (
          <TouchableOpacity {...touchableOpacityProps}>
            <Text style={{ fontSize: 10, color: 'white' }}>{event.title}</Text>
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
    </View>
  );
};

const MyCalendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [activeDate, setActiveDate] = useState(new Date());
  const [key, setKey] = useState(0); // Use a key to force re-render
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [clickedDate, setClickedDate] = useState(null); // New state to store clicked date

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

  const handleLongPressCell = useCallback((date) => {
    // Open modal for new event details
    setModalVisible(true);
    // Set the clicked date
    setClickedDate(date);
  }, []);

  const handlePressCell = useCallback((date) => {
    // Filter events for the selected date
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
    setSelectedDateEvents(filteredEvents);
  }, [events]);

  const addNewEvent = () => {
    if (newEventTitle.trim() === '') return; // Don't add empty event titles

    const startTime = clickedDate; // Use the clicked date as the start time
    const endTime = new Date(startTime.getTime() + 30 * 60000); // Adding 30 minutes

    const newEvent = {
      title: newEventTitle,
      start: startTime,
      end: endTime,
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    // Reset and close modal
    setNewEventTitle('');
    setModalVisible(false);
    setClickedDate(null); // Reset clicked date
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>{formatMonthYear(activeDate)}</Text>
        </View>
        <CalendarWrapper
          key={`calendar-${key}`} // Use a dynamic key
          events={events}
          activeDate={activeDate}
          onSwipeEnd={handleSwipeEnd}
          onLongPressCell={handleLongPressCell}
          onPressCell={handlePressCell} // Added onPressDateHeader callback
        />
      </View>
      <View style={styles.eventListContainer}>
        <Text style={styles.eventListTitle}>Events for Selected Date</Text>
        {selectedDateEvents.map((event, index) => (
          <Text key={index} style={styles.eventListItem}>
            {event.title}
          </Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Jump to Current Month" onPress={handleJumpToCurrentMonth} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setNewEventTitle}
              value={newEventTitle}
              placeholder="Enter Event Title"
            />
            <Button title="Add Event" onPress={addNewEvent} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    calendarContainer: {
      flex: 1,
      paddingTop: 40,
      paddingBottom: 10, // Add padding at the bottom of the calendar
    },
    monthYearContainer: {
      padding: 10,
      alignItems: 'center',
    },
    monthYearText: {
      fontSize: 20,
    },
    eventListContainer: {
      padding: 10,
      borderTopWidth: 1, // Add a border at the top of the event list
      borderTopColor: '#ccc', // Border color for clarity
    },
    eventListTitle: {
      fontSize: 20,
      marginBottom: 10,
    },
    eventListItem: {
      fontSize: 16,
      marginBottom: 5,
    },
    buttonContainer: {
      padding: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  
  
  
  
  
  
  

export default MyCalendar;
