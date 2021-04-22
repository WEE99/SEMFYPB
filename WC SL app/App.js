import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {auth, db, storage} from "./final/CA/firebase";
import Login from './final/LoginPage';
// import Forgot from './final/Forgot';
import CAPage from './final/CA/stackNavigation_CA.js';
import SLPage from './final/SL/stackNavigation_SL.js';
import SAPage from './final/SA/stackNavigation_SA.js';
import {NavigationContainer, DrawerActions,DefaultTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function App() {

  const [initializing, setInitializing] = React.useState(true);
  const [theUser, setTheUser] = React.useState(null);
  // const [role, setRole] = React.useState("Salesperson");
  const [role, setRole] = React.useState("Salesperson");

  const LoginStack = createStackNavigator();


  // function onAuthStateChanged(user){
  // if (user) {
  //   setTheUser(user)
  //   db.collection("users").where("UID", "==",user.user.uid)
  //               .get()
  //               .then(function (doc) {
  //                         if (doc.exists) {
  //                             console.log("Document data:", doc.data());
  //                             var d = doc.data();
  //                             setRole(d.role);
  //                         } else {
  //                             // console.log("No such document!");
  //                         }
  //                     }).catch(function (error) {
  //                         console.log("Error getting document:", error);
  //                     });
  //                 }

  //                 if (initializing) setInitializing(false);
  //               }
                    
                
   //////////////////////           

  function onAuthStateChanged(user) {
    setTheUser(user);
    console.log("hello 1 ")
    if (theUser !==null) {
      //get all users info from firestore
      console.log("ID: "+ theUser.user.uid)
      db.collection("users").where("UID", "==",theUser.user.uid).get().then(function (doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              var d = doc.data();
              setRole(d.role);
          } else {
              // console.log("No such document!");
          }
      }).catch(function (error) {
          console.log("Error getting document:", error);
      });
  }

    if (initializing) setInitializing(false);
  }

  // function onAuthStateChanged(user){
  //   if (user) {
  //     setTheUser(user)
  //     console.log("theUser: "+user.uid)
  //     db.collection("users").where("UID", "==",user.uid)
  //     .get()
  //     .then(function (doc) {
  //               if (doc.exists) {
  //                   console.log("Document data:", doc.data());
  //                   var d = doc.data();
  //                   setRole(d.role);
  //               } else {
  //                   console.log("No such document!");
  //               }
  //           }).catch(function (error) {
  //               console.log("Error getting document:", error);
  //           });
  //       }
  
  //       if (initializing) setInitializing(false);
  //   }

  useEffect(() => {
    console.log("hello")
    

    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    

    

  }, []);

  if (initializing) return null;

    //   if (theUser) {
    //     //get all users info from firestore
    //     db.collection("users").doc(user.uid).get().then(function (doc) {
    //         if (doc.exists) {
    //             console.log("Document data:", doc.data());
    //             var d = doc.data();
    //             setRole(d.admin);
    //         } else {
    //             // console.log("No such document!");
    //         }
    //     }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //     });
    // }

 

  //will hide the loginPage if the user did not logout
  if(initializing){
    return(
        <View></View>
    )
}

  // if(theUser===null){
  //   return (
  //       <Login></Login>
  //     );
  // }
  // else{
  //   console.log("Role :"+role)
  // }




//   function LoginStackNav() {
//     return (
//       <LoginStack.Navigator>
//         <LoginStack.Screen name="History" component={History} options={{headerShown: false}}/>
//         <LoginStack.Screen name="Task Detail" component={TaskDetaill}/>
//       </LoginStack.Navigator>
//     )
//   }
//   <Stack.Navigator >
//   <Stack.Screen name="Profile" component={Profile} />
//   <Stack.Screen name="Details" component={LeadDetail} />
// </Stack.Navigator>

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
      <Text>Welcome</Text>

      <TouchableOpacity onPress={()=>{
        
          auth.signOut().then(() => {
            // Sign-out successful.
            alert("pressed "+role)
          }).catch((error) => {
            // An error happened.
          });

          }}><Text>Logout</Text></TouchableOpacity>
    </View>
  );
}
