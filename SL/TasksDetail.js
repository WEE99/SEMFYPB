import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground, Image, ScrollView, Keyboard} from 'react-native';
import { orange } from './TablesandTimeFormat';

//export default function App() {
export default ({navigation, route}) => {

  const [Notes, setNotes]=useState("");
  const [EditNotes, setEditNotes]=useState("");
  const [Outcome, setOutcome]=useState("");
  const [EditOutcome, setEditOutcome]=useState("");
  const [TimeAMPM, setTimeAMPM]=useState("");
  const [Time, setTime]=useState("");

  const {id,address,date,time,leadId,name,status,title,type,userId,notes,outcome} = route.params;
  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? '.P.M.' : '.A.M.';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes;
  setTime(strTime);
  setTimeAMPM(ampm);
};

  const pressEdit= ()=>
  {alert("nav to NewCallTaskEdit .js")
  navigation.navigate("Edit Task")};

  const pressDone= ()=>
  {alert("Task Done")
  navigation.goBack()};

  ////button disapear method////
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {

    if(notes!==undefined && notes!==""){
      setNotes(notes)
    }
    else{setNotes("No notes available for this task")}


    if(outcome!==undefined && outcome!==""){
      setOutcome(outcome)
    }
    else{setOutcome("No outcomes available for this task")}


    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    console.log(route.params);

    formatAMPM(date);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };

    
     
  },[]);

  
  return (
    <View style={styles.container}>
    <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      
      {/* <View>
      <Text style={styles.title}>Tasks Detail</Text>
      </View> */}

<ScrollView style={{alignSelf:"center",width:"60%"}}>
      <View style={styles.borderContainer}>
      <View style={styles.flexrow}>
      <View style={styles.leadsnameContainer}>
      <Text style={styles.leadsname}>Lead's Name</Text>
      </View>
      <View style={styles.nameContainer}>
      <Text style={styles.nametext}  numberOfLines={1}>{name}</Text>
      </View>
      </View>
      </View>
      
      <View style={styles.flexrow}>
      <View style={styles.borderContainerDateTime}>
      <Text style={styles.leadDate}>Date</Text>
      <Text style={styles.DateTimeText}>{date.getDate() + " " +mS[date.getMonth()]}</Text>
      <Text style={styles.nametext}>{date.getFullYear()}</Text>
      </View>

      <View style={styles.borderContainerDateTime}>
      <Text style={styles.leadTime}>Time</Text>
      <Text style={styles.DateTimeText}>{Time}</Text>
      <Text style={styles.nametext}>{TimeAMPM}</Text>
      </View>
      </View>

      <View style={styles.borderContainer}>
      <View>
      <Text style={styles.leadsindtruction}>Notes</Text>
      </View>
      <TextInput 
      style={styles.inputNotes}
      placeholder= {Notes}
      placeholderTextColor="white"
      multiline={true}
      onChangeText={(val) => setEditNotes(val)}
      />
      </View>

      <View style={styles.borderContainer}>
      <View>
      <Text style={styles.leadsindtruction}>Outcome</Text>
      </View>
      <TextInput 
      style={styles.inputNotes}
      placeholder={Outcome} 
      placeholderTextColor="white"
      multiline={true}
      onChangeText={(val) => setEditOutcome(val)}
      />
      </View>
      </ScrollView>

      {/* <Text>{EditNotes}</Text>
      <Text>{EditOutcome}</Text> */}

      {!isKeyboardVisible &&  <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button1}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressEdit}
            >
            <Text style={styles.ButtonContent}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.Button2}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
           // onPress={this._onPressChangePswButton}
           onPress= {pressDone}
           >
         <Text style={styles.ButtonContent}>Mark As "DONE"</Text>
        </TouchableOpacity>
      </View>
      }
     



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

  borderContainer:{
    marginTop:10,
    borderWidth:1,
    borderColor:orange,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius:10,
    padding:5,
    width:"100%",
  },

  flexrow:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  
leadsnameContainer:{
  justifyContent:"center",
},

leadsname:{
    width:50,
    color:orange,
    //marginRight:10
},

nameContainer:{
    justifyContent:"center",
    width:"50%" 
},

nametext:{
    alignSelf:"center",
    color:"white"
},

borderContainerDateTime:{
  marginTop:10,
  borderWidth:1,
  borderColor:orange,
  marginHorizontal:2,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius:10,
  padding:5,
  //alignItems:"center",
  width:"45%"
},

leadDate:{
  color:orange,
  textAlign:"center"
},

leadTime:{
  color:orange,
  textAlign:"center"
},

DateTimeText:{
  color:"white",
  alignSelf:"center",
  fontSize:20,
},

inputNotes:{
  // borderWidth:2,
  // borderColor:"lightgrey",
 // backgroundColor:"lightgrey",
  marginTop:10,
  color:'white',
  // fontWeight:"bold",
  padding:5,
  //fontWeight:"bold",
  height:50,
  width:"100%",
  borderRadius:5,
},

leadsindtruction:{
  color:orange,
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
    


});
