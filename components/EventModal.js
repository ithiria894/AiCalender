import React from 'react';
import { Modal, View, TextInput, Button, Text, StyleSheet } from 'react-native';

const EventModal = ({ modalVisible, setModalVisible, title, setTitle, description, setDescription, startTime, setStartTime, endTime, setEndTime, repeating, setRepeating, handleSaveEvent }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Title:</Text>
          <TextInput style={styles.input} onChangeText={setTitle} value={title} />
          <Text>Description:</Text>
          <TextInput style={styles.input} onChangeText={setDescription} value={description} />
          <Text>Start Time:</Text>
          <TextInput style={styles.input} onChangeText={setStartTime} value={startTime} />
          <Text>End Time:</Text>
          <TextInput style={styles.input} onChangeText={setEndTime} value={endTime} />
          <View style={styles.checkboxContainer}>
            <Text>Repeating:</Text>
            <Button title={repeating ? 'Yes' : 'No'} onPress={() => setRepeating(!repeating)} />
          </View>
          <Button title="Save" onPress={handleSaveEvent} />
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
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default EventModal;
