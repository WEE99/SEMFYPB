import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView} from 'react-native';
import {TableRowWon} from "./TablesandTimeFormat";


const arryWon =[
  {id:1, Lname: "HoT",company: "Google. Co", QuoteSent:"RM 80000", QuoteAgreed:"RM 3000"},
  {id:2, Lname: "John",company: "CERN Nuclear reacher centre", QuoteSent:"RM 3000", QuoteAgreed:"RM 3000"},
  {id:3, Lname: "Willy sadadd casdsaasdsdf",company: "SPACE X", QuoteSent:"RM 6000", QuoteAgreed:"RM 3000"},
  {id:4, Lname: "Karuna",company: "Karuna", QuoteSent:"RM 5000", QuoteAgreed:"RM 3000"},
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
      <Text style={styles.title}>Won Leads</Text>
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
    <ScrollView>
      <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={{borderRadius:10, backgroundColor:"#fff", paddingVertical:10, marginHorizontal:15, borderWidth:1, borderColor:"lightgrey", elevation: 2}}>
            <View style={{flexDirection:"row",borderBottomWidth:1, borderColor:"white", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                    Name
                </Text>
                <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                    Quotation Sent
                </Text>
                <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                    Quote Agreed
                </Text>
            </View>

            {arryWon.map((info) =>
                <TableRowWon key={info.id} data={info} />
            )}



            </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
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
    backgroundColor: "orange",
    borderRadius: 100,
    borderWidth:1,
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
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },


});
