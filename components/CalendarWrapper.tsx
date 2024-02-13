// CalendarWrapper.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
// import {Calendar} from '../lib/react-native-big-calendar/src/components/Calendar';

const CalendarWrapper = ({ events, onSwipeEnd, onLongPressCell, onPressCell, keyProp }) => {
  return (
    <View key={keyProp}>
      <Calendar
        events={events}
        onSwipeEnd={onSwipeEnd}
        onLongPressCell={onLongPressCell}
        onPressCell={onPressCell}
        height={600}
        renderEvent={(event, touchableOpacityProps) => (
          <TouchableOpacity {...touchableOpacityProps}>
            <Text style={{ fontSize: 10, color: 'white' }}>{event.title}</Text>
          </TouchableOpacity>
        )}
        headerContentStyle={{ backgroundColor: 'yellow' }}
        mode="month"
        locale="en"
        showTime={true}
        weekStartsOn={0}
        weekEndsOn={6}
        ampm={true}
        scrollOffsetMinutes={200}
        swipeEnabled={true}
        showAdjacentMonths={true}
        sortedMonthView={true}
        overlapOffset={10}
        moreLabel="More"
        showVerticalScrollIndicator={true}
        eventMinHeightForMonthView={5}
        eventCellStyle={(event) => ({
          backgroundColor: event.title === 'Meeting' ? 'green' : 'blue',
          borderRadius: 5,
          padding: 1,
          marginVertical: 0, // Adjust the vertical margin between event cells
          marginHorizontal: 0,
        })}
        // eventSpacing
        disableMonthEventCellPress={true}
      />
    </View>
  );
};

export default CalendarWrapper;