import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TextInput, Button } from 'react-native';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, set } from 'date-fns';
import styles from './styles';
// import styles from "./styles"
import EventComponent from './EventComponent';
import TodoListComponent from './TodoListComponent';



const App = () => {
  const [monthGrid, setMonthGrid] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [events, setEvents] = useState([]);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const [todos, setTodos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalVisibleTodo, setModalVisibleTodo] = useState(false);
  const [event, setEvent] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);


  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    setYear(currentYear);
    setMonth(currentMonth);
    const generatedMonthGrid = generateMonthGrid(currentYear, currentMonth);
    setMonthGrid(generatedMonthGrid);

    // Update container width when the window is resized
    const handleResize = () => {
      setContainerWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', handleResize);
    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const generateMonthGrid = (year, month) => {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(startDate);
    const startWeek = startOfWeek(startDate);
    const endWeek = endOfWeek(endDate);

    const days = eachDayOfInterval({ start: startWeek, end: endWeek });
    const monthGrid = [];
    let week = [];

    days.forEach((day, index) => {
      week.push(day);

      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        monthGrid.push(week);
        week = [];
      }
    });

    return monthGrid;
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    const generatedMonthGrid = generateMonthGrid(year, newMonth);
    setMonthGrid(generatedMonthGrid);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
    const generatedMonthGrid = generateMonthGrid(newYear, month);
    setMonthGrid(generatedMonthGrid);
  };


  const getRowHeight = (week) => {
    let maxHeight = 100; // Default height
    week.forEach(day => {
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.startTime);
        return (
          eventDate.getFullYear() === year &&
          eventDate.getMonth() + 1 === month &&
          eventDate.getDate() === day.getDate()
        );
      });
      const cellHeight = Math.max(100, 30 + dayEvents.length * 20 + (dayEvents.length - 1) * 5); // Add gap between events
      maxHeight = Math.max(maxHeight, cellHeight);
    });
    return maxHeight;
  };

  const cellWidth = containerWidth / 7;

  const handleAddEvent = () => {
    console.log('Add Event pressed');
    setSelectedEvent(null);
    setModalVisible(true);
  };
  // const handleEventPress = (event) => {
  //   setSelectedEvent(event);
  //   setModalVisible(true);
  // };

  const handleAddTodo = () => {
    console.log('Add Todo pressed');
    setSelectedTodo(null);
    setModalVisibleTodo(true);
  }
  // const handleTodoPress = (todo) => {
  //   setSelectedTodo(todo);
  //   setModalVisibleTodo(true);
  // }

  const handleCellClick = (date: Date) => {
    let localDateString = format(date, 'yyyy-MM-dd'); // Formats date to 'YYYY-MM-DD' based on the local time zone
    console.log("IN-----PARENT------COMPONENT, localDateString:", localDateString);
    setSelectedDate(localDateString);
};

// useEffect(() => {
//   if (selectedDate) {
//       console.log("In Parent Component, selectedDate:", selectedDate);
//   }
// }, [selectedDate]); // This useEffect will run every time `selectedDate` changes.


  
  return (
    <ScrollView vertical={true}>
      <View style={[styles.container, { width: containerWidth }]}>
        <Text style={styles.monthYear}>{format(new Date(year, month - 1), 'MMMM yyyy')}</Text>
        {monthGrid.map((week, index) => (
          <View key={index} style={[styles.weekContainer, { width: containerWidth, height: getRowHeight(week) }]}>
            {week.map((day, dayIndex) => (
                <TouchableOpacity
                key={dayIndex}
                style={[styles.dayOpacityContainer, { width: cellWidth }]}
                onPress={() => handleCellClick(day)} // Define this function to handle the press action
              >

              <View key={dayIndex} style={[styles.dayContainer, { width: cellWidth, height: getRowHeight(week) }]}>
                <Text style={[styles.dayNumber]}>
                  {day.getDate().toString()}
                </Text>
                {events.map((event, eventIndex) => {
                  const eventDate = new Date(event.startTime);
                  if (
                    eventDate.getFullYear() === year &&
                    eventDate.getMonth() + 1 === month &&
                    eventDate.getDate() === day.getDate()
                  ) {
                    return (
                      // <TouchableOpacity
                      //   key={eventIndex}
                      //   style={styles.eventContainer}
                      //   onPress={() => handleEventPress(event)}
                      // >
                      //   <Text style={styles.eventTitle}>{event.title}</Text>
                      // </TouchableOpacity>
                      <EventComponent
                        events={events}
                        setEvents={setEvents}
                        event={event}
                        // setEvent={setEvent}
                        key={eventIndex}
                        showEvent={true}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                })}
                
              </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={() => handleMonthChange(month - 1)}>
            <Text>Prev Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => handleMonthChange(month + 1)}>
            <Text>Next Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.prevButton} onPress={() => handleYearChange(year - 1)}>
            <Text>Prev Year</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => handleYearChange(year + 1)}>
            <Text>Next Year</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventListandTodoListContainer}>

        


          <EventComponent
            events={events}
            setEvents={setEvents}
            showEventList={true}
            selectedDate={selectedDate}
          />
          {/* <TodoListComponent
            todos={todos}
            setTodos={setTodos}
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
            setModalVisibleTodo={setModalVisibleTodo} 
            modalVisibleTodo={modalVisibleTodo}
            /> */}

        </View>
        <View style={styles.buttonContainer}>
          {/* <Button
            title="Add Event"
            onPress={handleAddEvent}
          /> */}
          {/* <TouchableOpacity onPress={handleAddEvent} style={styles.someButtonStyle}>
  <Text>Add Event</Text>
</TouchableOpacity> */}

          {/* <Button
            title="Add Todo"
            onPress={handleAddTodo}
          /> */}
          <EventComponent
            events={events}
            setEvents={setEvents}
            showAddButton={true} // Or dynamically determine this value based on conditions
            selectedDate={selectedDate}
          />
        </View>

      </View>
    </ScrollView>
  );
};



export default App;