import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {auth, db, storage} from "../components/firebase";

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
            navigation.navigate('Lead Detail', data)
            }}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>({data.company})</Text>
          
          </TouchableOpacity>

          {/* <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color:data.contacted === "Contacted"? blueDClr:white, fontWeight:"bold",textAlign:"center"}}>
                {data.contacted}
          </Text> */}
          {data.contacted? 
         <TouchableOpacity style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}} onPress={()=>{
            // alert("id :" +data.id+" "+data.name)
            var LeadRef = db.collection("leads").doc(data.id);

                // Set the "capital" field of the city 'DC'
                return LeadRef.update({
                  contacted: false
                  })
                  .then(() => {
                  console.log("Document successfully updated!");
                  alert("State: Not Contacted")
                  })
                  .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                  });              

            
            }}
         ><AntDesign name="check" size={24} color={greenDClr}/></TouchableOpacity> : 
         <TouchableOpacity style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}} onPress={()=>{
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
         ><AntDesign name="check" size={24} color="white"/></TouchableOpacity>
         }  

          <TouchableOpacity style={{flex:0.25,height:"100%",fontSize: 13, paddingVertical: 2, fontWeight:"bold",justifyContent:"center",alignItems:"center",display:"flex",borderRightWidth:1}}
           onPress={()=>{
            // alert("nav setQuotationSend .js")
            navigation.navigate("Set Quotation Sent",data);
            }}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                RM {data.quote}
                {/* {data.result==="Won"? "RM "+ data.quote:"-"} */}
          </Text>
          </TouchableOpacity>

{data.result=== "Open"? 
          
          <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}>
          <Text style={{color:redDClr, fontWeight:"bold", textAlign:"center",width:"100%"}}>
                {data.result}
          </Text>
          </TouchableOpacity>
          :<TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}
            onPress={data.result=== "Won"? handlePressWon2:handlePressLost2}>
          <Text style={{color:data.result === "Won"? greenDClr:"red", fontWeight:"bold", textAlign:"center",width:"100%"}}>
                {data.result}
          </Text>
          {data.result==="Won"&&
          data.quoteAgreed !==""?
          <Text  style={{color: "orange", fontWeight:"bold",textAlign:"center"}}>RM {data.quoteAgreed}</Text>:
          null}
          </TouchableOpacity>
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




export const TableRowTask =({data,navigation})=>{
  if (data.status == "Not completed"){
  return (
        <View style={{flexDirection:"row", alignItems:"center", height:30, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10,elevation:2}}>
          <View style={{flex:0.7,fontSize: 13, padding:5, fontWeight:"bold",textAlign:"center",borderRadius:10,backgroundColor:"lightgreen", height:"100%"}}>
      <TouchableOpacity  onPress={()=>{
      //alert("nav EditTask .js")
      navigation.navigate("Edit Task",data);
      }}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.title} | {data.date}</Text>
      </TouchableOpacity>
          </View>
      

          <View style={{flex:0.3,flexDirection:"row",alignItems:"center", alignSelf:"center"}}>
          <TouchableOpacity   style={{flex:0.5}} onPress={()=>{
            Alert.alert(
                  "Confirmation",
                  "Are you sure you want to delete this task?",
                  [{
                        text:"CANCEL",
                        style: "cancel"
                  },
                  {
                        text:"DELETE",
                        onPress: ()=>{
                              console.log("taskid: "+data.id)
                              db.collection("tasks").doc(data.id).delete().then(() => {
                                    console.log("Document successfully deleted!");
                                    alert("Task Deleted")
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });

                        }
                  },
                  ]
            )
            }}
           >
          <View style={{paddingHorizontal:10, justifyContent:"center", height:"100%"}}>
          <AntDesign name="delete" size={24} color="black" />
          </View>
          </TouchableOpacity>

          <TouchableOpacity   style={{flex:0.5}} onPress={()=>{
            Alert.alert(
                  "Confirmation",
                  "Confirmation of completion of task",
                  [{
                        text:"CANCEL",
                        style: "cancel"
                  },
                  {
                        text:"CONFIRM",
                        onPress: ()=>{
                              console.log("taskid: "+data.id)
                              var taskRef = db.collection("tasks").doc(data.id);

                              // Set the "capital" field of the city 'DC'
                              return taskRef.update({
                              status: "Completed"
                              })
                              .then(() => {
                              console.log("Document successfully updated!");
                              alert("Task Completed")
                              })
                              .catch((error) => {
                              // The document probably doesn't exist.
                              console.error("Error updating document: ", error);
                              });
                        }
                  },
                  ]
            )
            }}
           >
          <View style={{paddingHorizontal:10,justifyContent:"center", height:"100%"}}>
          <AntDesign name="check" size={24} color="green" />
          </View>  
          </TouchableOpacity>
          </View>

        </View>
  )
}
else{
      return (
            <View style={{flexDirection:"row", alignItems:"center", height:30, backgroundColor: 'lightgreen',borderRadius:10, marginTop:10,elevation:2}}>
    
              <View style={{flex:0.7,fontSize: 13, padding:5, fontWeight:"bold",textAlign:"center",borderRadius:10,backgroundColor:"lightgrey", height:"100%"}}>
              <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
                   {data.title} | {data.date}</Text>
              </View>
              
            
              <View style={{flex:0.3,fontSize: 13, padding:5, fontWeight:"bold",textAlign:"center",borderRadius:10, backgroundColor:'lightgreen',height:"100%"}}>
              <Text>Completed</Text>
              </View>
              
    
            </View>
      )
}

};


