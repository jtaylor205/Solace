import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import TabBar from '../utils/Tabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

function MyApp() {
    return (
        <Stack.Navigator initialRouteName="Login">
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
          <Stack.Screen 
            name="Main" 
            component={TabBar} 
            options={{ headerShown: false, animationEnabled: false }} 

          />
        </Stack.Navigator>
    );
}

export default MyApp