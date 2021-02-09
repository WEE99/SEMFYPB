import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Entypo} from 'react-native-vector-icons';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';

export default function App() {

  const pressEditProfile=()=>{
    alert('nav to EditProfile .js')
  };


  const pressEditNotify=()=>{
    alert('nav to EditNotification .js')
  };

  const pressEditPassword=()=>{
    alert('nav to EditPassword .js')
  };

  const pressLogout=()=>{
    alert('Are you sure you want to Logout?')
  };

 
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Settings</Text>
      </View>

    

      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pressEditProfile}>
           <View style={styles.iconButtonBorder}>
           <Icon name='person' size={40} /> 
           <Text style={styles.icontext}>Profile</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressEditNotify}>
           <View style={styles.iconButtonBorder}>
           <Icon name='notifications' size={40} /> 
           <Text style={styles.icontext}>Notification</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>


      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pressEditPassword}>
           <View style={styles.iconButtonBorder}>
           <Entypo name='key' size={40} /> 
           <Text style={styles.icontext}>Password</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressLogout}>
           <View style={styles.iconButtonBorder}>
           <Icon name='logout' size={40} /> 
           <Text style={styles.icontext}>Logout</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'flex-start',
    padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  flexrow:{
    marginTop:10,
    flexDirection:"row",
    // justifyContent:"space-around"
  },

  iconContainer:{
    marginRight:10,
  },

  iconButtonBorder:{
    borderWidth:2,
    borderColor:"grey",
    borderRadius:10,
    padding:"10%",
    //textAlign:"center",
    //justifyContent:"center",
    alignItems:"center",
    width:110,
    height:100,
  },

  icontext:{
    color:"orange",
    // fontSize:10,
    fontWeight:"bold",
  },

});
