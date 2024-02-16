//AlarmComponent.tsx
import React from 'react';
import { View, Button, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const AlarmComponent = ({ event }) => {
  const scheduleAlarm = (event) => {
    const eventDate = new Date(event.startTime);
    const alarmTime = new Date(eventDate.getTime() - event.alarm * 60000); // alarm time in minutes before event

    PushNotification.localNotificationSchedule({
      title: "Event Reminder",
      message: `Don't forget your event: ${event.title}`,
      date: alarmTime,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      /* Android Only Properties */
      repeatTime: 1, // (optional) set a repeat interval for Android, default: 0 (none)
      repeatType: 'time', // (optional) repeat interval type, time or calendar. (Android only)
    });
  };

  return (
    <View>
      <Button
        title="Set Alarm"
        onPress={() => scheduleAlarm(event)}
      />
    </View>
  );
};

export default AlarmComponent;
