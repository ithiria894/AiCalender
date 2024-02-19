// EventContext.js
import React, { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Alert } from 'react-native';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [events, setEvents] = useState([]);

  const addEvent = (title, description, startTime, endTime, repeating, alarm) => {
    const newEvents = {
        id:Date.now(),
        title,
        description,
        startTime,
        endTime,
        repeating,
        alarm,

    };
    setEvents([...events, newEvents]);
    };

    const removeEvent = (id) => {
        setEvents(events.filter((event) => event.id !== id));
    };

    const editEvent = (id, newtitle, newdescription, newstartTime, newendTime, newrepeating, newalarm) => {
        setEvents(events.map(event => {
            if (event.id === id) {
              return {
                ...event,
                title: newtitle,
                description: newdescription,
                startTime: newstartTime,
                endTime: newendTime,
                repeating: newrepeating,
                alarm: newalarm,
              };
            }
            return event;
          }));
    };


  const value = {
    selectedEvent,
    setSelectedEvent,
    selectedDate,
    setSelectedDate,
    events,
    setEvents,
    addEvent,
    removeEvent,
    editEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
