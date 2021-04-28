import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView, SafeAreaView,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
import {Entypo} from 'react-native-vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 
import ModalSelector from 'react-native-modal-selector';
import {auth, db, storage} from "../components/firebase";
import { orange, TableRowTask } from './TablesandTimeFormat';
//LeadsDetails

// export default function App() {
export default ({navigation, route}) => {

  const {comment,company,contactNumber,contacted,date,email,interest,name,quote,quoteSent,quoteAgreed,result,userId,id} = route.params;

 

  const [tasks,setTasks]=useState([]);
  const [modal,setModal]=useState(false);


  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  

  useEffect(() => {
    console.log("id: " +id +", "+name+" ,"+quoteAgreed)
    // db.collection("tasks").where("status", "==", "Not completed").where("leadId", "==", id).orderBy("date", "desc")
    db.collection("tasks").where("leadId", "==", id).orderBy("date", "desc")
    .onSnapshot((querySnapshot) => {
      let TaskArr= [];
        querySnapshot.forEach((docTasks) => {
            let task = docTasks.data();
            task.id = docTasks.id;
            task.time = formatAMPM(task.date.toDate());
            console.log("Tname: "+task.title)
  
            var m = task.date.toDate().getMonth()
            task.date = monthArr[m] + " "+ task.date.toDate().getDate() + ", " + task.date.toDate().getFullYear();
  
            TaskArr.push(task);
            // doc.data() is never undefined for query doc snapshots
            console.log(docTasks.id, " => ", docTasks.data());
        });
        setTasks(TaskArr);
        console.log("TaskArr: "+JSON.stringify(TaskArr));
    })
   
  },[]);
  
  const pressWon= ()=>{

                  var today = new Date();
                  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                  var time = today.getHours() + ":" + today.getMinutes();
                  var dateTime = date+' '+time;

                  // alert (dateTime)
                 
                  var wonstatus = db.collection("leads").doc(id);

                  // Set the "capital" field of the city 'DC'
                  return wonstatus.update({
                  result: "Won"
                  })
                  .then(() => {
                  console.log("Document successfully updated!");
                  alert("Won status updated")

                        db.collection("Tracking").add({
                            Status: "Won",
                            leadsid: id,
                            leadsname: name,
                            date: dateTime,
                            edited:firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                  })
                  .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                  });

               
                  

            }


  const pressLose= ()=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;

    var losestatus = db.collection("leads").doc(id);

    // Set the "capital" field of the city 'DC'
    return losestatus.update({
    result: "Lose"
    })
    .then(() => {
    console.log("Document successfully updated!");
    alert("Lose status updated")

    db.collection("Tracking").add({
      Status: "Lose",
      leadsid: id,
      leadsname: name,
      date:dateTime,
      edited:firebase.firestore.FieldValue.serverTimestamp()

  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

    })
    .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  };

  const pressOpen= ()=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;

    var openstatus = db.collection("leads").doc(id);

    // Set the "capital" field of the city 'DC'
    return openstatus.update({
    result: "Open"
    })
    .then(() => {
    console.log("Document successfully updated!");
    alert("Reset status updated")

    db.collection("Tracking").add({
      Status: "Open",
      leadsid: id,
      leadsname: name,
      date:dateTime,
      edited:firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
    })
    .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  };

  
  return (
    <View style={styles.container}>
      
      
      <Text style={styles.title}>LEAD'S DETAIL</Text>
      
      <ScrollView>
      <View  style={styles.LeadsContainer}>
      <View style={styles.row}>
         <TouchableOpacity style={{backgroundColor:"green",borderRadius:5, width:"15%",height:"150%", alignItems:"center",justifyContent:"center", marginRight:10}} onPress={pressWon}>
           <View >
           <Text style={{color:"white", fontWeight:"bold",alignSelf:"center"}}>WON</Text>
           </View>
        </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"red",borderRadius:5, width:"15%",height:"150%", alignItems:"center",justifyContent:"center", marginRight:"30%"}} onPress={pressLose}>
            <View>
            <Text style={{color:"white", fontWeight:"bold"}}>LOSE</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"lightgrey",borderRadius:5, width:"30%", height:"150%",alignItems:"center",justifyContent:"center",alignContent:"flex-end"}} onPress={pressOpen}>
            <View>
            <Text style={{color:"black", fontWeight:"bold"}}>RESET STATUS</Text>
            </View>
          </TouchableOpacity>
        
      </View>

      
      <View style={styles.row}>
          <Text style={styles.details}>Name</Text>
          <Text style={styles.info} >{name}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Email</Text>
          <Text style={styles.info} >{email}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Contact</Text>
          <Text style={styles.info} >{contactNumber}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Company</Text>
          <Text style={styles.info} >{company}</Text>
      </View>
      
      <View style={styles.row}>
          <Text style={styles.details}>Interest</Text>
          <Text style={styles.info} >{interest}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Comment</Text>
          <Text style={styles.info} >{comment}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Contacted</Text>
          {contacted? 
          <Text style={styles.info} >Contacted</Text>
           : 
          <Text style={styles.info} >-</Text>}  
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Quote Sent</Text>
          <Text style={styles.info} >RM {quote}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Quote Agreed</Text>
          {quoteAgreed? 
          <Text style={styles.info} >RM {quoteAgreed}</Text>
           : 
          <Text style={styles.info} >-</Text>}  
      </View>
      </View>

     {result=="Open"&&
            <View>
            {/* <Text style={{color:'rgba(192,192,192,0.9)', fontWeight:"bold"}}>CREATE NEW TASK</Text> */}
            <ModalSelector
            data={[
              {key:1,label:"Call"},
              {key:2,label:"Appointment"},
              {key:3,label:"Others"},
            ]

            }
            initValue="CREATE NEW TASK"
            onChange={(option) => {
                                  if (option.label == "Call") {
                                    navigation.navigate('Create Call Task',
                                      {
                                        userId:userId,
                                        name:name,
                                        leadId:id
                                      })
                                  } else if (option.label == "Appointment") {
                                    navigation.navigate('Create Appointment Task',
                                      {
                                        userId:userId,
                                        name:name,
                                        leadId:id
                                      })
                                  }
                                  else {
                                    navigation.navigate('Create Other Task',
                                      {
                                        userId:userId,
                                        name:name,
                                        leadId:id
                                      })
                                  }}}
            />
            </View>
}
        

      <Text style={styles.title}>TASKS</Text>

      <View>

      {tasks.map((info) =>
                <TableRowTask key={info.id} data={info} navigation={navigation} />
            )}


      </View>
      </ScrollView>
      


      
      

      
      
 
      <StatusBar style="auto" />
     
    </View>
  );
}

