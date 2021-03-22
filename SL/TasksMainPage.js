import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import { orange } from './TablesandTimeFormat';
import {auth, db, storage} from "./firebase";

// export default function App() {
export default ({navigation, route}) => {

  const [overdueTasks,setoverdueTasks]=useState([]);
  const [countoverdueTasks,setcountoverdueTasks]=useState("");

  const [callTasks,setcallTasks]=useState([]);
  const [countcallTasks,setcountcallTasks]=useState("");

  const [appointmentTasks,setappointmentTasks]=useState([]);
  const [countappoinmnetTasks,setcountappointmentTasks]=useState("");

  const [otherTasks,setotherTasks]=useState([]);
  const [countotherTasks,setcountotherTasks]=useState("");



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

  useEffect(() => {
    db.collection("tasks").where("status", "==", "Not completed").where("date", "<", new Date())
    .get()
    .then((querySnapshot) => {
      let overdueTaskArr= [];
        querySnapshot.forEach((docTasks) => {
            let overduetasks = docTasks.data();
            overduetasks.id = docTasks.id;
            overduetasks.mytype="Overdue";
            overdueTaskArr.push(overduetasks);
            // doc.data() is never undefined for query doc snapshots
            console.log(docTasks.id, " => ", docTasks.data());
        });
        setoverdueTasks(overdueTaskArr);
        setcountoverdueTasks(overdueTaskArr.length)
        console.log(overdueTaskArr);
        console.log(overdueTaskArr.length);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    db.collection("tasks").where("status", "==", "Not completed").where("date", ">", new Date()).where("type","==","Call")
    .get()
    .then((querySnapshot) => {
      let callTaskArr= [];
        querySnapshot.forEach((docTasks) => {
            let calltasks = docTasks.data();
            calltasks.id = docTasks.id;
            calltasks.mytype="Call";
            
            callTaskArr.push(calltasks);
            // doc.data() is never undefined for query doc snapshots
            console.log(docTasks.id, " => ", docTasks.data());
        });
        setcallTasks(callTaskArr);
        setcountcallTasks(callTaskArr.length)
        console.log(callTaskArr);
        console.log(callTaskArr.length);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    db.collection("tasks").where("status", "==", "Not completed").where("date", ">", new Date()).where("type","==","Appointment")
    .get()
    .then((querySnapshot) => {
      let appointmentTaskArr= [];
        querySnapshot.forEach((docTasks) => {
            let appointmenttasks = docTasks.data();
            appointmenttasks.id = docTasks.id;
            appointmenttasks.mytype="Appointment";
           
  
            appointmentTaskArr.push(appointmenttasks);
            // doc.data() is never undefined for query doc snapshots
            console.log(docTasks.id, " => ", docTasks.data());
        });
        setappointmentTasks(appointmentTaskArr);
        setcountappointmentTasks(appointmentTaskArr.length)
        console.log(appointmentTaskArr);
        console.log(appointmentTaskArr.length);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    db.collection("tasks").where("status", "==", "Not completed").where("date", ">", new Date()).where("type","==","Others")
    .get()
    .then((querySnapshot) => {
      let otherTaskArr= [];
        querySnapshot.forEach((docTasks) => {
            let othertasks = docTasks.data();
            othertasks.id = docTasks.id;
            othertasks.mytype="Others";
            
            otherTaskArr.push(othertasks);
            // doc.data() is never undefined for query doc snapshots
            console.log(docTasks.id, " => ", docTasks.data());
        });
        setotherTasks(otherTaskArr);
        setcountotherTasks(otherTaskArr.length);
        console.log(otherTaskArr);
        console.log(otherTaskArr.length);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


  },[]);

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
           <Text style={styles.icontext}>{countoverdueTasks}</Text>
           <Text style={styles.icontext}>Overdue</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressCall}>
           <View style={styles.iconButtonBorder}>
           <Icon name='call' size={40} color={orange} /> 
           <Text style={styles.icontext} >{countcallTasks}</Text>
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
           <Text style={styles.icontext} >{countappoinmnetTasks}</Text>
           <Text style={styles.icontext}>Appointment</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.iconButton} onPress={pressOthers}>
           <View style={styles.iconButtonBorder}>
           {/* <Icon name='description' size={40} color={orange}/>  */}
           <MaterialCommunityIcons name="message-bulleted" size={40} color={orange} />
           <Text style={styles.icontext}>{countotherTasks}</Text>
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
