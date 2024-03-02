import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Home = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Therapist Page</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#A4B0E4',
      },
      greeting: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
  });
  
  export default Home;