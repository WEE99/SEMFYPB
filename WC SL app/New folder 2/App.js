import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {auth, db} from './firebase';
import Login from './final/LoginPage.js';
// import Forgot from './final/Forgot';
import CAPage from './final/CA/stackNavigation_CA.js';
import SLPage from './final/SL/stackNavigation_SL.js';
import SAPage from './final/SA/stackNavigation_SA.js';



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
        <Login></Login>
      );
  }

  if(role==="Salesperson"){
    return (
        <SLPage></SLPage>
      );
  }

  if(role==="Company Admin"){
    return (
        <CAPage></CAPage>
      );
  }

  if(role==="Super Admin"){
    return (
        <SAPage></SAPage>
      );
  }


  return (
    <Login></Login>
  );
}
