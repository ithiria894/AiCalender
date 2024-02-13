import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Header } from 'react-native-elements';
import Picker from '@react-native-picker/picker'; // Import Picker from the correct package
import styled from 'styled-components/native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(''); // Define selectedDate state
  const [events, setEvents] = useState({});

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveInput = (value, color) => {
    const newEvents = { ...events, [selectedDate]: { text: value, color: color, completed: false } };
    const newMarkedDates = {
      ...markedDates,
      [selectedDate]: { selected: true, marked: true, dotColor: color },
    };
    setEvents(newEvents);
    setMarkedDates(newMarkedDates);
    setTextInputValue('');
    setModalVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Set selectedDate when a day is pressed
    const existingEvent = events[day.dateString];
    if (existingEvent) {
      setTextInputValue(existingEvent.text);
    } else {
      setTextInputValue('');
    }
    setModalVisible(true);
  };

  const deleteEvent = (date) => {
    const updatedEvents = { ...events };
    delete updatedEvents[date];
    setEvents(updatedEvents);

    const updatedMarkedDates = { ...markedDates };
    delete updatedMarkedDates[date];
    setMarkedDates(updatedMarkedDates);
  };

  const toggleCompletion = (date) => {
    const updatedEvents = { ...events };
    updatedEvents[date].completed = !updatedEvents[date].completed;
    setEvents(updatedEvents);
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'My Calendar App', style: { color: '#fff', fontSize: 20 } }}
        backgroundColor="#3D6DCC"
      />
      <Calendar
        current={Date()}
        minDate={'2020-01-01'}
        maxDate={'2030-12-31'}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths={true}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.textInput}
            onChangeText={setTextInputValue}
            placeholder="Enter event details"
            value={textInputValue}
            multiline={true}
          />
          <View style={styles.colorPicker}>
            <Text>Select Event Color:</Text>
            <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'red' }]} onPress={() => saveInput(textInputValue, 'red')} />
            <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'green' }]} onPress={() => saveInput(textInputValue, 'green')} />
            <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'blue' }]} onPress={() => saveInput(textInputValue, 'blue')} />
          </View>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
      <ScrollView style={styles.eventList}>
        {Object.keys(events).map((date) => (
          <View key={date} style={[styles.eventItem, { backgroundColor: events[date].color }]}>
            <TouchableOpacity onPress={() => toggleCompletion(date)}>
              <Text style={[styles.eventText, events[date].completed && styles.completedText]}>
                {events[date].text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteEvent(date)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalView: {
    marginTop: '50%',
    marginHorizontal: 20,
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
  textInput: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 100, // Adjust the height to make it larger
    fontSize: 20, // Adjust the font size to make it larger
    borderColor: 'gray',
    borderWidth: 1,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  eventList: {
    flex: 1,
    paddingTop: 20,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  eventText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
  multiLineTextInput: {
    height: 100, // Adjust the height as needed
  },
  
});
