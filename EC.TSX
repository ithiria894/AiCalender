// EventComponent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import styles from './styles';

const EventComponent = ({ events, setEvents, modalVisible, setModalVisible, selectedEvent, setSelectedEvent }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeating, setRepeating] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null


  const handleSaveEvent = () => {
    const newEvent = { title, description, startTime, endTime, repeating };
    if (selectedEvent) {
      const updatedEvents = events.map(event =>
        event === selectedEvent ? { ...event, ...newEvent } : event
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
    } else {
      setEvents([...events, newEvent]);
    }
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setRepeating(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(event => event !== selectedEvent);
    setEvents(updatedEvents);
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setRepeating(false);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setRepeating(event.repeating);
    setModalVisible(true);
  };

  return (
    <View>
    <View style={styles.eventListContainer}>
          <Text style={styles.eventListHeader}>Events</Text>
          {events.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventListItem}
              onPress={() => handleEventPress(event)}
            >
              <Text style={styles.eventListItemText}>{event.title}</Text>
              <Text style={styles.eventListItemText}>Description: {event.description}</Text>
              <Text style={styles.eventListItemText}>Start Time: {event.startTime}</Text>
              <Text style={styles.eventListItemText}>End Time: {event.endTime}</Text>
              <Text style={styles.eventListItemText}>Repeating: {event.repeating ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.eventModalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Title:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTitle}
                  value={title}
                />
                <Text>Description:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDescription}
                  value={description}
                />
                <Text>Start Time:</Text>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <Text>End Time:</Text>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <View style={styles.checkboxContainer}>
                  <Text>Repeating:</Text>
                  <Button
                    title={repeating ? 'Yes' : 'No'}
                    onPress={() => setRepeating(!repeating)}
                  />
                </View>
                <View style={styles.modalButtonContainer}>
                  <Button title="Save" onPress={handleSaveEvent} />
                  <Button title="Delete" onPress={handleDeleteEvent} />
                </View>
              </View>
            </View>
          </Modal>
          
    </View>
    </View>
  );
};

export default EventComponent;