const styles = StyleSheet.create({
 

  container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '5%',
      },

  title: {
        fontWeight: "bold",
        fontSize: 20,
      },

  row: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    flex: 1
  },


  details: {
        width: "30%",
        color: "grey"
    },
        
  info: {
        fontWeight: "bold",
        width: '50%',
  },
        

  flexrowNAV:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
  },

  flexrow:{
    marginTop:10,
    alignSelf:"flex-start",
    flexDirection:"row",
    // marginTop:10,
    // flexDirection:"row",
    // justifyContent:"space-around"
  },

  
  flexrow2:{
    // marginBottom:100,
    flexDirection:"row",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:0,
    // justifyContent:"flex-end"
  },

  LeadsDetailsbutton:{
    marginRight:25,
    backgroundColor:orange,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  LeadsTasksbutton:{
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

LeadsContainer:{
  flex:1,
  marginTop:10,
  alignSelf:"center",
  //borderWidth:2,
  padding:5,
  // paddingLeft:"20%",
  // paddingRight:"20%",
  paddingTop:0,
  borderColor:"green",
  // backgroundColor:"red",
  height:"85%",
  width:'100%',
},

LeadsNameContainer:{
  marginTop:10,
  marginLeft:60,
  alignSelf:"flex-start",
  borderWidth:2,
  padding:5,
  //borderColor:"red",
  borderColor:orange,
  borderRadius:10,
  backgroundColor:orange,
  zIndex:2,
},

iconcontainer:{alignContent:"center"},


LeadsInfo:{
  //alignSelf:"flex-start",
  alignSelf:"center",
  borderWidth:2,
  marginTop:30,
  marginLeft:5,
  paddingTop:15,
  padding:5,
  borderColor:"lightgrey",
  backgroundColor:"white",
  borderRadius:10,
  position:"absolute",
  width:296,
  // width:"95%",
  zIndex:1
},

LeadsDetailIcon:{marginRight:10, color:orange},
// LeadsDetailIcon2:{marginRight:10},

LeadsInterest:{
  alignSelf:"center",
  marginTop:10,
  marginLeft:5,
  borderWidth:2,
  padding:5,
  borderColor:"lightgrey",
  backgroundColor:"white",
  borderRadius:10,
  //backgroundColor:"red",
  // width:"98%",
  width:296,
  //position:"absolute"
},

textcontainer:{justifyContent:"center", width:"80%", paddingRight:5},

textintrustion:{fontWeight:'bold', color:"#B56118"},

BottomButton:
{
  // alignSelf:"flex-end",
  backgroundColor:orange,
  //borderRightWidth:1,
  borderRadius:100,
  marginRight:5,
  width:45,
  height:45,
  alignItems:"center",
  justifyContent:"center"
  // paddingTop:5,
  // paddingLeft:5
},


bgimage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: "cover",
  // padding:"5%",
  // paddingRight:0,
  // paddingTop:0,
  justifyContent: "flex-start"

},

// bgimage: {
//   flex: 1,
//   width: '100%',
//   height: '100%',
//   resizeMode: "cover",
//   justifyContent: "flex-start"
// },


});


