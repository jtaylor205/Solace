import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput, useWindowDimensions, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Therapist = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [userFirstName, setUserFirstName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);


  return (
  
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.container}>
     <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Ionicons 
              size = "35%"
              marginBottom = "10"
              color = "black"
              name="chevron-back-outline"></Ionicons>
        </TouchableOpacity>
     </View>
    <View style={styles.headerContainer}>
    <Text>Name: </Text>
    <TouchableOpacity onPress={() => setIsEditingName(!isEditingName)}>
    <Text
    style={styles.greeting}
    > {isEditingName ? 'Done' : 'Edit'} </Text>
    </TouchableOpacity>
    </View>
    {isEditingName? (
        <TextInput style={styles.textField}
        onChangeText={setUserFirstName}        >
        </TextInput>
        
    ): (
        <Text>Hello</Text>
    )

    }



    <View style={styles.headerContainer}>
    <Text>Profile</Text>
    <TouchableOpacity>
    <Text
    color = "blue"
    >Edit</Text>
    </TouchableOpacity>
    </View>
    </View>
    </KeyboardAvoidingView>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', 
        paddingTop: 50,
        paddingHorizontal: 25,
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
      },
      greeting: {
        color: 'blue',
        
      },
      input: {
        height: 40,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
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
      },topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },textField: {
        height: 40,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9'
      },
  });
  
  export default Therapist;