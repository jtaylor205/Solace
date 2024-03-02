import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import Therapist from '../screens/Therapist';

const Tab = createBottomTabNavigator();

function MyTabs() {
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
                name="Journal"
                component={Journal}
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => ( // Define tabBarIcon function here
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

export default MyTabs