export const TableHistoryTask =({data,navigation})=>{
  return (
        <TouchableOpacity onPress={()=>{navigation.navigate('Task Detail', data)}}>
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:50, backgroundColor: 'lightgreen',borderRadius:10, marginTop:10}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.type} | {data.date} | ({data.name})
          </Text>
        </View> 
        </TouchableOpacity> 
  )
};




export const TableRowLost =({data})=>{
  return (
        <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:50, backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>

          <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:"black",height:"100%"}}>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
               {data.name} ({data.company})</Text>
          </View>
          {/* <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
          <Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text> */}
          
          <View style={{flex:0.5,fontSize: 13, paddingVertical:2,paddingHorizontal:10, fontWeight:"bold",textAlign:"center",height:"100%"}}>
          {data.Remarks!=""?
          <Text style={{fontSize: 13, color: "grey", fontWeight:"bold",textAlign:"left"}}>
                {data.Remarks}
          </Text>:
           <Text style={{fontSize: 13, color: "red", fontWeight:"bold",alignItems:"center"}}>
           No remarks !
          </Text>}
          </View>   
        </View>
  )
};

export const TableRowWon =({data})=>{
      return (


            <View style={{flexDirection:"row",borderBottomWidth:1, borderColor:"black", backgroundColor:"#fff", paddingHorizontal:10,height:40}}>
                <View style={{flex:0.31,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"left",borderRightWidth:1, borderColor:"black",height:"100%"}}>
                <Text style={{fontSize: 13, color:"grey", fontWeight:"bold",textAlign:"left"}}numberOfLines={1}>
                {data.name} ({data.company})
                </Text>
                </View>

                <View style={{flex:0.31,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1,paddingHorizontal:10, borderColor:"black",height:"100%"}}>
                <Text style={{fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",textAlign:"center"}}>
                RM {data.quote}
                </Text>
                </View>

                <View style={{flex:0.31,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", borderColor:"black",height:"100%"}}>
                  {data.quoteAgreed!=""?
                  <Text style={{fontSize: 13, color: "grey", fontWeight:"bold",textAlign:"center"}}>
                        RM {data.quoteAgreed}
                  </Text>:
                  <Text style={{fontSize: 13, color: "grey", fontWeight:"bold",alignItems:"center"}}>
                  -
                  </Text>}
                  </View>   

                {/* {data.quoteAgreed!=""?
                <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", borderColor:"black",height:"100%"}}>
                <Text style={{fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",textAlign:"center"}}>
                RM {data.quoteAgreed}
                </Text>
                </View>:
                 <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", borderColor:"black",height:"100%"}}>
                 <Text style={{fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",textAlign:"center"}}>
                 -
                 </Text>
                 </View>} */}
            </View>
            )};



export const TableRowTaskProfile =({data,navigation})=>{
      return (
            <View style={{flexDirection:"row", alignItems:"center", height:30, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10,elevation:2}}>
              <View style={{flex:0.7,fontSize: 13, padding:5, fontWeight:"bold",textAlign:"center",borderRadius:10,backgroundColor:"lightgreen", height:"100%"}}>
          <TouchableOpacity  onPress={()=>{
          //alert("nav EditTask .js")
          navigation.navigate("Edit Task",data);
          }}>
              <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
                   {data.title} | {data.date} ({data.name})</Text>
          </TouchableOpacity>
              </View>
          
    
              <View style={{flex:0.3,flexDirection:"row",alignItems:"center", alignSelf:"center"}}>
              <TouchableOpacity   style={{flex:0.5}} onPress={()=>{
                Alert.alert(
                      "Confirmation",
                      "Are you sure you want to delete this task?",
                      [{
                            text:"CANCEL",
                            style: "cancel"
                      },
                      {
                            text:"DELETE",
                            onPress: ()=>{
                                  console.log("taskid: "+data.id)
                                  db.collection("tasks").doc(data.id).delete().then(() => {
                                        console.log("Document successfully deleted!");
                                        alert("Task Deleted")
                                    }).catch((error) => {
                                        console.error("Error removing document: ", error);
                                    });
    
                            }
                      },
                      ]
                )
                }}
               >
              <View style={{paddingHorizontal:10, justifyContent:"center", height:"100%"}}>
              <AntDesign name="delete" size={24} color="black" />
              </View>
              </TouchableOpacity>
    
              <TouchableOpacity   style={{flex:0.5}} onPress={()=>{
                Alert.alert(
                      "Confirmation",
                      "Confirmation of completion of task",
                      [{
                            text:"CANCEL",
                            style: "cancel"
                      },
                      {
                            text:"CONFIRM",
                            onPress: ()=>{
                                  console.log("taskid: "+data.id)
                                  var taskRef = db.collection("tasks").doc(data.id);
    
                                  // Set the "capital" field of the city 'DC'
                                  return taskRef.update({
                                  status: "Completed"
                                  })
                                  .then(() => {
                                  console.log("Document successfully updated!");
                                  alert("Task Completed")
                                  })
                                  .catch((error) => {
                                  // The document probably doesn't exist.
                                  console.error("Error updating document: ", error);
                                  });
                            }
                      },
                      ]
                )
                }}
               >
              <View style={{paddingHorizontal:10,justifyContent:"center", height:"100%"}}>
              <AntDesign name="check" size={24} color="green" />
              </View>  
              </TouchableOpacity>
              </View>
    
            </View>
      )
    };
    

