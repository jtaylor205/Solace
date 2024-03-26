import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from '../utils/Tabs';
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
            component={Tabs} 
            options={{ headerShown: false, animationEnabled: false }} 
          />
        </Stack.Navigator>
    );
}

export default MyApp