import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import { BottomSheet } from 'react-native-elements';
StatusBar.setBarStyle('dark-content');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,  // Thick red border for the container
    borderColor: 'red',

    marginTop: 40, // Adjusted margin for the container
  },
  calendarContainer: {
    height: 520,  // Fixed height for the calendar container
    paddingBottom: 10, // Adjust as needed
    borderWidth: 2,  // Thick blue border for the calendar container
    borderColor: 'blue',
  },
  monthYearContainer: {
    // alignItems: 'Left',
    borderWidth: 2,  // Thick green border for the month-year container
    borderColor: 'green',
  },
  monthYearText: {
    fontSize: 20,
  },
  eventListContainer: {
    padding: 5,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    borderWidth: 2,  // Thick yellow border for the event list container
    borderColor: 'yellow',
  },
  eventListTitle: {
    fontSize: 15,
    marginBottom: 5,
  },
  eventListItem: {
    fontSize: 15,
    marginBottom: 5,
    borderWidth: 2,  // Thick orange border for each event list item
    borderColor: 'orange',
  },
  buttonContainer: {
    position: 'absolute',
    padding: 0,
    borderWidth: 2,  // Thick purple border for the button container
    bottom: 10,
    right: 10, // Adjusted position for the button container
    zIndex: 10, // Ensure the buttons are above other elements
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    borderRadius: 10, // Rounded corners for the button container
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    borderWidth: 2,  // Thick cyan border for the centered view
    borderColor: 'cyan',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,  // Thick magenta border for the modal view
    borderColor: 'magenta',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,  // Thick black border for the input field
    padding: 10,
    borderColor: 'black',
  },
  calendarWrapperScroll: {
    maxHeight: 2000, // or whatever height you want
    borderWidth: 2,  // Thick magenta border for the modal view
    borderColor: 'pink',
  },
  BothListContainer: {
    flexDirection: 'row',
    borderWidth: 2,  // Thick magenta border for the modal view
    borderColor: 'pink',
    //center
    alignContent: 'center',
  },
});
