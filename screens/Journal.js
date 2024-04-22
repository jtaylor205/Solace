import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { loadFromStorage , saveToStorage} from '../utils/storage';
import JournalItem from '../components/JournalItem';
import uuid from 'react-native-uuid';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'

export default function Journal({ navigation, route }) {

  const { width, height } = useWindowDimensions();
  const [gradientColors, setGradient] = useState(['#2E97D1', '#FEC49F','#F56810'])
  const currentDate = new Date().toLocaleDateString();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  // Used to create gradient background based on time of day
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
  
    if (hours < 12) {
      setGradient(['#2E97D1', '#FEC49F','#F56810']);
    } else if (hours < 18) {
      setGradient(['#66CCFF', '#FFCC99']);
    } else {
      setGradient(['#9D89C4', '#FFAC6B']);
    }
  }, []); 


  // State to keep track of the user's journal entries
  const [entries, setEntries] = useState(null);

  // Hook to load the notes from the device's storage when the screen is mounted
  useEffect(() => {
    loadFromStorage("entries").then((loadedEntries) => {
    setEntries(loadedEntries);
  });
    }, []);
  
  // Hook to save the entries to the device's storage whenever the entry changes (create, update, delete)
    useEffect(() => {
      if (entries) {
        saveToStorage(entries, "entries");
      }
    }, [entries]);

    // Hook to handle the deletion of an entry (received via params from the JournalEditor screen)
    useEffect(() => {
      const deletedEntryId = route.params?.deletedJournalId;
      if (deletedEntryId) {
        setEntries((prevEntries) =>
          prevEntries?.filter((entry) => entry.id !== deletedEntryId) // Fixed variable name from deletedJournalId to deletedEntryId
        );
      }
    }, [route.params?.deletedJournalId]);


    
   // Hook to handle the creation or update of an entry (received via params from the NoteEditor screen)
  // Hook to handle the creation or update of an entry (received via params from the JournalEditor screen)
  useEffect(() => {
    const newEntry = route.params?.newEntry;
    if (newEntry) {
      setEntries((prevEntries) => {
        if (!prevEntries) {
          // If prevEntries is null, initialize it as an empty array
          prevEntries = [];
        }
        const entryExists = prevEntries.some((entry) => entry.id === newEntry.id);
        if (entryExists) {
          return prevEntries.map((entry) =>
            entry.id === newEntry.id ? newEntry : entry
          );
        } else {
          return [...prevEntries, newEntry];
        }
      });
    }
  }, [route.params?.newEntry]);


  // Step 3 - part 8
  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>Press the "pencil" button to get started</Text>
    </View>
  );


  return (
    <>
    <View style={styles.container}>
    <ScrollView style={styles.listContainer}>
    <FlatList
        // Sort the entries by last modified date
        data={entries?.sort((a, b) => b.lastModified - a.lastModified)}
        keyExtractor={(item) => item.id}
        // What to render for each entry
        renderItem={({ item }) => (
          <JournalItem item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
        ListEmptyComponent={emptyList}
      />
    </ScrollView>

      {/* Button to create a new note -> navigates to JournalEditor screen */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("JournalEditor")}
      >
        <Ionicons name="pencil" size={25} color="white" />
      </TouchableOpacity>
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
  },
  listContentContainer: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
  addButton: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#39485e",
    borderRadius: 30,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
































/*
  import React, { useState, useEffect } from 'react';
import { View, Text,TouchableWithoutFeedback, Keyboard, TextInput, Image, StyleSheet, useWindowDimensions, ScrollView, Button } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'

const { GoogleGenerativeAI } = require("@google/generative-ai");



const Journal = () => {
    const [journalEntry, setJournalEntry] = useState('');
    const [prompt, setPrompt] = useState('');

    const {width, height} = useWindowDimensions()
    const [gradientColors, setGradient] = useState(['#2E97D1', '#FEC49F','#F56810'])
    const currentDate = new Date().toLocaleDateString();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    useEffect(() => {
      const now = new Date();
      const hours = now.getHours();
    
      if (hours < 12) {
        setGradient(['#2E97D1', '#FEC49F','#F56810']);
      } else if (hours < 18) {
        setGradient(['#66CCFF', '#FFCC99']);
      } else {
        setGradient(['#9D89C4', '#FFAC6B']);
      }
    }, []); 



// node --version # Should be >= 18npm 
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// const MODEL_NAME = {"gemini-1.0-pro"};
// const API_KEY = {"AIzaSyB6WI7g4ENpYQVIs7c1EBFdW0XbemwYo8s"};


// useEffect(() => {

//   async function getPrompt() {
//     try{
//       const genAI = new GoogleGenerativeAI("AIzaSyB6WI7g4ENpYQVIs7c1EBFdW0XbemwYo8s");
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//       const generationConfig = { temperature: 0.9, topK: 1, topP: 1, maxOutputTokens: 2048, };
    
      
    
//       const result = await model.generateContent("Generate a journaling prompt for mental health but in your response only include the prompt.");
    
//       const response = await result.response;
//       const generatedPrompt = result.response.text();
//       setPrompt(generatedPrompt);
//     }
//     catch (error){
//       console.log("Error: Unable to generate prompt");
//     } 
// }   

// getPrompt();
// }, []);


useEffect(() => {
  generateNewPrompt(); // Generate initial prompt
}, []);

const generateNewPrompt = async () => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyB6WI7g4ENpYQVIs7c1EBFdW0XbemwYo8s");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const generationConfig = { temperature: 0.9, topK: 1, topP: 1, maxOutputTokens: 2048 };

    const result = await model.generateContent("Generate a journaling prompt for mental health but in your response only include the prompt.");

    const response = await result.response;
    const generatedPrompt = result.response.text();
    setPrompt(generatedPrompt);
  } catch (error) {
    console.log("Error: Unable to generate prompt");
  }
};

const handleRegeneratePrompt = () => {
  generateNewPrompt();
};


    return (
      <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient 
            start={vec(0,0)}
            end={vec(width, height)}
            colors={gradientColors}
            
            />
        </Rect>
      </Canvas>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.greeting}>Journal: {currentDate}</Text>
          <Text style={styles.greeting}>Prompt: </Text>
          <ScrollView horizontal={true} style={styles.promptContainer}>
            <Text style={styles.prompt}>{prompt}</Text>
          </ScrollView>

        </View>

        <View style={styles.containerPrompt}>
          <Text style={styles.prompt}>{}</Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="Journal your thoughts freely!"
            placeholderTextColor="#8a8a8a"
            onChangeText={(val) => setJournalEntry(val)}
            multiline
            numberOfLines={10}
            />
            <Button title="Regenerate Prompt" onPress={handleRegeneratePrompt} />
            <Button title="Save Entry" onPress={() => console.log(journalEntry)} />

        </View>
      </View>
      </TouchableWithoutFeedback>

      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    containerPrompt: {
      flex : 1,
      position: 'absolute',
      paddingTop: 130,
    },
    prompt: {
      color: 'cyan',
      fontSize: 18,
      margin: 12,
      paddingHorizontal: 10,
      height: 150,
      width: 350,
      maxWidth: '100%', // Limiting the width

    },
    containerInput: {
      position: 'absolute',
      paddingTop: 250,
      alignContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      margin: 15,
      height: 400,
      width: 350,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      paddingTop: 10,
      // paddingHorizontal: 25,
    },

  });
  
  export default Journal;

  */