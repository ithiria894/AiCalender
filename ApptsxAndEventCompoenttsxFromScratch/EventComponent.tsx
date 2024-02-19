// EventComponent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, Platform } from 'react-native';
import styles from './styles';
import { set } from 'date-fns';
import PushNotification from 'react-native-push-notification';
// import AlarmComponent from './AlarmComponent'; // Adjust the path as necessary
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { format } from 'date-fns';

const EventComponent = ({ showEvent, event, events, setEvents, showAddButton, showEventList, selectedDate }) => {
  
  console.log("Inside EventComponent, received selectedDate:", selectedDate);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startTime, setStartTime] = useState(event?.startTime || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const [repeating, setRepeating] = useState(event?.repeating || false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alarm, setAlarm] = useState(event?.alarm || 15);
  const today = new Date();
  const [effectiveSelectedDate, setEffectiveSelectedDate] = useState(selectedDate ?? format(today, 'yyyy-MM-dd'));
  
  useEffect(() => {
    if (selectedDate) {
        console.log("In useEffect of  eventComponent, selectedDate:", selectedDate);
        setEffectiveSelectedDate(selectedDate);
    }
  }, [selectedDate]); // This useEffect will run every time `selectedDate` changes.
  

  // const [eventIndex, setEventIndex] = useState(null);
  // const [event, setEvent] = useState(null);
  // const [events, setEvents] = useState([]);

  const showAlert = (title, message) => {
    // Check if the standard web alert is available, otherwise fall back to console.log
    if (typeof alert === "function") {
      alert(`${title}\n\n${message}`);
    } else {
      console.log(`${title}: ${message}`);
    }
  };


  const scheduleAlarmForEvent = (event) => {
    const eventDate = new Date(event.startTime);
    const alarmTime = new Date(eventDate.getTime() - event.alarm * 60000); // Adjust based on the event's alarm setting

    // PushNotification.localNotificationSchedule({
    //   title: "Event Reminder",
    //   message: `Don't forget your event: ${event.title}`,
    //   date: alarmTime,
    //   allowWhileIdle: true,
    // });

    //test in window
    showAlert("Alarm Scheduled", `Alarm set for event: ${event.title} at ${alarmTime.toLocaleString()}`);
  };

  const handleSaveEvent = () => {
    const alarmValue = alarm === '1HR' ? 60 : alarm === '2HR' ? 120 : alarm === '5' ? 5 : alarm === '15' ? 15 : alarm === '30' ? 30 : alarm === '0' ? 0 : 15;
    const newEvent = { title, description, startTime, endTime, repeating, alarm: alarmValue };
    let messageBody = '';
    if (selectedEvent) {
      const updatedEvents = events.map(event =>
        event === selectedEvent ? { ...event, ...newEvent } : event
      );
      setEvents(updatedEvents);
      scheduleAlarmForEvent({ ...selectedEvent, ...newEvent }); // Schedule alarm for updated event
      messageBody = `Updated event: ${title}\nStart: ${startTime}\nEnd: ${endTime}\nAlarm set for: ${new Date(new Date(startTime).getTime() - newEvent.alarm * 60000).toLocaleString()}`;
      setSelectedEvent(null);
    } else {
      setEvents([...events, newEvent]);
      scheduleAlarmForEvent(newEvent); // Schedule alarm for new event
      messageBody = `New event created: ${title}\nStart: ${startTime}\nEnd: ${endTime}\nAlarm set for: ${new Date(new Date(startTime).getTime() - newEvent.alarm * 60000).toLocaleString()}`;
    }
    // Resetting the modal and fields
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setRepeating(false);
    setAlarm(0);

    showAlert('Event Saved', messageBody);
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
    setAlarm(0);
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
    setAlarm(event.alarm);
    setModalVisible(true);

  };

  // const effectiveSelectedDate = selectedDate ?? new Date().toISOString().split('T')[0];

  const filteredEvents = events.filter(event => {
    // console.log('effectiveSelectedDate', effectiveSelectedDate);
    // const formattedSelectedDate = new Date(effectiveSelectedDate).toISOString().split('T')[0];
    console.log('selectedday', selectedDate);
    const eventDate = new Date(event.startTime).toISOString().split('T')[0];
    console.log('eventDate', eventDate);
    
    // return eventDate === formattedSelectedDate;
    return eventDate === selectedDate;
  });

  return (
    <View>
      {showEventList && (
        <View style={styles.eventListContainer}>
          <Text style={styles.eventListHeader}>Events of {selectedDate}</Text>


          {filteredEvents.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventListItem}
              onPress={() => handleEventPress(event)}
            >
              <Text style={styles.eventListItemText}>{event.title}</Text>
              <Text style={styles.eventListItemText}>Description: {event.description}</Text>
              {/* get the hour and minute from the date */}
              <Text style={styles.eventListItemText}>Start Time: {format(event.startTime, 'HH:mm')}</Text>
              <Text style={styles.eventListItemText}>End Time: {event.endTime}</Text>
              <Text style={styles.eventListItemText}>Repeating: {event.repeating ? 'Yes' : 'No'}</Text>
              <Text style={styles.eventListItemText}>Alarm: {event.alarm}</Text>
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
              <Text>Alarm:</Text>
              <Picker
                selectedValue={alarm}
                style={styles.input} // Adjust the style as needed
                onValueChange={(itemValue, itemIndex) => setAlarm(itemValue)}
              >
                <Picker.Item label="None" value="0" />
                <Picker.Item label="5 minutes" value="5" />
                <Picker.Item label="15 minutes" value="15" />
                <Picker.Item label="30 minutes" value="30" />
                <Picker.Item label="1 hour" value="1HR" />
                <Picker.Item label="2 hours" value="2HR" />
              </Picker>

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
        showEvent && (
          <TouchableOpacity
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
