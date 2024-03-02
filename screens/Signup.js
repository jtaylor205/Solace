import React, { useReducer } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';

const Signup = ({navigation}) => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
    return (
      <View style={styles.container}>
        
          <Text style={styles.greeting}> Signup </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Username" // Placeholder text
            placeholderTextColor="#8a8a8a"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password" // Placeholder text
            placeholderTextColor="#8a8a8a"
          />
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingBottom: 100,
        backgroundColor: '#A4B0E4',

      },
      greeting: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      image: {
        width: undefined,
        height: '120%',
        alignItems: 'center',
      }, 
      imageContainer: {
        width: '80%',
        height: '20%', 
        overflow: 'hidden', 
        marginBottom: 20,
      }, 
      input: {
        height: 40,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // This will space your buttons evenly
        width: '85%', // Ensure the container takes the full width of its parent
        marginTop: 10, // Add some top margin if needed
      }, 
      buttonStyle: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#6175A9',
        borderRadius: 10,
        textAlign: 'center',
      },
      
  });
  
  export default Signup;