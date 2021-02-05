import { StatusBar } from 'expo-status-bar';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';


export default function App() {

  const pressOpenMenu=()=>{
    alert('nav to ProfileSetting .js');
  }

  return (
    <View style={styles.settingiconView}>
      <View style={styles.settingicon}>
              <TouchableOpacity
                onPress={pressOpenMenu}>
               <MaterialCommunityIcons name='cog-outline' size={30} color ="grey"  />
              </TouchableOpacity>
      </View>
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.diamondborder}>
        <View style={styles.squareborder}>
        <Image source={{uri:"https://i.pinimg.com/originals/83/f9/37/83f937b69f30bb886ab8a03390da6771.jpg"}} style={styles.image}/>
        </View>
      </View>

      <View style={styles.UsernameContainer}>
        <Text style={styles.titleUsername}>Username</Text>
        <Text style={styles.usersmallname}>KillCow</Text>
      </View>
      
      <View style={styles.userinfoContainer}>
      <View style={styles.flexrow}>
           <Icon name='call' size={20} /> 
           <View style={styles.userinfo}>
           <Text style={styles.userdata}>011 222 213</Text>
           </View>
      </View>

      <View style={styles.flexrow}>
           <Icon name='email' size={20}  /> 
           <View style={styles.userinfo}>
           <Text style={styles.userdata}>google@email.com</Text>
           </View>
      </View>

      <View style={styles.flexrow}>
           <Icon name='person' size={20} /> 
           <View style={styles.userinfo}>
           <Text style={styles.userdata}>Salesperson</Text>
           </View>
      </View>
      </View>



      <StatusBar style="auto" />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'flex-start',
    paddingTop:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  diamondborder: {
    marginTop:"15%",
    //padding:5,
    width: 150,
    height: 150,
    borderWidth:1,
    borderColor: "orange",
    alignItems:"center",
    transform: [{ rotate: "45deg" }],
  },

  squareborder:{
    borderWidth:1,
    borderColor: "orange",
    padding:5,
    alignItems:"center",
    transform: [{ rotate: "-45deg" }],
  },
  
  image:{
    width: 150,
    height: 150,
    borderRadius:10,
  },

  UsernameContainer:{
    alignItems:"center",
  },

  titleUsername:{
    marginTop:"1%",
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  usersmallname:{
    marginTop:"1%",
    fontWeight:"bold",
    fontSize:10,
    color:"orange",
    //alignItems:"center",
  },

  userinfoContainer:{
    padding:10,
    borderWidth:2,
    borderRadius:20,
    borderColor:"grey",
    marginTop:"15%",
    width:200,
    height:150,

  },

  flexrow:{
    marginTop:10,
    flexDirection:"row",
    // justifyContent:"space-around"
  },

  userinfo:{
    marginLeft:40,
    //textAlign:"center",
    justifyContent:"center",
    flex:1,
  },

  userdata:{
    fontWeight:'bold',
    color:"grey"
  },

  settingiconView:{
    alignItems:"center",
    padding:5
  },

  settingicon:{
    position:"absolute",
    //top:15,
    right:5,
  },

});
