import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './utils/Navigator.js'

export default function App() {
  return (
      // NavigationContainer component acts as the root container for all your navigation components.
      <NavigationContainer> 
        <MyTabs />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});