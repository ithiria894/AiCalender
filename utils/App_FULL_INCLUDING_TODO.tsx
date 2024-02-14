import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TextInput, Button } from 'react-native';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import styles from "./styles"

const App = () => {
  const [monthGrid, setMonthGrid] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const [modalVisible, setModalVisible] = useState(false);
  const [todoModalVisible, setTodoModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeating, setRepeating] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

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

  const handleSaveEvent = () => {
    const newEvent = { title, description, startTime, endTime, repeating };
    console.log(newEvent);
    if (selectedEvent) {
      const updatedEvents = events.map(event =>
        event === selectedEvent ? { ...event, ...newEvent } : event
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
    } else {
      setEvents([...events, newEvent]);
    }
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setRepeating(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(event => event !== selectedEvent);
    setEvents(updatedEvents);
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setRepeating(false);
  }

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setRepeating(event.repeating);
    setModalVisible(true); // Show the modal
  };

  const handleSaveTodo = () => {
    if (selectedTodo) {
      const updatedTodos = todos.map(todo =>
        todo === selectedTodo ? { ...todo, title: todoTitle, description: todoDescription, createdDate, dueDate, priority, status } : todo
      );
      setTodos(updatedTodos);
      setTodoModalVisible(false);
    } else {
      const newTodo = { title: todoTitle, description: todoDescription, createdDate, dueDate, priority, status };
      setTodos([...todos, newTodo]);
      setTodoModalVisible(false);
    }
    setTodoTitle('');
    setTodoDescription('');
    setCreatedDate('');
    setDueDate('');
    setPriority('');
    setStatus('');
  };
  

  const handleTodoPress = (todo) => {
    setSelectedTodo(todo);
    setTodoTitle(todo.title);
    setTodoDescription(todo.description);
    setCreatedDate(todo.createdDate);
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
    setStatus(todo.status);
    setTodoModalVisible(true); // Show the modal
  };

  const handleDeleteTodo = () => {
    const updatedTodos = todos.filter(todo => todo !== selectedTodo);
    setTodos(updatedTodos);
    setTodoModalVisible(false);
    setTodoTitle('');
    setTodoDescription('');
    setCreatedDate('');
    setDueDate('');
    setPriority('');
    setStatus('');
  }

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

  return (
    <ScrollView horizontal={true}>
      <View style={[styles.container, { width: containerWidth }]}>
        <Text style={styles.monthYear}>{format(new Date(year, month - 1), 'MMMM yyyy')}</Text>
        {monthGrid.map((week, index) => (
          <View key={index} style={[styles.weekContainer, { width: containerWidth, height: getRowHeight(week) }]}>
            {week.map((day, dayIndex) => (
              <View key={dayIndex} style={[styles.dayContainer, { width: cellWidth }]}>
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
                      <TouchableOpacity
                        key={eventIndex}
                        style={styles.eventContainer}
                        onPress={() => handleEventPress(event)}
                      >
                        <Text style={styles.eventTitle}>{event.title}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
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
          <View style={styles.eventListContainer}>
            <Text style={styles.eventListHeader}>Events</Text>
            {events.map((event, index) => (
              <TouchableOpacity
                key={index}
                style={styles.eventListItem}
                onPress={() => handleEventPress(event)}
              >
                <Text style={styles.eventListItemText}>{event.title}</Text>
                <Text style={styles.eventListItemText}>Description: {event.description}</Text>
                <Text style={styles.eventListItemText}>Start Time: {event.startTime}</Text>
                <Text style={styles.eventListItemText}>End Time: {event.endTime}</Text>
                <Text style={styles.eventListItemText}>Repeating: {event.repeating ? 'Yes' : 'No'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.todoListContainer}>
            <Text style={styles.todoListHeader}>To Do List</Text>
            {todos.map((todo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.todoListItem}
                onPress={() => handleTodoPress(todo)}
              >
                <Text style={styles.todoListItemText}>{todo.title}</Text>
                <Text style={styles.todoListItemText}>Description: {todo.description}</Text>
                <Text style={styles.todoListItemText}>Created Date: {todo.createdDate}</Text>
                <Text style={styles.todoListItemText}>Due Date: {todo.dueDate}</Text>
                <Text style={styles.todoListItemText}>Priority: {todo.priority}</Text>
                <Text style={styles.todoListItemText}>Status: {todo.status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.modalButtonContainer}>
          <Button
            title="Add Event"
            onPress={() => {
              setSelectedEvent(null);
              setModalVisible(true);
            }}
          />
          <Button
            title="Add To Do"
            onPress={() => {
              setSelectedTodo(null);
              setTodoModalVisible(true);
            }}
          />
        </View>
        <View style={styles.eventModalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Title:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTitle}
                  value={title}
                />
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
                    title={repeating ? 'Yes' : 'No'}
                    onPress={() => setRepeating(!repeating)}
                  />
                </View>
                <View style={styles.modalButtonContainer}>
                  <Button title="Save" onPress={handleSaveEvent} />
                  <Button title="Delete" onPress={handleDeleteEvent} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.todoModalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={todoModalVisible}
            onRequestClose={() => {
              setTodoModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Title:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTodoTitle}
                  value={todoTitle}
                />
                <Text>Description:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTodoDescription}
                  value={todoDescription}
                />
                <Text>Created Date:</Text>
                <input
                  type="datetime-local"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                />
                <Text>Due Date:</Text>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Text>Priority:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setPriority}
                  value={priority}
                />
                <Text>Status:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setStatus}
                  value={status}
                />
                <View style={styles.modalButtonContainer}>
                  <Button title="Save" onPress={handleSaveTodo} />
                  {selectedTodo && (
                    <Button title="Delete" onPress={handleDeleteTodo} />
                  )}
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
