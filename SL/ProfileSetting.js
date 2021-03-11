import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Entypo} from 'react-native-vector-icons';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import {auth} from "./firebase";
import { orange } from './TablesandTimeFormat';

//export default function App() {
export default ({navigation, route}) => {

  const pressEditProfile=()=>{
    alert('nav to EditProfile .js')
    navigation.navigate('Edit Profile');
  };


  const pressEditNotify=()=>{
    alert('nav to EditNotification .js')
    navigation.navigate('Notifications');
  };

  const pressEditPassword=()=>{
    alert('nav to EditPassword .js')
    navigation.navigate('Password');
  };

  const pressHelp=()=>{
    alert('nav to Help .js')
  };

  const pressLogout=()=>{
    // var r = confirm("Are you sure you want to Logout?");
    var r=true;
    if (r == true) {
      auth.signOut().then(() => {
        console.log("Logout Successfully");
        // Sign-out successful.
      }).catch((error) => {
        alert("An Error Occured. Try Again Later")
        // An error happened.
      });
    } 
  };

 
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Settings</Text>
      </View> */}

    
      <View style={{marginTop:30, alignSelf:"center"}}>
      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pressEditProfile}>
           <View style={styles.iconButtonBorder}>
           <Icon name='person' size={40} color={orange}/> 
           <Text style={styles.icontext}>Profile</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressEditNotify}>
           <View style={styles.iconButtonBorder}>
           <Icon name='notifications' size={40} color={orange}/> 
           <Text style={styles.icontext}>Notification</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pressEditPassword}>
           <View style={styles.iconButtonBorder}>
           <Entypo name='key' size={40} color={orange}/> 
           <Text style={styles.icontext}>Password</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressHelp}>
           <View style={styles.iconButtonBorder}>
           <Icon name='help' size={40} color={orange} /> 
           <Text style={styles.icontext}>Help</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop:10, alignSelf:"center"}}>
        <TouchableOpacity style={styles.iconButton} onPress={pressLogout}>
           <View style={styles.iconButtonBorder}>
           <Icon name='logout' size={40} color={orange} /> 
           <Text style={styles.icontext}>Logout</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>


      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'center',
    // padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    alignSelf:"center",
    color:"black",
    alignItems:"flex-start",
  },

  flexrow:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
    // justifyContent:"space-around"
  },

  iconContainer:{
    marginRight:20,
  },

  iconButtonBorder:{
    borderWidth:2,
    borderColor:orange,
    borderRadius:10,
    padding:"10%",
    //textAlign:"center",
    //justifyContent:"center",
    alignItems:"center",
    width:110,
    height:100,
  },

  icontext:{
    color:"white",
    // fontSize:10,
    fontWeight:"bold",
  },

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },

});
