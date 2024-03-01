import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fortnite Roleplay Pokemon Toilet</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/frpt.jpg')} style={styles.image} resizeMode="contain" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fBf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: '80%', // Adjust container width as needed
    height: 300, // Adjust container height as needed
    overflow: 'hidden', // Ensure that the image is clipped at the bottom
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});