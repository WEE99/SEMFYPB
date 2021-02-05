import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import {TableRowOpen} from "./TablesandTimeFormat";


const arryOpen =[
  {id:1, Lname: "MAX",company: "Google. Co", Status:"New Leads"},
  {id:2, Lname: "MINIS",company: "Nuclear", Status:"Contacted"},
  {id:3, Lname: "Willui ",company: "X", Status:"New Leads"},
  {id:4, Lname: "Xaruna",company: "Karun", Status:"Contacted"},
];

export default function App() {

  const pressWonLeads=()=>{
    alert('nav to WonLeads .js')
  };

  const pressLostLeads=()=>{
    alert('nav to LostLeads .js')
  };

  const pressOpenLeads=()=>{
    alert('nav to OpenLeads .js')
  };

  return (
    <View style={styles.container}>

      <View style={{alignItems:"center"}}>
      <Text style={styles.title}>Open Leads</Text>
      </View>

      <View style={styles.flexrowfortable}>
        <View >
          <TouchableOpacity style={styles.wonbutton} onPress={pressWonLeads}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.lostbutton} onPress={pressLostLeads}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.openbutton} onPress={pressOpenLeads}><Text> </Text></TouchableOpacity>
        </View>
      </View>

      <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={{borderRadius:10, backgroundColor:"#fff", paddingVertical:10, marginHorizontal:15, borderWidth:1, borderColor:"lightgrey", elevation: 2}}>

            <View style={{flexDirection:"row",borderBottomWidth:1, borderColor:"white", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                    Name
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                    Status
                </Text>
            </View>

            {arryOpen.map((info) =>
                <TableRowOpen key={info.id} data={info} />
            )}



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
    //alignItems:"center",
    justifyContent: 'center',
    //padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  flexrowfortable:{
    marginTop:10,
    marginBottom:10,
    flexDirection:"row",
    // paddingLeft:"20%",
    // paddingRight:"20%"
    justifyContent:"center"
  },

  wonbutton:{
    marginRight:25,
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  lostbutton:{
    marginRight:25,
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  openbutton:{
    backgroundColor: "orange",
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },


});
