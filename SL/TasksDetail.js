import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground, Image, ScrollView, Keyboard} from 'react-native';

export default function App() {

  const [EditNotes, setEditNotes]=useState("");
  const [EditOutcome, setEditOutcome]=useState("");

  const pressEdit= ()=>
  {alert("Edit Complete")};

  const pressDone= ()=>
  {alert("Task Done")};

  ////button disapear method////
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
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

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
     
  },[]);

  
  return (
    <View style={styles.container}>
      
      <View>
      <Text style={styles.title}>Tasks Detail</Text>
      </View>

<ScrollView>
      <View style={styles.borderContainer}>
      <View style={styles.flexrow}>
      <View style={styles.leadsnameContainer}>
      <Text style={styles.leadsname}>Lead's Name</Text>
      </View>
      <View style={styles.nameContainer}>
      <Text style={styles.nametext}  numberOfLines={1}>John Doe swefdfsfsfsdfsf sdfsdfs sda ad ad ad asdas das fs dfs fsdf sd</Text>
      </View>
      </View>
      </View>
      
      <View style={styles.flexrow}>
      <View style={styles.borderContainerDateTime}>
      <Text style={styles.leadDate}>Date</Text>
      <Text style={styles.DateTimeText}>2 Feb</Text>
      <Text style={styles.nametext}>2021</Text>
      </View>

      <View style={styles.borderContainerDateTime}>
      <Text style={styles.leadTime}>Time</Text>
      <Text style={styles.DateTimeText}>8 : 30</Text>
      <Text style={styles.nametext}>.P.M.</Text>
      </View>
      </View>

      <View style={styles.borderContainer}>
      <View>
      <Text style={styles.leadsindtruction}>Notes</Text>
      </View>
      <TextInput 
      style={styles.inputNotes}
      placeholder='No notes available for this task' 
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
      placeholder='No outcomes available for this task' 
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
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressEdit}
            >
            <Text style={styles.ButtonContent}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.Button}
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

  borderContainer:{
    marginTop:10,
    borderWidth:1,
    borderColor:"orange",
    borderRadius:10,
    padding:5,
    width:200,
  },

  flexrow:{
    flexDirection:"row",
    justifyContent:"space-around",
  },
  
leadsnameContainer:{
  justifyContent:"center",
},

leadsname:{
    width:50,
    color:"orange",
    fontWeight:"bold",
    //marginRight:10
},

nameContainer:{
    justifyContent:"center",
    width:"50%" 
},

nametext:{
    alignSelf:"center",
    fontWeight:"bold",
},

borderContainerDateTime:{
  marginTop:10,
  borderWidth:1,
  borderColor:"orange",
  borderRadius:10,
  padding:5,
  //alignItems:"center",
  width:100
},

leadDate:{
  color:"orange",
  fontWeight:"bold",
  textAlign:"center"
},

leadTime:{
  color:"orange",
  fontWeight:"bold",
  textAlign:"center"
},

DateTimeText:{
  fontWeight:"bold",
  alignSelf:"center",
  fontSize:20,
},

inputNotes:{
  borderWidth:2,
  borderColor:"lightgrey",
  backgroundColor:"lightgrey",
  marginTop:10,
  padding:5,
  //fontWeight:"bold",
  height:50,
  width:"100%",
  borderRadius:5,
},

leadsindtruction:{
  color:"orange",
  fontWeight:"bold",
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
