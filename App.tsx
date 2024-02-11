import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-native-big-calendar';
import { Modal, TouchableOpacity, Text, View, StyleSheet, Button, TextInput } from 'react-native';
import axios from 'axios';

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

const CalendarWrapper = ({ events, onSwipeEnd, onPressCell }) => {
  return (
    <Calendar
      events={events}
      onSwipeEnd={onSwipeEnd}
      onPressCell={onPressCell}
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
  const [events, setEvents] = useState(initialEvents);
  const [activeDate, setActiveDate] = useState(new Date());
  const [key, setKey] = useState(0); // Use a key to force re-render
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

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

  const handlePressCell = useCallback((date) => {
    // Open modal for new event details
    setModalVisible(true);
  }, []);

  const sendToChatGPT = async (inputText) => {
    try {
      const response = await axios.post('YOUR_CHATGPT_API_ENDPOINT', {
        prompt: inputText,
        max_tokens: 50, // Adjust as needed
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error sending request to ChatGPT:', error);
      return null;
    }
  };

  const addNewEvent = async () => {
    const response = await sendToChatGPT(newEventTitle);

    if (response) {
      const [eventDate, eventTime, eventTitle] = response.split(' ');
      const startTime = new Date(`${eventDate} ${eventTime}`);
      const endTime = new Date(startTime.getTime() + 30 * 60000); // Adding 30 minutes

      const newEvent = {
        title: eventTitle,
        start: startTime,
        end: endTime,
      };

      setEvents((currentEvents) => [...currentEvents, newEvent]);
    }

    // Reset and close modal
    setNewEventTitle('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
              placeholder="Event Description"
            />
            <Button title="Add Event" onPress={addNewEvent} />
          </View>
        </View>
      </Modal>
      <View style={styles.monthYearContainer}>
        <Text style={styles.monthYearText}>{formatMonthYear(activeDate)}</Text>
      </View>
      <CalendarWrapper
        key={`calendar-${key}`} // Use a dynamic key
        events={events}
        activeDate={activeDate}
        onSwipeEnd={handleSwipeEnd}
        onPressCell={handlePressCell}
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
    height: '90%',
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
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
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
    marginTop: 0,
    paddingHorizontal: 20,
  },
});

export default MyCalendar;
