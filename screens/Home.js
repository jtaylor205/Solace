import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { firebase } from '../utils/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';


const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  const [taskToDo, setTaskToDo] = useState(['Task 1']); // Initial task
  const [editIndex, setEditIndex] = useState(null); // Index of task being edited
  const [editedText, setEditedText] = useState(''); // Edited text for task
  const [userDetails, setUserDetails] = useState({});
  const [greeting, setGreeting] = useState('Good Morning');
  const [gradientColors, setGradient] = useState(['#B4D8E8', '#FFB358'])

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
  
    if (hours < 12) {
      setGreeting('Good Morning');
      setGradient(['#2E97D1', '#FEC49F','#F56810']);
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
      setGradient(['#70B3C2', '#FFEBE1', '#A0AEE7']);
    } else {
      setGreeting('Good Evening');
      setGradient(['#9D89C4', '#FFAC6B']);
    }
  }, []); 

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const uid = user.uid;
        try {
          const userDoc = await firebase.firestore().collection('users').doc(uid).get();
          if (userDoc.exists) {
            setUserDetails(userDoc.data());
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);


  const addTask = () => {
    const newTask = `Task ${taskToDo.length + 1}`;
    setTaskToDo([...taskToDo, newTask]); // Add new task to the task list
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the task being edited
    setEditedText(taskToDo[index]); // Set the initial text of the edited task
  };

  const handleSave = () => {
    if (editedText.trim() === '') {
      // Remove the task if the edited text is empty
      setTaskToDo(taskToDo.filter((_, index) => index !== editIndex));
    } else {
      // Update the task text if it's not empty
      const updatedTasks = [...taskToDo];
      updatedTasks[editIndex] = editedText;
      setTaskToDo(updatedTasks);
    }
    // Clear editing state
    setEditIndex(null);
    setEditedText('');
  };

  const handleDelete = (index) => {
    setTaskToDo(taskToDo.filter((_, i) => i !== index)); // Remove the task from the list
  };

  return (
    <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)} //
            colors={gradientColors}
          />
        </Rect>
      </Canvas>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.greeting}>{greeting}, {userDetails.firstName}!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons 
              size = "25"
              marginBottom = "10"
              color = "white"
              name="person-circle-outline"></Ionicons>
        </TouchableOpacity>
        </View>
       
        <View style={styles.checklist}>
          <Text style={styles.subheading}>Daily Checklist</Text>
          <View style={styles.checklistWrapper}>
            {taskToDo.map((task, index) => (
              <TouchableOpacity key={index} onPress={() => handleEdit(index)}>
                <View style={styles.taskContainer}>
                  {editIndex === index ? ( // Conditionally render TextInput for editing
                    <TextInput
                      style={styles.input}
                      value={editedText}
                      onChangeText={setEditedText}
                      autoFocus
                      onBlur={handleSave}
                    />
                  ) : (
                    <>
                      <Text style={styles.taskText}>{task}</Text>
                      <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteIcon}>
                        <AntDesign name="close" size={20} color="white" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addTaskWrapper}>
            <Text style={styles.writeTaskText}>Write a Task +</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 390,
    position: 'absolute',
    paddingTop: 75,
    paddingHorizontal: 25,
  },
  greeting: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
  },
  checklistWrapper: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    color: 'white',
    fontSize: 16,
    flex: 1, // Take up remaining space
  },
  deleteIcon: {
    marginLeft: 10,
  },
  input: {
    color: 'white',
    fontSize: 16,
    flex: 1, // Take up remaining space
  },
  addTaskWrapper: {
    marginTop: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  writeTaskText: {
    fontSize: 16,
    color: '#A4B0E4',
    fontWeight: 'bold',
  },
});

export default Home;
