import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView, Platform, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePicker from "react-datepicker";
// import {MaterialCommunityIcons} from 'react-native-vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatAMPM, orange} from './TablesandTimeFormat';
import {Picker} from '@react-native-picker/picker';

// NewCallTask!


// export default function App() {
export default ({navigation, route}) => {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [mydate, setMyDate] = useState("");
  const [mytime, setMyTime] = useState("");
  const [editnotes,seteditnote]=useState("");
  const [isWeb,setIsWeb]=useState(false);
  const [TaskType,setTaskType]=useState("")

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
    navigation.goBack()
    }

  };

  const pressCancel =()=>{
    alert("nav to Dashboard .js")
    navigation.goBack()
  };

  useEffect(() => {
    setIsWeb(Platform.OS ==='web');
    console.log(Platform.OS);
  },[]);

  return (
    <View style={styles.container}>
    <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>

    
      {/* <View>
      <Text style={styles.title}>New Call Task</Text>
      </View> */}

      {isWeb &&

      <View>
      <ScrollView style={styles.ScrollView}>
      <TouchableOpacity
      style={styles.presspicker}
      onPress = {()=> showMode('date')}> 
      <View style={styles.Flexpicker}>
     
        <View >
        {/* <MaterialCommunityIcons name='calendar' size={40} style={styles.icon} />  */}
        <MaterialCommunityIcons name="calendar-range-outline" size={40} style={styles.icon} />
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
        {/* <MaterialCommunityIcons name="clock" size={40} style={styles.icon}/>  */}
        <MaterialCommunityIcons name="clock-time-four-outline" size={40} style={styles.icon} />
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

    <View style={styles.Flexpicker}>
     <View>
     {/* <MaterialCommunityIcons name="clock" size={40} style={styles.icon}/>  */}
     {/* <MaterialCommunityIcons name="clock-time-four-outline" size={40} style={styles.icon} /> */}
     <MaterialIcons name="add-task" size={40} style={styles.icon} />
     </View>

     <View style={styles.ContentView}>
     <Picker
        style={styles.dropdown}
        itemStyle={{ backgroundColor: "red", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
        selectedValue={TaskType}
        style={{height: 50, width: 130, paddingLeft:"10%", borderWidth:2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, borderColor:orange, color:"white",fontWeight:"bold"}}
        onValueChange={(itemValue, itemIndex) =>
        setTaskType(itemValue)
        }>
    
        <Picker.Item label="Call" value="Call" color="black"/>
        <Picker.Item label="Appointment" value="Appointment" color="black"/>
        <Picker.Item label="Others" value="Others" color="black"/>
        </Picker>
     </View>
   </View>


      <View style={styles.notesouterview}>
      <View style={styles.Flexpicker}>
      <View>
      {/* <MaterialCommunityIcons name="note" size={40} style={styles.icon}/> */}
      <MaterialIcons name="comment" size={40} style={styles.icon} />
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

        <View style={styles.Flexpicker}>
     <View>
     {/* <MaterialCommunityIcons name="clock" size={40} style={styles.icon}/>  */}
     {/* <MaterialCommunityIcons name="clock-time-four-outline" size={40} style={styles.icon} /> */}
     <MaterialIcons name="add-task" size={40} style={styles.icon} />
     </View>

     <View style={styles.ContentView2}>
     <Picker
        style={styles.dropdown}
        itemStyle={{ backgroundColor: "red", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
        selectedValue={TaskType}
        style={styles.dropdownvalue}
        // style={{height: 50, width: 100, paddingLeft:"20%", borderWidth:2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:"", borderColor:orange, color:"white",fontWeight:"bold"}}
        onValueChange={(itemValue, itemIndex) =>
        setTaskType(itemValue)
        }>
    
        <Picker.Item label="Call" value="Call" color="black"/>
        <Picker.Item label="Appointment" value="Appointment" color="black"/>
        <Picker.Item label="Others" value="Others" color="black"/>
        </Picker>
     </View>
   </View>


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
        placeholderTextColor={"white"}
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

   



      <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button1}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressCreate}
            >
            <Text style={styles.ButtonContent}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.Button2}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
           // onPress={this._onPressChangePswButton}
           onPress= {pressCancel}
           >
         <Text style={styles.ButtonContent}>Cancel</Text>
        </TouchableOpacity>
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
    // paddingTop:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  ScrollView:{
    alignContent:"center",
    paddingLeft:10,
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
    // borderWidth:2,
    borderColor:"lightgrey",
    padding:10,
    borderRadius:10,
    alignItems:"flex-start",
    //justifyContent:"center"
  },

  icon:{
    marginTop:5,
    marginLeft:5,
    color:orange
  },

  ContentView:{
    //position:"absolute",
    //right:50,
    marginLeft:"10%"
  },

  ContentView2:{
    //position:"absolute",
    //right:50,
    marginLeft:"10%",
    height: 50,
    width: 130, 
    //paddingLeft:"20%",
    borderWidth:2,
    borderRadius:10,
    borderColor:orange,
    color:"white",fontWeight:"bold"
  },


  // datetimepickerweb:{
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
  //   color:"red",
  // },

  TextDateTime:{
    color:"white",
    fontWeight:'bold',
  },

  TextInputDateTime:{
    borderWidth:2,
    borderColor:orange,
    color:"white",
    borderRadius:10,
    width:130,
    padding:5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    textAlign:"center",
  },

  TextInputNotes:{
    marginTop:5,
    borderWidth:2,
    color:"white",
    fontWeight:"bold",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor:orange,
    borderRadius:10,
    marginRight:20,
    width:200,
    height:160,
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

  dropdown:{
    textAlign:"center",
    // zIndex:200
  },

  dropdownvalue:{
    height: 48,
    width: 128, 
    paddingLeft:"20%",
    borderWidth:2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius:10,
    borderColor:orange,
    color:"white",fontWeight:"bold"
    },

});
