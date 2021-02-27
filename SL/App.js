import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigator, LoginNavigator} from './TabNavigator';
import {auth, db} from './firebase';



export default function App() {

  const [initializing, setInitializing] = React.useState(true);
  const [theUser, setTheUser] = React.useState(null);
  const [role, setRole] = React.useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
      setTheUser(user);
      if (user) {
          //get all users info from firestore
          db.collection("users").doc(user.uid).get().then(function (doc) {
              if (doc.exists) {
                  console.log("Document data:", doc.data());
                  var d = doc.data();
                  setRole(d.admin);
              } else {
                  // console.log("No such document!");
              }
          }).catch(function (error) {
              console.log("Error getting document:", error);
          });
      }

      if (initializing) setInitializing(false);
  }

  useEffect(() => {
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount

  }, []);

  //will hide the loginPage if the user did not logout
  if(initializing){
    return(
        <View></View>
    )
}

  if(theUser===null){
    return (
      <NavigationContainer>
        <LoginNavigator/>
      </NavigationContainer>
      );
  }


  return (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
  );
}
