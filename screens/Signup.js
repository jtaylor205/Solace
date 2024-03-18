import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firebase} from '../utils/firebaseConfig';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState(''); // Changed from username to email for clarity
  const [password, setPassword] = useState('');

  const register = () => {
    if (email === '' || password === '') {
      Alert.alert('Email and password cannot be empty.');
      [{ text: "OK" }]
      return;
    }
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
        };
        const usersRef = firebase.firestore().collection('users');
        Alert.alert(
          'Success!',
          'Solace account created',
          [{ text: "OK", onPress: () => navigation.navigate('Main') }]
        );
        return usersRef.doc(uid).set(data); // Return the promise for chaining
      })
      .catch((error) => {
        alert(error.message);
        return;
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Signup</Text>
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        onChangeText={setEmail} // Updated to setEmail
        value={email} // Updated to email
        placeholder="Email" // Updated placeholder text
        placeholderTextColor="#8a8a8a"
      />
      <TextInput
        secureTextEntry
        autoCapitalize='none'
        style={styles.input}
        onChangeText={setPassword} // Updated to setPassword
        value={password}
        placeholder="Password"
        placeholderTextColor="#8a8a8a"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
          <Button color="white" title="Sign Up" onPress={register} />
        </View>
      </View>
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
        justifyContent: 'space-evenly', // This will space your buttons evenly
        width: '85%',
        height: '6%',
        marginTop: 10, // Add some top margin if needed
      }, 
      buttonStyle: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#6175A9',
        borderRadius: 10,
        height: 10,
        textAlign: 'center',
      },
      
  });
  
  export default Signup;