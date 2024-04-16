import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, SectionList } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { firebase } from '../utils/firebaseConfig';
import uuid from 'react-native-uuid'
import Task from '../components/Task';
import TaskModal from '../components/TaskModal';
import { loadFromStorage, saveToStorage } from "../utils/storage";

const Home = () => {
  //For Gradient size
  const { width, height } = useWindowDimensions();
  //For greeting specific user
  const [userDetails, setUserDetails] = useState([]);
  //For greeting time specification
  const [greeting, setGreeting] = useState('Good Morning');
  //For gradient time specification
  const [gradientColors, setGradient] = useState(['#B4D8E8', '#FFB358'])

  //TASKS
  const [tasks, setTasks] = useState(null);
  // Ref to the modal component -> allows us to present/dismiss the modal from the parent component
  const bottomSheetModalRef = useRef(null);
  // Object that separates the todos into two sections: active and completed (passed to the SectionList component)
  const sections = [
    { title: "Active", data: tasks?.filter((task) => !task.completed) },
    { title: "Completed", data: tasks?.filter((task) => task.completed) },
  ].filter((section) => section.data?.length > 0);

  // Hook to load the todos from the device's storage when the screen is mounted
  useEffect(() => {
    loadFromStorage("tasks").then((loadedTasks) => {
      setTasks(loadedTasks);
    });
  }, []);

  // Hook to save the todos to the device's storage whenever the todos changes (completed, create, delete)
  useEffect(() => {
    if (tasks) {
      saveToStorage(tasks, "tasks");
    }
  }, [tasks]);

  // Callback function to handle the creation of a new todo (called from the TaskModal component)
  const handleAddTask = (input) => {
    const newTask = {
      id: uuid.v4(),
      text: input,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCheck = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
    });
  };

  // Callback function to handle the deletion of a todo (called from the TodoItem component)
  const handleDeletion = (id) => {
    setTasks((prevTasks) => {
      return prevTasks?.filter((task) => task.id !== id);
    });
  };

  // Function to render an empty list message (if no todos)
  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyContainerText}>Press "Write a Task +" to get started</Text>
    </View>
  );


  //Changes gradient/greeting based on time
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

  //Fetches user name from firebase for greeting use
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
        <Text style={styles.greeting}>{greeting}, {userDetails.firstName}!</Text>
        <View style={styles.checklist}>
          <Text style={styles.subheading}>Daily Checklist</Text>
          <View style={styles.checklistWrapper}>
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              // What to render for each todo
              renderItem={({ item, index, section }) => (
                <>
                  <Task 
                    item={item}
                    onCheck={handleCheck}
                    onDeletion={handleDeletion}
                  />
                  {section.title === "Active" && index === section.data.length - 1 && sections.find(sec => sec.title === "Completed") && (
                    <View style={styles.separator} />
                  )}
                </>
              )}
              // Rendering the title of the sections
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
              contentContainerStyle={styles.listContentContainer}
              renderSectionFooter={() => <View style={styles.sectionFooter} />}
              ListEmptyComponent={emptyList}
              stickySectionHeadersEnabled={false}
            />
          </View>
        </View>
        <View style={styles.addTaskContainer}>
          <TouchableOpacity
            onPress={() => bottomSheetModalRef.current?.present()}
            style={styles.addTaskTouchable}
          >
            <View style={styles.addTaskWrapper}>
              <Text style={styles.writeTaskText}>Write a Task +</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    <TaskModal 
        handleAddTask={handleAddTask}
        bottomSheetModalRef={bottomSheetModalRef}
      />
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
  checklist: {

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
    borderColor: 'white',
    borderWidth: '3px',
    borderRadius: 10,
  },
  sectionHeader: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionFooter: {

  },
  addTaskContainer: {
    marginVertical: 20,
    marginHorizontal: 1,
  },
  addTaskButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
  },
  addTaskTouchable: {
    padding:0,
  },
  addTaskWrapper: {
    // marginTop: 8,
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
  emptyContainerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  separator: {
    height: 2,
    backgroundColor: 'white',
    marginVertical: 10,
  },
});

export default Home;
