import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';

const EventModal = ({ onSave, visible, setVisible }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeating, setRepeating] = useState(false);

  const handleSubmit = () => {
    onSave({ title, description, startTime, endTime, repeating });
    setVisible(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setRepeating(false);
  };



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
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
          <Button title="Save" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default EventModal;
