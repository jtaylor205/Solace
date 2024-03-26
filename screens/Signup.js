import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { firebase} from '../utils/firebaseConfig';
import validateEmail from 'email-validator';
import Ionicons from '@expo/vector-icons/Ionicons';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          firstName,
          lastName
        };
        const usersRef = firebase.firestore().collection('users');
        Alert.alert(
          'Success!',
          'Solace account created',
          [{ text: "OK", onPress: () => navigation.navigate('Main') }]
        );
        return usersRef.doc(uid).set(data);
      })
      .catch((error) => {
        alert(error.message);
        return;
      });
  };

  return (
    
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0} // Adjust the value based on your needs
>
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={require('../assets/logo.png')} style={styles.image} resizeMode="contain" />
    </View>
    <Text style={styles.greeting}>Create Solace Account</Text>
    <View style={styles.nameInput}>
      <TextInput
        autoCapitalize='none'
        style={styles.nameField}
        onChangeText={setFirstName} 
        value={firstName} 
        placeholder="First"
        placeholderTextColor="#8a8a8a"
      />
      <TextInput
        autoCapitalize='none'
        style={styles.nameField}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last"
        placeholderTextColor="#8a8a8a"
      />
    </View>
    <TextInput
      autoCapitalize='none'
      style={styles.input}
      onChangeText={setEmail} 
      value={email} 
      placeholder="Email"
      placeholderTextColor="#8a8a8a"
    />
    <View style={styles.bottomcontainer}>
      <TextInput
        secureTextEntry={!showPassword}
        autoCapitalize='none'
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="#8a8a8a"
        style={{ width: '90%' }}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <Text>{showPassword ? <Ionicons name="eye-off" size={20}/> : <Ionicons name="eye" size={20}/>}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonStyle}>
        <Button
          disabled={!validateEmail.validate(email) || !password || !firstName || !lastName}
          color="white"
          title="Sign Up"
          onPress={register}
        />
      </View>
    </View>
  </View>
</KeyboardAvoidingView>

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
      bottomcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 10,
        width: '85%'
      },
      nameInput: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        width: '85%',
      },
      nameField: {
        height: 40,
        width: '47.5%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9'
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
        height: ((Dimensions.get('window').height) * 0.06) < 40 ? '6%' : 40,
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
  
  export default Signup;