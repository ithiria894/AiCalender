// EventItem.js
import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { EventContext } from './EventContext';
import EventForm from './EventForm';

const EventItem = ({ id, title, description, startTime, endTime, repeating, alarm }) => {
    const { removeEvent, editEvent } = useContext(EventContext);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = (newtitle, newdescription, newstartTime, newendTime, newrepeating, newalarm) => {
        editEvent(id, newtitle, newdescription, newstartTime, newendTime, newrepeating, newalarm);
        setModalVisible(false);
    };

    const handleRemove = () => {
        removeEvent(id);
    }

    return (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.eventContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.time}>{startTime} - {endTime}</Text>
            <Text style={styles.repeating}>{repeating}</Text>
            <Text style={styles.alarm}>{alarm}</Text>
            <Button title="Delete" color="red" onPress={handleRemove} />
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
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    eventContainer: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    title: {
        fontSize: 24,
    },
    description: {
        fontSize: 18,
    },
    time: {
        fontSize: 16,
    },
    repeating: {
        fontSize: 16,
    },
    alarm: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default EventItem;