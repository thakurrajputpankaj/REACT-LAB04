import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import TransactionsScreen from './TransactionsScreen';
import SummaryScreen from './SummaryScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Transactions') {
            iconName = focused ? 'file1' : 'file1';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'info' : 'info';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5F8CB9', 
        tabBarInactiveTintColor: 'gray', 
        headerStyle: {
            backgroundColor: '#5F8CB9',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      })}
    >
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
