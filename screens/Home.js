import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import Task from '../components/Task'

const Home = () => {
    const {width, height} = useWindowDimensions()

    const [task, setTask] = useState()
    const [taskToDo, setTaskToDo] = useState([])

    function addTask() {

    }


    return (
      <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient 
            start={vec(0,0)}
            end={vec(width, height)}
            colors={['#9D89C4', '#FFAC6B']}
            />
        </Rect>
      </Canvas>
      <View style={styles.container}>
        <Text style={styles.greeting}>Good Morning, Alex!</Text>
        <View style={styles.checklist}>
          <Text style={styles.subheading}>Daily Checklist</Text>
          <View style={styles.checklistWrapper}>
            <Task text={'Task 1'}/>
          </View>
        </View>
        <TouchableOpacity onPress={() => addTask()}>
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
    checklist: {

    },
    checklistWrapper: {
      padding: 10,
      backgroundColor: 'transparent',
      borderWidth: 5,
      borderColor: 'white',
      borderRadius: 10,
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
      fontSize: 15,
      color: '#A4B0E4',
      fontWeight: 'bold',
    },
  });
  
  export default Home;