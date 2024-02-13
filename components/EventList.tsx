// EventList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventListProps {
  events: any[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <View style={styles.eventListContainer}>
      <Text style={styles.eventListTitle}>Events for Selected Date</Text>
      {events.map((event, index) => (
        <Text key={index} style={styles.eventListItem}>
          {event.title}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  eventListContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  eventListTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  eventListItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EventList;
