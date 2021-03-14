import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {auth, db, storage} from "./firebase";

export const greenDClr = "#067d5b";
export const redDClr = "#630e0e";
export const blueDClr = "#27708a";
export const white="#fff";
export const orange="#F8C018";
export const tableorange="#B56118";

const myheight=50;
const myheight2=70;//59 in andriod emulator not working it cover the words in the all row with that height




export const TableRowDashboard =({data,navigation,handlePressLead, handlePressQuote, handlePressLost, handlePressWon})=>{
  return (
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:myheight}}>

          <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, height:"100%"}}
           onPress={()=>{
            navigation.navigate('Details', data)
            }}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text>
          
          </TouchableOpacity>

          {/* <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color:data.contacted === "Contacted"? blueDClr:white, fontWeight:"bold",textAlign:"center"}}>
                {data.contacted}
          </Text> */}
          {data.contacted? 
          <Text style={{flex:0.25,height:"100%", fontSize: 13, paddingVertical: 2, color:blueDClr, fontWeight:"bold",justifyContent:"center",alignItems:"center",textAlign:"center",display:"flex",borderRightWidth:1,paddingTop:10}}><AntDesign name="check" size={24} color={greenDClr}/></Text> : 
          <Text style={{flex:0.25,height:"100%", fontSize: 13, paddingVertical: 2, color:white, fontWeight:"bold",justifyContent:"center",alignItems:"center",textAlign:"center",display:"flex",borderRightWidth:1,paddingTop:10}}></Text> }  

          <TouchableOpacity style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}}
           onPress={handlePressQuote}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"center"}}>
                RM {data.quote}
                {/* {data.result==="Won"? "RM "+ data.quote:"-"} */}
          </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}
            onPress={data.result=== "Won"? handlePressWon:handlePressLost}>
          <Text style={{color:data.result === "Won"? greenDClr:redDClr, fontWeight:"bold", textAlign:"center",width:"100%"}}>
                {data.result}
          </Text>
          {data.result==="Won"&&
          <Text  style={{color: "orange", fontWeight:"bold",textAlign:"center"}}>RM {data.quote}</Text>}
          </TouchableOpacity>
        </View>
  )
};



export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'P.M.' : 'A.M.';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


export const TableRowWon =({data})=>{
  return (
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:myheight2, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10}}>

          <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.Lname}</Text><Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text>
          </View>
          
          <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center", paddingTop:10}}>
                {data.QuoteSent}
          </Text>
          </View>

          <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", height:"70%"}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center" , paddingTop:10}}>
                {data.QuoteAgreed}
          </Text>
          </View>

        </View>
  )
};


export const TableRowLost =({data})=>{
  return (
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:myheight2, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10}}>

          <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.Lname}</Text><Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text>
          </View>
          {/* <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text> */}
          
          <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", height:"70%"}}>
          <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center", paddingTop:10, paddingLeft:5}} numberOfLines={1}>
                {data.Remarks}
          </Text>
          </View>   
        </View>
  )
};


export const TableRowOpen =({data})=>{
  return (
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:myheight2, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10}}>

          <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.Lname}</Text><Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text>
          </View>
          
          <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", height:"70%"}}>
          <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center", paddingTop:10}}>
                {data.Status}
          </Text>
          </View>   
        </View>
  )
};

export const Todotask1=({data,navigation})=>{

      const [tasklist,settasklist]=useState([]);

      useEffect(() => {
            let arr=[];
            console.log(data);
           for(let a=0; a< data.length;a++)
           {
            if(a > 0)
            {
                 if (data[a].date !== data[a-1].date)
                 {
                       let o={};
                       o.date = data[a].date;
                       o.data = [];
                       o.data.push(data[a].id);
                       arr.push(o);
                 }
                 else
                 {
                        arr[arr.length-1].data.push(data[a].id);
                 }
            }
            else 
            {
                  let o={};
                  o.date = data[a].date;
                  o.data = [];
                  o.data.push(data[a].id);
                  arr.push(o);   
            }
           }
           settasklist(arr);
          },[]);
        
      return (
            <View>
            {tasklist.map((task)=>
            <Todotask2 key={task.date} data={task} navigation={navigation}/>
            )}
            </View>
      )
    };


export const Todotask2=({data,navigation})=>{

      const [day,setday]=useState("");

      useEffect(() => {
            console.log(data.data);
            let d=new Date(data.date);
            setday(d.getDay());
          },[]);

      return (
            <View>
            <View style={{paddingTop:10}}>
            <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:"#FFFFFF", marginHorizontal:15, elevation: 2}}>
            <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                      <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}>
                          {data.date}
                      </Text>
                      <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:orange,textAlign:"right"}}>
                         {days[day]}
                      </Text>
                  </View>
            </View>
            </View>
            {data.data.map((task)=>
            <Todotask3 key={task} data={task} navigation={navigation}/>
            )}
            <View style={{borderBottomRightRadius:10,borderBottomLeftRadius:10, backgroundColor:"#ffffff",height:10,marginHorizontal:15}}>

            </View>
            </View>
      )
    };

    
export const Todotask3=({data,navigation})=>{

      const [tasksData, settasksData]= useState({});
      
      useEffect(() => {
            console.log(data)
            db.collection("tasks").doc(data).get().then((doc) => {
                  if (doc.exists) {
                      let O = doc.data();
                      console.log("Document data:", doc.data());
                      O.time = formatAMPM(O.date.toDate());
                      O.date = O.date.toDate();
                      settasksData(O);
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }).catch((error) => {
                  console.log("Error getting document:", error);
              });
              
          },[]);

      const handleSpecificTask=()=>{
            navigation.navigate("Task Detail",tasksData);
      }

      // pressSpecifictTask
      return (
            <TouchableOpacity  onPress={handleSpecificTask}>
            <View style={{backgroundColor:"#FFFFFF", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
            <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                      <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
                          {tasksData.time}   <Text style={{color:orange}}> {tasksData.title}</Text>
                      </Text>
                      {/* <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
                          {tasksData.name}
                      </Text> */}
                  </View>
            </View>
            </TouchableOpacity>
      
      )
    };



