import React, { useState, useCallback } from 'react';
import { Modal, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { styles } from './styles';
import CalendarWrapper from './components/CalendarWrapper';

// Initial events data
const initialEvents = [
  {
    title: 'Meeting',
    start: new Date(2024, 1, 12, 10, 0),
    end: new Date(2024, 1, 12, 10, 30),
    summary: '3412 Piedmont Rd NE, GA 3035',
  },
  {
    title: 'Coffee break',
    start: new Date(2024,1, 12, 15, 45),
    end: new Date(2024, 1, 12, 16, 30),
  },
];

const MyCalendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [activeDate, setActiveDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [clickedDate, setClickedDate] = useState(null); // New state to store clicked date
  const [calendarHeight, setCalendarHeight] = useState(300); // Initial height
  const [key, setKey] = useState(0);
  const [todoList, setTodoList] = useState([]);

  

  const formatMonthYear = useCallback((date) => {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }, []);

  const handleSwipeEnd = useCallback((date) => {
    setActiveDate(date);
  }, []);

  const handleJumpToCurrentMonth = useCallback(() => {
    ///
    const previousMonth = new Date(activeDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setActiveDate(previousMonth);
    ///
    // setActiveDate(new Date()); 
    setKey((prevKey) => prevKey + 1);// Set to the current date
  }, []);

  const handlePreviousMonth = useCallback(() => {
    const previousMonth = new Date(activeDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setActiveDate(previousMonth);
    setKey((prevKey) => prevKey + 1);
  }, [activeDate]);

  const handleNextMonth = useCallback(() => {
    const nextMonth = new Date(activeDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setActiveDate(nextMonth);
    setKey((prevKey) => prevKey + 1);
  }, [activeDate]);

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
    // Update clickedDate to the selected date
    setClickedDate(date);
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
          keyProp={`calendar-${key}`}
          events={events}
          onSwipeEnd={handleSwipeEnd}
          onLongPressCell={handleLongPressCell}
          onPressCell={handlePressCell}
          activeDate={activeDate} // Pass activeDate to CalendarWrapper
        />
      </View>
      <View style={styles.BothListContainer}>
      <View style={styles.eventListContainer}>
        <Text style={styles.eventListTitle}>Selected Date: {clickedDate ? clickedDate.toDateString() : ''}</Text>
        {selectedDateEvents.map((event, index) => (
          <Text key={index} style={styles.eventListItem}>
            {event.title}
          </Text>
        ))}
      </View>
      {/* //make a new todo list container here/ */}
      <View style={styles.todoListContainer}>
        <Text style={styles.eventListTitle}>To Do List</Text>
        <ScrollView>
        {selectedDateEvents.map((todoList, index) => (
          <Text key={index} style={styles.eventListItem}>
            {todoList.title}
          </Text>
        ))}
        </ScrollView>
      </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Previous Month" onPress={handlePreviousMonth} />
        <Button title="Next Month" onPress={handleNextMonth} />
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

export default MyCalendar;
