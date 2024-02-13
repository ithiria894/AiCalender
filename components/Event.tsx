// Event.tsx

import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const Event = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [repeating, setRepeating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartTime(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndTime(date);
    hideEndDatePicker();
  };

  const handleSubmit = () => {
    onSave({ title, description, startTime, endTime, repeating });
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setStartTime(new Date());
    setEndTime(new Date());
    setRepeating(false);
  };

  return (
    <View style={styles.container}>
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
            <Button title="Select Start Date" onPress={showStartDatePicker} />
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
            <Text>End Time:</Text>
            <Button title="Select End Date" onPress={showEndDatePicker} />
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="datetime"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
            <View style={styles.checkboxContainer}>
              <Text>Repeating:</Text>
              <Button
                title={repeating ? 'Yes' : 'No'}
                onPress={() => setRepeating(!repeating)}
              />
            </View>
            <Button title="Save" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
      <Button
        title="Add Event"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Event;
