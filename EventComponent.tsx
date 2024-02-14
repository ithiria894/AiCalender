// EventComponent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import styles from './styles';

const EventComponent = ({ showEvent, event, events, setEvents, showAddButton, showEventList}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startTime, setStartTime] = useState(event?.startTime || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const [repeating, setRepeating] = useState(event?.repeating || false);  
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [eventIndex, setEventIndex] = useState(null);
  // const [event, setEvent] = useState(null);
  // const [events, setEvents] = useState([]);



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
    console.log('event', event);
    console.log('eventtitle::', event.title);
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
      {showEventList && (
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
        </View>)}

      {/* {showModal && ( */}
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
        {/* )} */}


      {/* I only want to display this button in some situation */}
      {showAddButton && (
        <Button
          title="Add Event"
          onPress={() => {
            setSelectedEvent(null);
            setModalVisible(true);
          }}
        />
      )}

      {
        showEvent &&(
          <TouchableOpacity
            // key={index} // 'key' is important here for React's list rendering
            style={styles.eventContainer}
            onPress={() => handleEventPress(event)}
          >
            <Text style={styles.eventTitle}>{event.title}</Text>
          </TouchableOpacity>
        )
      }

    </View>
  );
};
EventComponent.defaultProps = {
  showAddButton: false,
  showEventList: false,
  // showModal: false,
  showEvent: false,
};
export default EventComponent;
