import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {auth, db, storage} from "../components/firebase";
import { Card } from 'react-native-paper';
export const greenDClr = "#067d5b";
export const redDClr = "#630e0e";
export const blueDClr = "#27708a";
export const white="#fff";
export const orange="#F8C018";
export const tableorange="#B56118";

const myheight=50;
const myheight2=70;//59 in andriod emulator not working it cover the words in the all row with that height

export const TableRowDashboard =({data,navigation,handlePressLead, handlePressQuote, handlePressLost, handlePressWon})=>{
      
  const handlePressWon2=()=>{
        // alert("Set Quotation Agreed. js")
        navigation.navigate("Set Quotation Agreed",data);
      }

  const handlePressLost2=()=>{
        // alert("Edit Remarks. js")
        navigation.navigate("Edit Remarks",data);
      }

return (
    <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:myheight}}>

      <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, height:"100%"}}
       onPress={()=>{
        navigation.navigate('Lead Detail', {paramName: data.name, paramEmail:data.email, paramContact: data.contactNumber, paramInterest:data.interest, paramCompany:data.company, paramComment: data.comment, paramUserID: data.userId, paramUserID2: data.userId2, paramSalesperson: data.salesperson, paramSalesperson2: data.salesperson2})
        }}>
      <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
      <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>({data.company})</Text>
      
      </TouchableOpacity>

      {/* <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color:data.contacted === "Contacted"? blueDClr:white, fontWeight:"bold",textAlign:"center"}}>
            {data.contacted}
      </Text> */}
      {data.contacted? 
     <View style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}} 
     ><AntDesign name="check" size={24} color={greenDClr}/></View> : 
     <View style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}} onPress={()=>{
        // alert("id :" +data.id+" "+data.name)
        var LeadRef = db.collection("leads").doc(data.id);

            // Set the "capital" field of the city 'DC'
            return LeadRef.update({
              contacted: true
              })
              .then(() => {
              console.log("Document successfully updated!");
              alert("State: Contacted")
              })
              .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
              });              

        
        }}
     ><AntDesign name="check" size={24} color="white"/></View>
     }  

      <View style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}}>
      <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
            RM {data.quote}
            {/* {data.result==="Won"? "RM "+ data.quote:"-"} */}
      </Text>
      </View>

{data.result=== "Open"? 
      
      <View style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}>
      <Text style={{color:redDClr, fontWeight:"bold", textAlign:"center",width:"100%"}}>
            {data.result}
      </Text>
      </View>
      :<View style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}>
      <Text style={{color:data.result === "Won"? greenDClr:"red", fontWeight:"bold", textAlign:"center",width:"100%"}}>
            {data.result}
      </Text>
      {data.result==="Won"&&
      data.quoteAgreed !==""?
      <Text  style={{color: "orange", fontWeight:"bold",textAlign:"center"}}>RM {data.quoteAgreed}</Text>:
      null}
      </View>
      }
      

      {/* <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}
        onPress={data.result=== "Won"? handlePressWon:handlePressLost}>
      <Text style={{color:data.result === "Won"? greenDClr:redDClr, fontWeight:"bold", textAlign:"center",width:"100%"}}>
            {data.result}
      </Text>
      {data.quoteAgreed ==="" && data.result==="Won"?
      <Text  style={{color: "red", fontWeight:"bold",textAlign:"center"}}>!!</Text>:
      <Text  style={{color: "orange", fontWeight:"bold",textAlign:"center"}}>RM {data.quoteAgreed}</Text>
      }
      </TouchableOpacity> */}
    </View>
)
};

export const HistoryTask =({data,navigation})=>{
  return (
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:50, backgroundColor: 'lightgreen',borderRadius:10, marginTop:10}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.type} | {data.date} | ({data.name})
          </Text>
        </View> 
  )
};





    

