// EventList.js
import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import EventItem from './EventItem';
import { EventContext } from './EventContext';

const EventList = () => {
    const { events } = useContext(EventContext);
    
    return (
        <View>
        <FlatList
            data={events}
            renderItem={({ item }) => <EventItem event={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
        </View>
    );
    };

export default EventList;