import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import { orange } from './TablesandTimeFormat';

// export default function App() {
export default ({navigation, route}) => {
  
  const pressSave =()=>{
    if(EditRemarks!="")
    {
    alert("Resset Remarks Succesful nav to Dashboard .js")
    navigation.goBack()
    }
    else
    {alert('Remarks nothing to Update')}
  };

  const pressCancel =()=>{
    alert("nav to Dashboard .js")
    navigation.goBack()
  };


  const [Remarks, setRemarks]=useState("");
  const [EditRemarks, setEditRemarks]=useState("");


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Remarks</Text>
      </View> */}

      <TextInput 
      style={styles.inputRemarks}
      placeholder='Write the remarks for the leads here.' 
      placeholderTextColor="white"
      multiline={true}
      autoFocus={true}
      onChangeText={(val) => setEditRemarks(val)}
      />

      {/* <Text>{EditRemarks}</Text> */}



      <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button1}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressSave}
            >
            <Text style={styles.ButtonContent}>Save</Text>
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

  inputRemarks:{
    borderWidth:2,
    borderColor:orange,
    marginTop:10,
    padding:10,
    color:"white",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontWeight:"bold",
    height:150,
    width:"70%",
    alignSelf:"center",
    borderRadius:5,
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
