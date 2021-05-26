import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView, Platform, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {auth, db, storage} from "../components/firebase";
import firebase from 'firebase/app'
//import DatePicker from "react-datepicker";
// import {MaterialCommunityIcons} from 'react-native-vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatAMPM, orange} from './TablesandTimeFormat';
import {Picker} from '@react-native-picker/picker';


export default ({navigation, route}) => {

  const {name,userId,leadId} = route.params;

  console.log("createOther: "+leadId +" "+userId+" "+name )

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [mydate, setMyDate] = useState("");
    const [mytime, setMyTime] = useState("");
    const [editnotes,seteditnote]=useState("");
    const [isWeb,setIsWeb]=useState(false);
    const [TaskType,setTaskType]=useState("")
    const [time, setTime] = useState(new Date());


  
    const onChange = (event, selectedDate) => {
      const cd = selectedDate;
      setShow(Platform.IOS === 'ios');
      setDate(cd);
      if(mode == "date"){
        setDate(cd)
        console.log("Date :"+ date)
        console.log("mydate :"+ mydate)
      }
      else{
        setTime(cd)
        console.log("Time :"+ time)
        console.log("mytime :"+ mytime)
      }

      setMyDate(cd.getDate() + "/" + (cd.getMonth() +1 ) + "/" + cd.getFullYear());
      // setMyDate(cd.getFullYear() + "-" + (cd.getMonth() +1 ) + "-" + cd.getDate());
      setMyTime(formatAMPM(cd));
      console.log("cd :"+ cd)
     
      
     
      


      };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
  
    const pressCreate =()=>{
      {

      if (mydate!=""){
        var timestamp = firebase.firestore.Timestamp.fromDate(date);

        db.collection("tasks").add({
          leadId: leadId,
          name:name,
          userId:userId,
          date:timestamp,
          address:"",
          notes:editnotes,
          outcome:"",
          status:"Not completed",
          title:"Others",
          type:"Others"
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          alert("Created Other Task successfully")
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
      
      navigation.goBack()
      }
      else{
        alert("Pick a date")
      }
    }
    
  
    };
  
    const pressCancel =()=>{
       navigation.goBack()
    };

 


    return (
      <View style={styles.container}>
      {/* <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}> */}
  
  
        <View>
          <ScrollView style={styles.ScrollView}>
        

          
          <TouchableOpacity
          style={styles.presspicker}
          onPress = {()=> showMode('date')}> 
            <View>
            <Text style={{fontSize:16}}>Date:</Text>
          </View>
          <View style={styles.Flexpicker}>
         
            
    
            <View style={styles.ContentView}>
            <View >
            <MaterialCommunityIcons name='calendar' size={40} style={styles.icon} /> 
            </View>

              <TextInput
              style={styles.TextInputDateTime}
              value={mydate}
              //value={newDateStr}
              editable={false}
              />
            </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.presspicker}
          onPress = {()=> showMode('time')}> 
            <View>
            <Text style={{fontSize:16}}>Time:</Text>
          </View>
          <View style={styles.Flexpicker}>
         
            
    
            <View style={styles.ContentView}>
            <View >
            <MaterialCommunityIcons name='clock' size={40} style={styles.icon} /> 
            </View>

              <TextInput
              style={styles.TextInputDateTime}
              value={mytime}
              //value={newDateStr}
              editable={false}
              />
            </View>
          </View>
          </TouchableOpacity>

        <View style={{paddingBottom:10}}>
        <View style={{marginTop:10}}>
            <Text style={{fontSize:16}}>Notes:</Text>
          </View>
          <View style={{height:150}}>
            <TextInput
            style={styles.TextInputNotes}
            placeholder="Write down notes here"
            placeholderTextColor={"black"}
            multiline={true}
            onChangeText={(val) => seteditnote(val)}
            />
        </View>
        </View>
        

        
         {/* <Text>{editnotes}</Text> */}
        </ScrollView>

        

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={pressCancel} >
              <Text style={{borderWidth: 1,
                            padding: 15,
                            margin: 10,
                            borderRadius: 5,
                            borderColor: 'black',
                            backgroundColor: 'black',
                            color: 'white',
                            textAlign: 'center',
                            width: 100}}>
                Cancel
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressCreate} >
            <Text style={{borderWidth: 1,
                            padding: 15,
                            margin: 10,
                            borderRadius: 5,
                            borderColor: 'black',
                            backgroundColor: 'black',
                            color: 'white',
                            textAlign: 'center',
                            width: 100}}>
                Done
            </Text>
            </TouchableOpacity>
          </View>




        {/* <TouchableOpacity  style={{backgroundColor:"green"}}onPress = {pressCreate}>
            <View>
            <Text>heio</Text>
            </View>
          </TouchableOpacity> */}
  
      </View>
      
      
       {(show && !isWeb)&&
          <DateTimePicker
          style={styles.datetimepickerweb}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            //is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
            // maximumDate={new Date(2300, 10, 20)}
          />}

      
  
     
  
  
  
       
          
        
        <StatusBar style="auto" />
        {/* </ImageBackground> */}
        </View>
        
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems:"center",
      // justifyContent: 'flex-start',
      // paddingTop:"20%",
    },
  
    // title:{
    //   fontWeight:"bold",
    //   fontSize:20,
    //   color:"black",
    //   alignItems:"flex-start",
    // },
  
    ScrollView:{
      alignContent:"center",
      paddingLeft:30,
      paddingTop:20,
      marginBottom:"10%"
    },
  
    presspicker:{
      marginTop:10,
      width:"100%",
      // alignItems:"center",
      //padding:"20%",
      // borderWidth:2,
      borderColor:"green",
    },
  
    Flexpicker:{
      // marginTop:100,
      width:"100%",
      flexDirection:"row",
      // borderWidth:2,
      borderColor:"lightgrey",
      // padding:5,
      borderRadius:10,
      alignItems:"flex-start",
      //justifyContent:"center"
    },
  
    icon:{
      // marginTop:5,
      // marginLeft:5,
      color:"black"
    },
  
    ContentView:{
      //position:"absolute",
      //right:50,
      // marginLeft:"5%",
      flexDirection:"row",
      borderColor:"lightgrey",
      backgroundColor:"lightgrey",
      borderWidth:2.

    },
  
    // ContentView2:{
    //   //position:"absolute",
    //   //right:50,
    //   marginLeft:"10%",
    //   height: 50,
    //   width: 130, 
    //   //paddingLeft:"20%",
    //   borderWidth:2,
    //   borderRadius:10,
    //   borderColor:orange,
    //   color:"white",fontWeight:"bold"
    // },
  
  
    // datetimepickerweb:{
    //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //   color:"red",
    // },
  
    TextDateTime:{
      color:"black",
      fontWeight:'bold',
    },
  
    TextInputDateTime:{
      // borderWidth:2,
      borderColor:"lightgrey",
      color:"black",
      // borderRadius:10,
      width:130,
      padding:5,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      textAlign:"center",
    },
  
    TextInputNotes:{
      marginTop:5,
      borderWidth:2,
      color:"black",
      fontWeight:"bold",
      backgroundColor: 'lightgrey',
      borderColor:"lightgrey",
      borderRadius:10,
      marginRight:20,
      width:"90%",
      height:"100%",
      padding:5,
      textAlign:"center",
    },
  
    // notesouterview:{
    //   width:"100%",
    //   alignItems:"center",
    //   //padding:"20%",
    //   //borderWidth:2,
    //   borderColor:"green",
    // },
  
    ButtonView: {
      width: '100%',
      backgroundColor:orange,
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignItems:"stretch",
      borderWidth:2,
      borderColor:orange,
      //justifyContent: 'space-around',
      //backgroundColor:"black",
      },
    
      Button1:{
        borderRightWidth:1,
        //borderColor:"lightgrey",
        backgroundColor:orange,
        padding: 10,
        // borderTopColor: "white",
        borderRightColor: 'white',
        // borderBottomColor: 'white',
        // borderRightColor: 'white',
        width:"50%",
        // borderRadius:5,
        },
    
      Button2:{
        borderLeftWidth:1,
        //borderColor:"lightgrey",
        backgroundColor:orange,
        padding: 10,
        // borderTopColor: "white",
        // borderLeftColor: 'white',
        // borderBottomColor: 'white',
        borderLeftColor: 'white',
        width:"50%",
        // borderRadius:5,
        },
    
    ButtonContent:{
      textAlign:'center',
      color:"black",
      fontWeight:'bold',
      },
    
    bgimage: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: "cover",
      justifyContent: "flex-start"
    },
  
    // dropdown:{
    //   textAlign:"center",
    //   // zIndex:200
    // },
  
    // dropdownvalue:{
    //   height: 48,
    //   width: 128, 
    //   paddingLeft:"20%",
    //   borderWidth:2,
    //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //   borderRadius:10,
    //   borderColor:orange,
    //   color:"white",fontWeight:"bold"
    //   },
  
  });

