// NewEventModal.tsx
import React from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

interface NewEventModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  newEventTitle: string;
  setNewEventTitle: (title: string) => void;
  onAddNewEvent: () => void;
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  modalVisible,
  setModalVisible,
  newEventTitle,
  setNewEventTitle,
  onAddNewEvent,
}) => {
  return (
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
          <Button title="Add Event" onPress={onAddNewEvent} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NewEventModal;
