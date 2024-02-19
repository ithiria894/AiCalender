//EventForm.js

import { set } from "date-fns";
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Modal, StyleSheet } from "react-native";

const EventForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeating, setRepeating] = useState("");
  const [alarm, setAlarm] = useState("");

  const handleSubmit = () => {
    if (title.trim() !== "") {
      onSubmit(title, description, startTime, endTime, repeating, alarm);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setRepeating("");
      setAlarm("");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
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
          title={repeating ? "Yes" : "No"}
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
        <Button title="Save" onPress={handleSubmit} />
        <Button title="Delete" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 20,
    },  
});

export default EventForm;
