import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import Therapist from '../screens/Therapist';
import JournalEditor from '../screens/JournalEditor';

const Tab = createBottomTabNavigator();

const JournalStack = createStackNavigator();

// Stack navigation for the Notes and NoteEditor screens
const JournalStackScreen = () => {
    return (
      <JournalStack.Navigator
        initialRouteName="Journal"
        screenOptions={{ headerStyle: { height: 100 } }}
      >
        <JournalStack.Screen name="Journal" component={Journal} />
        <JournalStack.Screen
          name="JournalEditor"
          component={JournalEditor}
          // Hide the header for the NoteEditor screen (implements a custom header in NoteEditor.js)
          options={{ headerShown: false }}
        />
      </JournalStack.Navigator>
    );
  };
  

function Tabs() {
    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#A4B0E4',
                tabBarInactiveTintColor: '#A9A9A9',
                tabBarStyle: {
                    paddingBottom: 0,
                },
                tabBarIconStyle: {
                    marginTop: 10,
                    paddingBottom: 15,
                }
            }}
        >
            <Tab.Screen
                name="JournalStack"
                component={JournalStackScreen}
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="infinite-outline" size={36} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Therapist"
                component={Therapist}
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbubble-ellipses-outline" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs