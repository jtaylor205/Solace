import React, { useState } from 'react';
import { View, Text,TouchableWithoutFeedback, Keyboard, TextInput, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'


const Journal = () => {
    const [journalEntry, setJournalEntry] = useState('');
    const {width, height} = useWindowDimensions()
    const currentDate = new Date().toLocaleDateString();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();


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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.greeting}>Journal: {currentDate}</Text>
          
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="Write your thoughts here..."
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
    containerInput: {
      position: 'absolute',
      paddingTop: 95,
      alignContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      margin: 15,
      allignSelf: 'center',
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