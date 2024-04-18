import * as React from 'react';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from '../utils/firebaseConfig';
import Tabs from '../utils/Tabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile'

const Stack = createStackNavigator();

function MyApp() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; // or a loading indicator


    return (
        <Stack.Navigator>

          {user ? (
          // User is signed in
          <>
          <Stack.Screen 
            name="Main" 
            component={Tabs} 
            options={{ headerShown: false, animationEnabled: false }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={Profile} 
            options={{ headerShown: false, animationEnabled: true }} 
          />
          </>
        ) : (
          // No user is signed in
          <>
           <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name="Signup" 
            component={Signup}
            options={{headerStyle: {
                backgroundColor: '#A4B0E4',
              },}} 
          />
          </>
        )}
        </Stack.Navigator>
    );
}

export default MyApp