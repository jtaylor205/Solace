import React, { useReducer } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { firebase} from '../utils/firebaseConfig';


const Login = ({navigation}) => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const loginPress = () => {
    if (username === '' || password === '') {
      Alert.alert(
        'Login Error', // Title
        'Email and password cannot be empty.', // Message
        [{ text: "OK" }]
      );
      return;
    }
    firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
      .then(() => {
        navigation.navigate('Main'); 
      })
      .catch((error) => {
        // Handle errors here, such as wrong password, no user with that email, etc.
        Alert.alert('Login Error', error.message);
      });
  };
  
  const signupPress = () => {
    navigation.navigate('Signup');
  };
  
    return (
      <View style={styles.container}>
                <View style={styles.imageContainer}>
                  <Image source={require('../assets/logo.png')} style={styles.image} resizeMode="contain" />
                </View>
                  <Text style={styles.greeting}> Welcome to Solace </Text> 
              <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username" // Placeholder text
                placeholderTextColor="#8a8a8a"
              />
              <TextInput
                secureTextEntry
                autoCapitalize='none'
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password" // Placeholder text
                placeholderTextColor="#8a8a8a"
              /> 
              <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                  <Button color = 'white' title="Sign Up" onPress={signupPress} />
                </View>
                <View style={styles.buttonStyle}>
                  <Button color = "white" title="Log In" onPress={loginPress} />
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
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        width: '85%',
        marginTop: 10, 
      }, 
      buttonStyle: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#6175A9',
        borderRadius: 10,
        textAlign: 'center',
      },
      
  });
  
  export default Login;