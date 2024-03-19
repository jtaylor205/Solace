import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, useWindowDimensions, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import Ionicons from '@expo/vector-icons/Ionicons';
const { GoogleGenerativeAI } = require("@google/generative-ai");


class Message{
  constructor(sender, message) {
    this.sender = sender;
    this.message = message;
  }
}

const Therapist = () => {
  const { width, height } = useWindowDimensions();
  const [userText, setUserText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendChat = async (mess) => {
    try{
      // Connects to API and asks question 
      const genAI = new GoogleGenerativeAI("AIzaSyB6WI7g4ENpYQVIs7c1EBFdW0XbemwYo8s");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      setUserText("");
      setMessages((currentMessages) => [...currentMessages, new Message("User", mess), new Message("AI", " . . . ")]);
      const result = await model.generateContent(" Answer in 80 words:" + mess);
      const response = await result.response;
      const text = await response.text(); 
      if (text) {
        // Remove ' . . . ' message and log AI response
        setMessages(currentMessages => currentMessages.slice(0, -1));
        const AiMessage = new Message("AI", text);
        setMessages((currentMessages) => [...currentMessages, AiMessage]);
      } else {
        setMessages(currentMessages => currentMessages.slice(0, -1));
        // Handle the case where the response is blocked due to safety
        console.log("The response was blocked for safety reasons.");
        // Optionally, inform the user that the response was blocked
        const safetyMessage = new Message("AI", "I'm unable to provide a response to that.");
        setMessages((currentMessages) => [...currentMessages, safetyMessage]);
      }
  } catch (error) {
    // if error due to safety or conection issues
    setMessages(currentMessages => currentMessages.slice(0, -1));
    const errorMessage = new Message("AI","I'm unable to provide a response due to safety reasons. Please ask a different question.");
    setMessages((currentMessages) => [...currentMessages, errorMessage]);
  }

  };

  return (
  
    <>
    <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={['#9D89C4', '#FFAC6B']}
          />
        </Rect>
    </Canvas>
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
      <ScrollView 
      // Scrolls view down to most recent messages
      ref={(ref) => { this.scrollView = ref; }}
      onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
      {messages.map((msg, index) => (
          <Text key={index} style={styles.message(msg.sender)}>
            {msg.message}
          </Text>
        ))}
      </ScrollView>
      </View>
      <View style={styles.sendContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setUserText}
        value={userText}
        placeholder="Send a message!"
        placeholderTextColor="#8a8a8a"
      />
      <View style={styles.buttonStyle}>
      <TouchableOpacity onPress={() => sendChat(userText)}>
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </View>
    </View>
    </>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', 
        paddingTop: 75,
        paddingHorizontal: 25,
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
      },
      greeting: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        height: '50%'
      },
      input: {
        height: 40,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9'
      }, scrollView: {
        height: '60%',
      },
      sendContainer:{
        flexDirection: 'row',
        keyboardVerticalOffset: Platform.OS === "ios" ? 100 : 0,
      },buttonStyle: {
        alignSelf: 'center',
      }, buttonContainer: {
        flexDirection: 'row',
        width: '85%', 
        marginTop: 10, 
      }, message: (sender) => ({
        alignSelf: sender === 'User' ? 'flex-end' : 'flex-start',
        borderRadius: 20,
        padding: 20,
        backgroundColor: sender === 'User' ? '#E6E6E6' : '#F0F0F0',
        marginVertical: 4,
        maxWidth: '80%',
        overflow: 'hidden',
      }), messagesContainer: {
        width: '100%', 
        height: '85%',
      },absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
  });
  
  export default Therapist;