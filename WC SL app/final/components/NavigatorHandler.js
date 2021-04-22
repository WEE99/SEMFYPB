import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, DrawerActions,DefaultTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export const SalespersonStack = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Details" component={LeadDetail} />
        </Stack.Navigator>
  
    );
  }

export const CompanyAdminStack = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Details" component={LeadDetail} />
        </Stack.Navigator>
  
    );
  }

export const SuperAdminStack = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Details" component={LeadDetail} />
        </Stack.Navigator>
  
    );
  }

export const LoginNavigator = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Details" component={LeadDetail} />
        </Stack.Navigator>
  
    );
  }
  