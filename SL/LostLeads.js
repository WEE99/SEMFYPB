import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView} from 'react-native';
import {orange, TableRowLost} from "./TablesandTimeFormat";


const arryLost =[
  {id:1, Lname: "Bob",company: "Google. Co", Remarks:"Not Interessed"},
  {id:2, Lname: "John Doe",company: "Nuclear reacher", Remarks:"Very Not Interested really not into it worst person to work with ban this client"},
  {id:3, Lname: "William ",company: "SPACE X", Remarks:"He wanna deal in RM 2"},
  {id:4, Lname: "Saruna",company: "Karuna", Remarks:"Cannot la this"},
  {id:5, Lname: "Saruna",company: "Karuna", Remarks:"Cannot la this"},
  {id:6, Lname: "Saruna",company: "Karuna", Remarks:"Cannot la this"},
  {id:7, Lname: "Saruna",company: "Karuna", Remarks:"Cannot la this"},
];

//export default function App() {

  export default ({navigation, route}) => {

    const pressWonLeads=()=>{
      alert('nav to WonLeads .js')
      navigation.navigate('Won Leads');
    };
  
    const pressLostLeads=()=>{
      alert('nav to LostLeads .js')
      navigation.navigate('Lost Leads');
    };
  
    const pressOpenLeads=()=>{
      alert('nav to OpenLeads .js')
      navigation.navigate('Open Leads');
    };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>

      {/* <View style={{alignItems:"center"}}>
      <Text style={styles.title}>Lost Leads</Text>
      </View> */}

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

<ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, marginLeft:"5%", marginRight:"5%", marginBottom:"5%"}}>
     <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={{borderRadius:10, backgroundColor:"#fff", marginHorizontal:15, borderWidth:1, borderColor:orange, elevation: 2, borderTopWidth:0}}>

            <View style={{flexDirection:"row", borderBottomWidth:1, borderColor:orange, backgroundColor:orange, paddingHorizontal:10, paddingBottom:4, borderTopLeftRadius:10, borderTopRightRadius:10}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:"black", fontWeight:"bold",textAlign:"center"}}>
                    Name
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"center"}}>
                    Remarks
                </Text>
            </View>

            {arryLost.map((info) =>
                <TableRowLost key={info.id} data={info} />
            )}
            </View>
      <StatusBar style="auto" />
    </View>
</ScrollView>
</ImageBackground>
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
    backgroundColor: "orange",
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  openbutton:{
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },


});
