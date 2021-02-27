import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';

export default function App() {
  
  const pressSave =()=>{
    if(EditRemarks!="")
    {
    alert("Resset Remarks Succesful nav to Dashboard .js")
    }
    else
    {alert('Remarks nothing to Update')}
  };

  const pressCancel =()=>{
    alert("nav to Dashboard .js")
  };


  const [Remarks, setRemarks]=useState("");
  const [EditRemarks, setEditRemarks]=useState("");


  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Remarks</Text>
      </View>

      <TextInput 
      style={styles.inputRemarks}
      placeholder='Write the remarks for the leads here.' 
      placeholderTextColor="orange"
      multiline={true}
      autoFocus={true}
      onChangeText={(val) => setEditRemarks(val)}
      />

      {/* <Text>{EditRemarks}</Text> */}



      <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressSave}
            >
            <Text style={styles.ButtonContent}>Save</Text>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:'20%',
  },
  
  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  inputRemarks:{
    borderWidth:2,
    borderColor:"lightgrey",
    marginTop:10,
    padding:10,
    //fontWeight:"bold",
    height:150,
    width:"70%",
    borderRadius:5,
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
