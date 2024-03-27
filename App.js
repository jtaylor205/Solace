import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyApp from './utils/Navigator.js';

export default function App() {
  return (
      // NavigationContainer component acts as the root container for all your navigation components.
      <NavigationContainer> 
        <MyApp />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});