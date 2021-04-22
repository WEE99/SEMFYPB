import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {auth, db, storage} from "../CA/firebase";

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
            alert("Set Quotation Agreed. js")
            navigation.navigate("Set Quotation Agreed",data);
          }

      const handlePressLost2=()=>{
            alert("Edit Remarks. js")
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
            alert("nav setQuotationSend .js")
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


// export const TableRowWon =({data})=>{
//   return (
//         <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:myheight2, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10}}>

//           <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
//           <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
//                {data.Lname}</Text><Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text>
//           </View>
          
//           <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
//           <Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center", paddingTop:10}}>
//                 {data.QuoteSent}
//           </Text>
//           </View>

//           <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", height:"70%"}}>
//           <Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center" , paddingTop:10}}>
//                 {data.QuoteAgreed}
//           </Text>
//           </View>

//         </View>
//   )
// };


// export const TableRowLost =({data})=>{
//   return (
//         <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:50, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10}}>

//           <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:orange, height:"70%"}}>
//           <Text style={{fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
//                {data.Lname}</Text><Text style={{fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text>
//           </View>
//           {/* <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
//           <Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text> */}
          
//           <View style={{flex:0.5,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center", height:"70%"}}>
//           <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:tableorange, fontWeight:"bold",textAlign:"center", paddingTop:10, paddingLeft:5}} numberOfLines={1}>
//                 {data.Remarks}
//           </Text>
//           </View>   
//         </View>
//   )
// };




export const TableRowTask =({data,navigation})=>{
  if (data.status == "Not completed"){
  return (
        <View style={{flexDirection:"row", alignItems:"center", height:30, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10,elevation:2}}>
          <View style={{flex:0.7,fontSize: 13, padding:5, fontWeight:"bold",textAlign:"center",borderRadius:10,backgroundColor:"lightgreen", height:"100%"}}>
      <TouchableOpacity  onPress={()=>{
      alert("nav EditTask .js")
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


            <View style={{flexDirection:"row",borderBottomWidth:1, borderColor:"black", backgroundColor:"#fff", paddingHorizontal:1,height:40}}>
                <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",borderRightWidth:1,paddingTop:10 }}numberOfLines={1}>
                {data.name} ({data.company})
                </Text>
                <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",borderRightWidth:1,paddingTop:10,textAlign:"center"}}>
                RM {data.quote}
                </Text>
                {data.quoteAgreed!=""?
                <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",paddingTop:10,textAlign:"center"}}>
                RM {data.quoteAgreed}
                </Text>:
                 <Text style={{flex:0.33,fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",paddingTop:10,textAlign:"center"}}>
                 -
                 </Text>}
            </View>
            )};
            {/* <View style={{flexDirection:"row",borderTopWidth:1, borderColor:"lightgrey", paddingHorizontal:10, alignItems:"center", height:50, backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
    
              <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:"black",height:"100%"}}>
              <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>
                   {data.name} ({data.company})</Text>
              </View> */}
              {/* <Text style={{fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"left"}}  numberOfLines={1}>{data.name}</Text>
              <Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"left"}} numberOfLines={1}>{data.company}</Text> */}
               {/* <View style={{flex:0.33,fontSize: 13, paddingVertical:2, fontWeight:"bold",textAlign:"center",borderRightWidth:1, borderColor:"black",height:"100%"}}>
               <Text style={{fontSize: 13, paddingVertical: 2, color:"grey", fontWeight:"bold",textAlign:"center", paddingTop:10}}>
                    RM {data.quote}
              </Text>
              </View>
              <View style={{flex:0.33,fontSize: 13, paddingVertical:2,paddingHorizontal:10, fontWeight:"bold",textAlign:"center",height:"100%"}}>
              <Text style={{fontSize: 13, color: "grey", fontWeight:"bold",textAlign:"left"}}>
                    {data.quoteAgreed}
              </Text>
              </View>   
            </View> */}
//       )
//     };


export const TableRowTaskProfile =({data,navigation})=>{
      return (
            <View style={{flexDirection:"row", alignItems:"center", height:30, backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:10, marginTop:10,elevation:2}}>
              <View style={{flex:0.7,fontSize: 13, padding:5, fontWeight:"bold",textAlign:"center",borderRadius:10,backgroundColor:"lightgreen", height:"100%"}}>
          <TouchableOpacity  onPress={()=>{
          alert("nav EditTask .js")
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
    

// export const Todotask1=({data,navigation})=>{

//       const [tasklist,settasklist]=useState([]);

//       useEffect(() => {
//             let arr=[];
//             console.log(data);
//            for(let a=0; a< data.length;a++)
//            {
//             if(a > 0)
//             {
//                  if (data[a].date !== data[a-1].date)
//                  {
//                        let o={};
//                        o.date = data[a].date;
//                        o.data = [];
//                        o.data.push(data[a].id);
//                        arr.push(o);
//                  }
//                  else
//                  {
//                         arr[arr.length-1].data.push(data[a].id);
//                  }
//             }
//             else 
//             {
//                   let o={};
//                   o.date = data[a].date;
//                   o.data = [];
//                   o.data.push(data[a].id);
//                   arr.push(o);   
//             }
//            }
//            settasklist(arr);
//           },[]);
        
//       return (
//             <View>
//             {tasklist.map((task)=>
//             <Todotask2 key={task.date} data={task} navigation={navigation}/>
//             )}
//             </View>
//       )
//     };


// export const Todotask2=({data,navigation})=>{

//       const [day,setday]=useState("");

//       useEffect(() => {
//             console.log(data.data);
//             let d=new Date(data.date);
//             setday(d.getDay());
//           },[]);

//       return (
//             <View>
//             <View style={{paddingTop:10}}>
//             <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:"#FFFFFF", marginHorizontal:15, elevation: 2}}>
//             <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
//                       <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}>
//                           {data.date}
//                       </Text>
//                       <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:orange,textAlign:"right"}}>
//                          {days[day]}
//                       </Text>
//                   </View>
//             </View>
//             </View>
//             {data.data.map((task)=>
//             <Todotask3 key={task} data={task} navigation={navigation}/>
//             )}
//             <View style={{borderBottomRightRadius:10,borderBottomLeftRadius:10, backgroundColor:"#ffffff",height:10,marginHorizontal:15}}>

//             </View>
//             </View>
//       )
//     };

    
// export const Todotask3=({data,navigation})=>{

//       const [tasksData, settasksData]= useState({});
      
//       useEffect(() => {
//             console.log(data)
//             db.collection("tasks").doc(data).get().then((doc) => {
//                   if (doc.exists) {
//                       let O = doc.data();
//                       console.log("Document data:", doc.data());
//                       O.time = formatAMPM(O.date.toDate());
//                       O.date = O.date.toDate();
//                       settasksData(O);
//                   } else {
//                       // doc.data() will be undefined in this case
//                       console.log("No such document!");
//                   }
//               }).catch((error) => {
//                   console.log("Error getting document:", error);
//               });
              
//           },[]);

//       const handleSpecificTask=()=>{
//             navigation.navigate("Task Detail",tasksData);
//       }

//       // pressSpecifictTask
//       return (
//             <TouchableOpacity  onPress={handleSpecificTask}>
//             <View style={{backgroundColor:"#FFFFFF", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
//             <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
//                       <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
//                           {tasksData.time}   <Text style={{color:orange}}> {tasksData.title}</Text>
//                       </Text>
//                       {/* <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
//                           {tasksData.name}
//                       </Text> */}
//                   </View>
//             </View>
//             </TouchableOpacity>
      
//       )
//     };



// export const Todotask1=({data,navigation,mytype})=>{

//       const [tasklist,settasklist]=useState([]);

//       useEffect(() => {
//             let arr=[];
//             console.log(data);
//            for(let a=0; a< data.length;a++)
//            {
//             if(a > 0)
//             {
//                  if (data[a].date !== data[a-1].date)
//                  {
//                        let o={};
//                        o.date = data[a].date;
//                        o.data = [];
//                        o.data.push(data[a].id);
//                        arr.push(o);
//                  }
//                  else
//                  {
//                         arr[arr.length-1].data.push(data[a].id);
//                  }
//             }
//             else 
//             {
//                   let o={};
//                   o.date = data[a].date;
//                   o.data = [];
//                   o.data.push(data[a].id);
//                   arr.push(o);   
//             }
//            }
//            settasklist(arr);
//           },[]);
        
//       return (
//             <View>
//             {tasklist.map((task)=>
//             <Todotask2 key={task.date} data={task} navigation={navigation} mytype={mytype}/>
//             )}
//             </View>
//       )
//     };


// export const Todotask2=({data,navigation,mytype})=>{

//       const [day,setday]=useState("");

//       useEffect(() => {
//             console.log(data.data);
//             console.log(mytype);
//             let d=new Date(data.date);
//             setday(d.getDay());
//           },[]);

//       return (
//             <View>
//             <View style={{paddingTop:10}}>
//             <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:"#FFFFFF", marginHorizontal:15, elevation: 2}}>
//             <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
//                       <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}>
//                           {data.date}
//                       </Text>
//                       <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:orange,textAlign:"right"}}>
//                          {days[day]}
//                       </Text>
//                   </View>
//             </View>
//             </View>
//             {data.data.map((task)=>
//             <Todotask3 key={task} data={task} navigation={navigation} mytype={mytype}/>
//             )}
//             <View style={{borderBottomRightRadius:10,borderBottomLeftRadius:10, backgroundColor:"#ffffff",height:10,marginHorizontal:15}}>

//             </View>
//             </View>
//       )
//     };

    
// export const Todotask3=({data,navigation,mytype})=>{

//       const [tasksData, settasksData]= useState({});
      
//       useEffect(() => {
//             console.log(data)
//             db.collection("tasks").doc(data).get().then((doc) => {
//                   if (doc.exists) {
//                       let O = doc.data();
//                       console.log("Document data:", doc.data());
//                       O.time = formatAMPM(O.date.toDate());
//                       O.date = O.date.toDate();
//                       settasksData(O);
//                   } else {
//                       // doc.data() will be undefined in this case
//                       console.log("No such document!");
//                   }
//               }).catch((error) => {
//                   console.log("Error getting document:", error);
//               });
              
//           },[]);

//       const handleSpecificTask=()=>{
//             if (mytype === "Taskindividual" )
//             {
//                   navigation.navigate("Task Detail",tasksData);
//             }
           
//       }

      //////// pressSpecifictTask
//       return (
//             <TouchableOpacity  onPress={handleSpecificTask}>
//             <View style={{backgroundColor:"#FFFFFF", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
//             <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                     
//                       {
//                       mytype ==="Taskindividual" && 
//                       <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
//                       {tasksData.time}   <Text style={{color:orange}}> {tasksData.title}</Text>
//                       </Text>
//                       }

//                       {
//                       mytype === "Overdue" && 
//                       <Text style={{flex:1,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
//                       {tasksData.time}   <Text style={{color:"red"}}> {tasksData.name} - {tasksData.title}</Text>
//                       </Text>
//                       }

//                       {
//                       mytype === "Call" && 
//                       <Text style={{flex:1,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
//                       {tasksData.time}   <Text style={{color:"green"}}> {tasksData.name}</Text>
//                       </Text>
//                       }

//                       {
//                       mytype === "Appointment" && 
//                       <Text style={{flex:1,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
//                       {tasksData.time}   <Text style={{color:blueDClr}}>  {tasksData.name}</Text>
//                       </Text>
//                       }

// {
//                       mytype === "Others" && 
//                       <Text style={{flex:1,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
//                       {tasksData.time}   <Text style={{color:"black"}}>  {tasksData.name}</Text>
//                       </Text>
//                       }


                      

//                       {/* <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
//                           {tasksData.name}
//                       </Text> */}
//                   </View>
//             </View>
//             </TouchableOpacity>
      
//       )
//     };
