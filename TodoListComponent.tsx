// TodoListComponent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, Picker } from 'react-native';
import styles from './styles'; // Assuming you have a similar styles file for TodoListComponent

const TodoListComponent = ({ todos, setTodos, modalVisibleTodo, setModalVisibleTodo, selectedTodo, setSelectedTodo }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [status, setStatus] = useState('Pending');
  // const [selectedTodo, setSelectedTodo] = useState(null);

  const handleSaveTodo = () => {
    const newTodo = { title, description, createdDate, dueDate, priority, status };
    if (selectedTodo) {
      const updatedTodos = todos.map(todo =>
        todo === selectedTodo ? { ...todo, ...newTodo } : todo
      );
      setTodos(updatedTodos);
      setSelectedTodo(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setModalVisibleTodo(false);
    resetForm();
  };

  const handleDeleteTodo = () => {
    const updatedTodos = todos.filter(todo => todo !== selectedTodo);
    setTodos(updatedTodos);
    setModalVisibleTodo(false);
    resetForm();
  };

  const handleTodoPress = (todo) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setCreatedDate(todo.createdDate);
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
    setStatus(todo.status);
    setModalVisibleTodo(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCreatedDate('');
    setDueDate('');
    setPriority('Normal');
    setStatus('Pending');
  };

  return (
    <View>
      <View style={styles.todoListContainer}>
        <Text style={styles.todoListHeader}>Todos</Text>
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
      <View style={styles.todoModalContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisibleTodo(false);
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
              <Text>Created Date:</Text>
              <TextInput
                style={styles.input}
                value={createdDate}
                onChangeText={setCreatedDate}
              />
              <Text>Due Date:</Text>
              <TextInput
                style={styles.input}
                value={dueDate}
                onChangeText={setDueDate}
              />
              <Text>Priority:</Text>
              <Picker
                selectedValue={priority}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
              >
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Normal" value="Normal" />
                <Picker.Item label="Low" value="Low" />
              </Picker>
              <Text>Status:</Text>
              <Picker
                selectedValue={status}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
              >
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Cancelled" value="Cancelled" />
              </Picker>
              <View style={styles.modalButtonContainer}>
                <Button title="Save" onPress={handleSaveTodo} />
                <Button title="Delete" onPress={handleDeleteTodo} />
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
};

export default TodoListComponent;
