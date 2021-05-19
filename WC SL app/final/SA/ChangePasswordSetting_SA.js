import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StackNavigator, } from 'react-navigation';
import {auth, db, storage } from "./firebase";
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default ({navigation, route}) => {

  const [Oldpsw, setOldpsw]=useState("");
  const [Newpsw, setNewpsw]=useState("");
  const [Retypepsw, setRetypepsw]=useState("");
  const [email, setemail]=useState("");

  useEffect(() => {
    let user = auth.currentUser;
      if(user)
      {
        setemail(user.email)
        console.log("This user is: "+user.email)
      }
      
          
    },[]);

  const pressCancel =()=>{
    // alert("Cancel")
    navigation.goBack();
  }

  const pressSave =()=>{
    // alert("Save")
    if(Newpsw==Retypepsw && Newpsw!="" && Oldpsw!="" && Newpsw!="" && Newpsw.length>=6)
    {
      const emailCred  = firebase.auth.EmailAuthProvider.credential(
        email, Oldpsw);
        auth.currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
          // User successfully reauthenticated.
          auth.currentUser.updatePassword(Newpsw).then(function() {
            // Update successful.
            console.log("PSW Updated")
            alert("Resset Succesful")
            navigation.goBack()
          })
        })
        .catch(error => {
          console.log("This error occured: "+error)
        });
    
    }
    else
    {
      if(Newpsw.length<6){alert('Pasword need 6 letters')}
      else
      { 
        alert('Password not Match or Empty Field Detected')
      }
    }
  };
  



    return (
      <View style={styles.container}>

        <View style={styles.SetpswC}>
        <Text style={styles.intructionpsw}>Old Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputpsw}
            onChangeText={(val) => setOldpsw(val)}
          />
          <Text style={styles.intructionpsw}>New Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputpsw}
            onChangeText={(val) => setNewpsw(val)}
          />
          <Text style={styles.intructionpsw}>Retype  Password</Text>
          <TextInput
            secureTextEntry={true} 
            style={styles.inputpsw}
            onChangeText={(val) => setRetypepsw(val)}
          />
        </View>

        <View style={styles.ButtonView}>
          <TouchableOpacity
            style={styles.Button}
            onPress={pressCancel}
          >
            <Text style={styles.ButtonContent}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={pressSave}
          >
            <Text style={styles.ButtonContent}>Save</Text>
          </TouchableOpacity>


        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'Left',
    padding: "10%"
  },

  SetpswC: {
    backgroundColor: "white",
  },

  intructionpsw: {
    fontWeight: "bold",
    marginTop: 10,
  },

  inputpsw: {
    marginTop: 10,
    //borderWidth:2,
    backgroundColor: "lightgrey",
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  ButtonView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor:"black",
  },

  Button: {
    backgroundColor: 'black',
    padding: 10,
    width: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  ButtonContent: {
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
  },

});
