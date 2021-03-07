import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import { orange } from './TablesandTimeFormat';

// export default function App() {
export default ({navigation, route}) => {

  const pressTaskMainPage=()=>{
    alert('nav to TaskMainPage .js')
    navigation.navigate('Tasks');
    
  };


  const pressHistory=()=>{
    alert('nav to HistoryPage .js')
    navigation.navigate('Tasks History');
  };

  const pressAlert=()=>{
    alert('nav to OverdueTask.js')
    navigation.navigate('Overdue Task');
  };

  const pressCall=()=>{
    alert('nav to CallTask.js')
    navigation.navigate('Call Task');
  };

  const pressAppointment=()=>{
    alert('nav to AppoinmentTask.js')
    navigation.navigate('Appointment Task');
  };

  const pressOthers=()=>{
    alert('nav to OtherTask.js')
    navigation.navigate('Other Task');
  };

  return (
    <View style={styles.container}>
       <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Tasks</Text>
      </View> */}

      <View style={styles.flexrowNAV}>
        <View >
          <TouchableOpacity style={styles.taskbutton} onPress={pressTaskMainPage}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.historybutton} onPress={pressHistory}><Text> </Text></TouchableOpacity>
        </View>
      </View>


      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pressAlert}>
           <View style={styles.iconButtonBorder}>
           <Icon name='warning' size={40} color={orange} /> 
           <Text style={styles.icontext}>40</Text>
           <Text style={styles.icontext}>Overdue</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressCall}>
           <View style={styles.iconButtonBorder}>
           <Icon name='call' size={40} color={orange} /> 
           <Text style={styles.icontext} >40</Text>
           <Text style={styles.icontext}>Call</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>


      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pressAppointment}>
           <View style={styles.iconButtonBorder}>
           <Icon name='groups' size={40} color={orange} /> 
           <Text style={styles.icontext} >40</Text>
           <Text style={styles.icontext}>Appointment</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressOthers}>
           <View style={styles.iconButtonBorder}>
           <Icon name='description' size={40} color={orange}/> 
           <Text style={styles.icontext}>40</Text>
           <Text style={styles.icontext}>Others</Text>
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
    justifyContent: 'flex-start',
    // padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  flexrowNAV:{
    marginTop:10,
    marginBottom:10,
    alignSelf:"center",
    flexDirection:"row",
    // justifyContent:"flex-start"
  },

  flexrow:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
    // justifyContent:"space-around"
  },

  taskbutton:{
    marginRight:25,
    backgroundColor:orange,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  historybutton:{
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
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
    // fontSize:16,
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
