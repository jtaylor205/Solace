import React, { useState, UseEffect } from 'react';
import { View, Text,TouchableWithoutFeedback, Keyboard, TextInput, Image, StyleSheet, useWindowDimensions } from 'react-native';
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

async function getPrompt() {
  try{
    const genAI = new GoogleGenerativeAI("AIzaSyB6WI7g4ENpYQVIs7c1EBFdW0XbemwYo8s");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const generationConfig = { temperature: 0.9, topK: 1, topP: 1, maxOutputTokens: 2048, };
  
    
  
    const result = await model.generateContent("Generate a journaling prompt for mental health but in your response only include the prompt.");
  
    const response = await result.response;
    const generatedPrompt = result.response.text();
    setPrompt(generatedPrompt);
  }
  catch (error){
    console.log("Error: Unable to generate prompt");
  }
 

  
}
getPrompt();
console.log(prompt);
console.log("---------------------------------");
//console.log(newPrompt);


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
        </View>

        <View style={styles.containerPrompt}>
          <Text style={styles.prompt}>{}</Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            //placeholder={prompt}

            placeholderTextColor="#8a8a8a"
            onChangeText={(val) => setJournalEntry(val)}
            multiline
            numberOfLines={10}
            

            />
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