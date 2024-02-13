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
  const [key, setKey] = useState(0); // Use a key to force re-render
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [clickedDate, setClickedDate] = useState(null); // New state to store clicked date
  const [calendarHeight, setCalendarHeight] = useState(300); // Initial height

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
        {/* <ScrollView style={styles.calendarWrapperScroll}> */}
          <CalendarWrapper
            keyProp={`calendar-${key}`}
            events={events}
            onSwipeEnd={handleSwipeEnd}
            onLongPressCell={handleLongPressCell}
            onPressCell={handlePressCell}
          />
        {/* </ScrollView> */}
      </View>
      <View style={styles.eventListContainer}>
        <Text style={styles.eventListTitle}>Selected Date: {clickedDate ? clickedDate.toDateString() : ''}</Text>
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

export default MyCalendar;
// CalendarWrapper.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
// import {Calendar} from '../lib/react-native-big-calendar/src/components/Calendar';

const CalendarWrapper = ({ events, onSwipeEnd, onLongPressCell, onPressCell, keyProp }) => {
  return (
    <View key={keyProp}>
      <Calendar
        events={events}
        onSwipeEnd={onSwipeEnd}
        onLongPressCell={onLongPressCell}
        onPressCell={onPressCell}
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
        scrollOffsetMinutes={200}
        swipeEnabled={true}
        showAdjacentMonths={true}
        sortedMonthView={true}
        overlapOffset={20}
        moreLabel="More"
        showVerticalScrollIndicator={true}
        eventMinHeightForMonthView={5}
        eventCellStyle={(event) => ({
          backgroundColor: event.title === 'Meeting' ? 'green' : 'blue',
          borderRadius: 5,
          padding: 1,
          marginVertical: 0, // Adjust the vertical margin between event cells
          marginHorizontal: 0,
        })}
        // eventSpacing 
      />
    </View>
  );
};

export default CalendarWrapper;


// NOW THE ABOVE CODE IS SWITCHING MONTH BY SWIPE, NOW I WANT TO ADD 2 BUTTON TO THE BOTTOM OF THE CALENDERCONTAINER, TO 替代the swipe, switching months back and forth.
// u should notice that the calenderwrapper should be updated by keyprop everytime switching the month so it can render new month content.
// also the monthyearcontainer should be updated accordingly.