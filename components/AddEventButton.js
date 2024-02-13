import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AddEventButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddEventButton;
