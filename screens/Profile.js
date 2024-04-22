import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, TextInput, useWindowDimensions, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase } from '../utils/firebaseConfig';
import { useRoute } from "@react-navigation/native";
import {useAuth} from "../utils/firebase";
const Profile = ({ navigation }) => {
  const route = useRoute()
  const firstName= route.params?.first
  const lastName= route.params?.last
  const email= route.params?.email
  const { width, height } = useWindowDimensions();
  const [userName, setUserName] = useState(`${firstName} ${lastName}`);
  const [userEmail, setEmail] = useState(email);

  const logout = () => {
    firebase.auth().signOut().then(() => {
        // Successfully signed out
        navigation.navigate({
            name: 'Login',
            params: {}, 
            merge: true,
            animationEnabled: false 
        });
    }).catch((error) => {
        // An error happened.
        console.error(error);
    });
};

  
  const updateProfile = async () => {
    const user = firebase.auth().currentUser;
  
    if (user) {
      // Split the full name into first and last names
      const splitName = userName.trim().split(' ');
      const firstName = splitName[0];
      const lastName = splitName.length > 1 ? splitName[1] : ''; // Assuming there's at least a last name
  
      // Update the user's email
      user.updateEmail(userEmail)
        .then(() => {
          console.log('Email updated successfully!');
        })
        .catch(error => {
          console.error('Error updating email:', error);
        });
  
      // Update user's profile in Firebase Authentication
      user.updateProfile({
        displayName: `${firstName} ${lastName}`
      })
        .then(() => {
          console.log('Profile updated successfully!');
          // Optionally update Firestore here if needed
          updateFirestoreUser(user.uid, firstName, lastName, userEmail);
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });
    }
    navigation.navigate('Main');
  };
  
  // Function to update Firestore
  const updateFirestoreUser = (uid, firstName, lastName, email) => {
    const usersRef = firebase.firestore().collection('users').doc(uid);
    usersRef.update({
      firstName: firstName,
      lastName: lastName,
      email: email // Only if you are storing email in Firestore and it's being updated
    })
    .then(() => {
      console.log('Firestore details updated!');
    })
    .catch(error => {
      console.error('Error updating Firestore:', error);
    });
  };
  
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
        <TouchableOpacity onPress={() => logout()}>
            <Ionicons 
              size = "35%"
              marginBottom = "10"
              color = "black"
              name="log-out-outline"></Ionicons>
        </TouchableOpacity>
     </View>
    <View>
      <View style={styles.circle}>
              <Text style={styles.letters}>{firstName[0]}{lastName[0]}</Text>
      </View>
    <Text style={styles.headerContainer}> Name: </Text>
    <TextInput
      autoCapitalize='none'
      style={styles.input}
      onChangeText={setUserName}
      value={userName}
    /> 
    <Text style={styles.headerContainer}> Email: </Text>
    <TextInput
      autoCapitalize='none'
      style={styles.input}
      onChangeText={setEmail}
      value={userEmail}
    /> 
    <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                  <Button color = "white" title="Update"  onPress={updateProfile}/>
                </View>
              </View>
    </View>
    
    </View>
    </KeyboardAvoidingView>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 25,
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
      },
      input: {
        height: 40,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9'
      },buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        width: '85%',
        margin: 12,
        
        
        borderRadius: 10,
      }, 
      buttonStyle: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#6175A9',
        borderRadius: 10,
        textAlign: 'center',
      },topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },textField: {
        height: 40,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9'
      },circle: {
        alignSelf: 'center',
        width: 100,         
        height: 100,         
        borderRadius: 50,    
        backgroundColor: 'gray', 
        justifyContent: 'center',  
        alignItems: 'center'        
    },
    letters: {
        alignSelf: 'center',
        color: 'white',     // Color of the text
        fontSize: 24,       // Size of the text
        fontWeight: 'bold'  // Bold text
    }
  });
  
  export default Profile;