import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import React, {useEffect, useState, Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {auth, db, storage} from "./final/components/firebase";
import Login from './final/LoginPage';
import Forgot from './final/ForgotPassword';
import CAPage from './final/CA/stackNavigation_CA.js';
import SLPage from './final/SL/stackNavigation_SL.js';
import SAPage from './final/SA/stackNavigation_SA.js';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DrawerActions,DefaultTheme } from '@react-navigation/native';

const LoginStack = createStackNavigator();

function LoginStackNav() {
  return (
<NavigationContainer>
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <LoginStack.Screen name="Forgot" component={Forgot} options={{headerShown: false}}/>
    </LoginStack.Navigator>
</NavigationContainer>
  )
}


export default function App() {

  const [initializing, setInitializing] = React.useState(true);
  const [theUser, setTheUser] = React.useState(null);
  // const [role, setRole] = React.useState("Salesperson");
  const [role, setRole] = React.useState(null);

  

           

  function onAuthStateChanged(user) {
    console.log("hello 1 ")
    setTheUser(user);
    if (user !==null) {
      console.log("ID: "+ user.uid)
     
      //get all users info from firestore
      console.log("ID: "+ user.uid)
      db.collection("users").where("UID", "==",user.uid).get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              setRole(doc.data().role)
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      }); 
  }

    if (initializing) setInitializing(false);
  }



  useEffect(() => {
    console.log("hello")
    

    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    
  }, []);

  

 

  //will hide the loginPage if the user did not logout
  if(initializing){
    return(
        <View>
        </View>
    )
}

  if(theUser===null || role===null){
    return (
        <LoginStackNav></LoginStackNav>
      );
  }
  else{
    console.log("Role :"+role)
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
    // <Login></Login>
    <View>
      {/* <Text>Welcome</Text>
      <Text>Welcome</Text>
      <Text>Welcome</Text>
      <Text>Welcome</Text>
      <Text>Welcome</Text> */}
      {/* <TouchableOpacity
          
          onPress={() =>  auth.signOut().then(() => {
            // Sign-out successful.
            Alert.alert('Logout',"pressed")
          }).catch((error) => {
            // An error happened.
          })}
         >
  <Text>Logout</Text>
  </TouchableOpacity> */}
    </View>
  );
}
