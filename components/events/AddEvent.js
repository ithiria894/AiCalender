// AddEvent.js
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Modal, StyleSheet } from "react-native";
import { EventContext } from "./EventContext";
import EventForm from "./EventForm";

const AddEvent = () => {
  const { addEvent } = useContext(EventContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (title, description, startTime, endTime, repeating, alarm) => {
    addEvent(title,description, startTime, endTime, repeating, alarm);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <EventForm onSubmit={handleSubmit} onCancel={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddEvent;