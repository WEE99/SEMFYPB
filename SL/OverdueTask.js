import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView} from 'react-native';
// import {CallTaskRow,OtherTaskRow,OverdueTaskRow,AppointmentTaskRow} from "./TaskandHIstoryTable";
import {orange, Todotask1,Todotask2} from "./TablesandTimeFormat"
import {auth, db, storage} from "./firebase";


const arryOverdueTask =[
  {id:1, Lname: "MAX",company: "Google. Co", Status:"Others", Time:"Feb 27, 2021"},
  {id:2, Lname: "MINIS",company: "Nuclear", Status:"Appoinment", Time:"Feb 26, 2021"},
  {id:3, Lname: "Willui ",company: "X", Status:"Call", Time:"Feb 27, 2021"},
  {id:4, Lname: "May",company: "Karuna", Status:"Call", Time:"Feb 28, 2021"},
];

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


//export default function App() {
export default ({navigation, route}) => {

  const [Tasks,setTasks]=useState([]);

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


//   useEffect(() => {

//   var user=auth.currentUser
//   console.log(user.uid)
//   if(user){
//     db.collection("users").where("UID", "==",user.uid)
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             var today=new Date();
//             db.collection("tasks").where("userId", "==", doc.id).where("date","<",today)
//             .get()
//             .then((querySnapshot) => {
//               let TasksArr= [];
//                 querySnapshot.forEach((docTasks) => {
//                     let tasks = docTasks.data();
//                     tasks.id = docTasks.id;
//                     TasksArr.push(tasks);
//                     // doc.data() is never undefined for query doc snapshots
//                     console.log(docTasks.id, " => ", docTasks.data());
//                 });
//                 SetTasks(TasksArr);
//                 console.log(TasksArr);
//             })
//             .catch((error) => {
//                 console.log("Error getting documents: ", error);
//             });
            
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });
// }

    
  
//   },[]);

useEffect(() => {
  db.collection("tasks").where("status", "==", "Not completed").where("date", "<", new Date())
  .get()
  .then((querySnapshot) => {
    let TaskArr= [];
      querySnapshot.forEach((docTasks) => {
          let tasks = docTasks.data();
          tasks.id = docTasks.id;
          tasks.mytype="Overdue";
          tasks.time = formatAMPM(tasks.date.toDate());

          var m = tasks.date.toDate().getMonth()
          tasks.date = monthArr[m] + " "+ tasks.date.toDate().getDate() + ", " + tasks.date.toDate().getFullYear();

          TaskArr.push(tasks);
          // doc.data() is never undefined for query doc snapshots
          console.log(docTasks.id, " => ", docTasks.data());
      });
      setTasks(TaskArr);
      console.log(TaskArr);
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
},[]);


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>

    
  {/* <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius:10, margin:"5%"}}>
      <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={{borderRadius:10, backgroundColor:"#fff", paddingVertical:10, marginHorizontal:15, borderWidth:1, borderColor:"lightgrey", elevation: 2}}> */}

            {/* {Tasks.map((info) =>
                <OverdueTaskRow key={info.id} data={info} />
            )} */}


      <View style={{marginTop:10,backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, paddingTop:"5%", paddingBottom:"10%",padding:"1%",alignSelf:"center",marginLeft:"5%",marginRight:"5%", height:"85%",width:"90%"}}>
      <ScrollView>
    
        {Tasks.length !== 0 && <Todotask1 data={Tasks} mytype="Overdue" />}
          

      </ScrollView>
      </View>


            {/* </View>
      <StatusBar style="auto" />
    </View>
  </ScrollView> */}
   <StatusBar style="auto" />
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
  
  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },

});
