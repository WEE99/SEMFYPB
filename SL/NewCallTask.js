import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePicker from "react-datepicker";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatAMPM} from './TablesandTimeFormat';
// NewCallTask!


export default function App() {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [mydate, setMyDate] = useState("");
  const [mytime, setMyTime] = useState("");
  const [editnotes,seteditnote]=useState("");
  const [isWeb,setIsWeb]=useState(false);

  const onChange = (event, selectedDate) => {
    const cd = selectedDate || date;
    setShow(Platform.IOS === 'ios');
    setDate(cd);
    setMyDate(cd.getDate() + "/" + (cd.getMonth() +1 ) + "/" + cd.getFullYear());
    setMyTime(formatAMPM(cd));
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
    alert("Call Task created  nav to Dashboard .js")
    }

  };

  const pressCancel =()=>{
    alert("nav to Dashboard .js")
  };

  useEffect(() => {
    setIsWeb(Platform.OS ==='web');
    console.log(Platform.OS);
  },[]);

  return (
    <View style={styles.container}>

    
      <View>
      <Text style={styles.title}>New Call Task</Text>
      </View>

      {isWeb &&

      <View>
      <ScrollView style={styles.ScrollView}>
      <TouchableOpacity
      style={styles.presspicker}
      onPress = {()=> showMode('date')}> 
      <View style={styles.Flexpicker}>
     
        <View >
        <MaterialCommunityIcons name='calendar' size={40} style={styles.icon} /> 
        </View>

        <View style={styles.ContentView}>
          <Text style={styles.TextDateTime}>Date :</Text>
          <input
          type="date"
          style={{width:"100%"}}
          value={mydate}
          onChange={event => setMyDate(event.target.value)}/>
        </View>
      </View>
      </TouchableOpacity>


      <TouchableOpacity
      style={styles.presspicker}
      onPress={showTimepicker}> 
      <View style={styles.Flexpicker}>
     
        <View>
        <MaterialCommunityIcons name="clock" size={40} style={styles.icon}/> 
        </View>

        <View style={styles.ContentView}>
          <Text style={styles.TextDateTime}>Time :</Text>
          <input
          type="time"
          style={{width:"100%"}}
          value={mytime}
          onChange={event => setMyTime(event.target.value)}/>
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.notesouterview}>
      <View style={styles.Flexpicker}>
      <View>
      <MaterialCommunityIcons name="note" size={40} style={styles.icon}/> 
      </View>

      <View style={styles.ContentView}>
        <Text style={styles.TextDateTime}>Notes :</Text>
        <TextInput
        style={styles.TextInputNotes}
        placeholder="Write down notes here"
        multiline={true}
        onChangeText={(val) => seteditnote(val)}
        />

      </View>
      </View>
      </View>
       {/* <Text>{editnotes}</Text> */}

      </ScrollView>
       </View>
      }

      {!isWeb &&
      <View>
        <ScrollView style={styles.ScrollView}>
        <TouchableOpacity
        style={styles.presspicker}
        onPress = {()=> showMode('date')}> 
        <View style={styles.Flexpicker}>
       
          <View >
          <MaterialCommunityIcons name='calendar' size={40} style={styles.icon} /> 
          </View>
  
          <View style={styles.ContentView}>
            <Text style={styles.TextDateTime}>Date :</Text>
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
        onPress={showTimepicker}> 
        <View style={styles.Flexpicker}>
       
          <View>
          <MaterialCommunityIcons name="clock" size={40} style={styles.icon}/> 
          </View>
  
          <View style={styles.ContentView}>
            <Text style={styles.TextDateTime}>Time :</Text>
            <TextInput
            style={styles.TextInputDateTime}
            value={mytime}
            editable={false}
            />
          </View>
        </View>
        </TouchableOpacity>

      <View style={styles.notesouterview}>
      <View style={styles.Flexpicker}>
      <View>
      <MaterialCommunityIcons name="note" size={40} style={styles.icon}/> 
      </View>

      <View style={styles.ContentView}>
        <Text style={styles.TextDateTime}>Notes :</Text>
        <TextInput
        style={styles.TextInputNotes}
        placeholder="Write down notes here"
        multiline={true}
        onChangeText={(val) => seteditnote(val)}
        />

      </View>
      </View>
      </View>
       {/* <Text>{editnotes}</Text> */}

      </ScrollView>

        </View>
      }
    
     {(show && !isWeb)&&
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          //is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
          // maximumDate={new Date(2300, 10, 20)}
        />}

   



      <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressCreate}
            >
            <Text style={styles.ButtonContent}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
           // onPress={this._onPressChangePswButton}
           onPress= {pressCancel}
           >
         <Text style={styles.ButtonContent}>Cancel</Text>
        </TouchableOpacity>
        </View>
        
      
      <StatusBar style="auto" />
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'flex-start',
    paddingTop:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  ScrollView:{
    alignContent:"center",
    marginBottom:"20%"
  },

  presspicker:{
    width:"100%",
    alignItems:"center",
    //padding:"20%",
    //borderWidth:2,
    borderColor:"green",
  },

  Flexpicker:{
    marginTop:10,
    width:"100%",
    flexDirection:"row",
    borderWidth:2,
    borderColor:"lightgrey",
    padding:10,
    borderRadius:10,
    alignItems:"center",
    //justifyContent:"center"
  },

  icon:{
    marginTop:5,
    marginLeft:5
  },

  ContentView:{
    //position:"absolute",
    //right:50,
    marginLeft:"10%"
  },

  TextDateTime:{
    color:"orange",
    fontWeight:'bold'
  },

  TextInputDateTime:{
    borderWidth:2,
    borderColor:"lightgrey",
    borderRadius:10,
    width:100,
    padding:5,
    textAlign:"center",
  },

  TextInputNotes:{
    borderWidth:2,
    borderColor:"lightgrey",
    borderRadius:10,
    marginRight:20,
    width:200,
    height:50,
    padding:5,
    textAlign:"center",
  },

  notesouterview:{
    width:"100%",
    alignItems:"center",
    //padding:"20%",
    //borderWidth:2,
    borderColor:"green",
  },

  ButtonView: {
    width: '100%',
    backgroundColor:"white",
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems:"stretch",
    borderWidth:2,
    borderColor:"lightgrey",
    //justifyContent: 'space-around',
    //backgroundColor:"black",
    },
  
  Button:{
    borderWidth:3,
    //borderColor:"lightgrey",
    // backgroundColor:'black',
    padding: 10,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#fff',
    borderRightColor: 'lightgrey',
    width:"50%",
    // borderRadius:5,
    },
  
  ButtonContent:{
    textAlign:'center',
    color:"orange",
    // fontWeight:'bold',
    },

});
