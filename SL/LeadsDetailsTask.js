import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons'; 
import {auth, db, storage} from "./firebase";
import { NavigationEvents } from 'react-navigation';
import {orange, Todotask1,Todotask2} from "./TablesandTimeFormat"
// LeadsDetailsTask

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

// export default function App() {
export default ({navigation, route}) => {

  const [todaysDate,setTodaysDate]=useState(new Date());
  const [todaysDateString,setTodaysDateString]=useState(todaysDate.toLocaleDateString("en-GB"));
  const [Tasks,setTasks]=useState([]);

  const {id} = route.params;

  useEffect(() => {
    db.collection("tasks").where("leadId", "==", id)
    .get()
    .then((querySnapshot) => {
      let TaskArr= [];
        querySnapshot.forEach((docTasks) => {
            let tasks = docTasks.data();
            tasks.id = docTasks.id;

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


  const pressLeadsDetailsPage= ()=>{
    alert("nav to LeadsDetails .js");
    navigation.navigate("Details");
  };

  const pressLeadsDetailsTasks= ()=>{
    alert("nav to LeadsDetailsTask .js");
    navigation.navigate("Tasks");

  };

  // const pressSpecifictTask= ()=>{
  //   alert("nav to TaskDetail .js");
  //   navigation.navigate("Task Detail");
  // };

  const pressFilter= ()=>{
    alert("press to Filter"); 
  };

  const pressAdd= ()=>{
    alert("nav to NewCallTask .js"); 
    navigation.navigate("New Call Task")
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Tasks</Text>
      </View> */}
      
      <View style={styles.flexrowAlignSelf}>
        <View >
          <TouchableOpacity style={styles.LeadsDetailsbutton} onPress={pressLeadsDetailsPage}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.LeadsTasksbutton} onPress={pressLeadsDetailsTasks}><Text> </Text></TouchableOpacity>
        </View>
      </View>

      
      <View style={{marginTop:10,backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, paddingTop:"5%", paddingBottom:"10%",padding:"1%",alignSelf:"center",marginLeft:"5%",marginRight:"5%", height:"85%",width:"90%"}}>
      <ScrollView>
    
                {Tasks.length !== 0 && <Todotask1 data={Tasks} navigation={navigation} />}
          

      </ScrollView>
      </View>


      <View style={styles.flexrow2}>
        <View>
          <TouchableOpacity style={styles.BottomButton} onPress={pressFilter}>
          {/* <Icon name='height' size={35} />  */}
          <AntDesign name="filter" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.BottomButton} onPress={pressAdd}>
            <Icon name='add' size={35} />
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
    //alignItems:"center",
    //alignContent:"center",
    justifyContent: 'center',
    //padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignSelf:"center",
    alignItems:"flex-start",
  },

  flexrowAlignSelf:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
    // justifyContent:"space-around"
  },


  LeadsDetailsbutton:{
    marginRight:25,
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  LeadsTasksbutton:{
    backgroundColor:orange,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  flexrow2:{
    marginTop:10,
    flexDirection:"row",
    alignSelf:"flex-end"
    // justifyContent:"space-around"
  },

  BottomButton:
{
  // alignSelf:"flex-end",
  backgroundColor:orange,
  //borderRightWidth:1,
  borderRadius:100,
  marginRight:5,
  width:45,
  height:45,
  paddingTop:5,
  paddingLeft:5
},

bgimage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: "cover",
  justifyContent: "flex-start"

},
  
});
