import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image, Keyboard, ScrollView } from 'react-native';
import {firebase} from './firebase';
import { orange } from './TablesandTimeFormat';



export default class App extends Component {

  constructor(){
    super();
    this.state = {
      Name: '',
      password:'',
      designation: '',
      email: '',
      contact: '',
    };
  }

  pressCancel = () => {
    navigation.goBack()
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    var db = firebase.firestore();
    db.collection("users").add({
      name: this.state.Name,
      password: this.state.password,
      role: this.state.designation,
      email: this.state.email,
      contact: this.state.contact,
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  }

  render(){
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')} style={styles.bgimage}>
        <View>
          <Text style={styles.title}>Register Salesperson</Text>
        </View>

        <ScrollView style={{ height: 20, marginBottom: "10%" }}>
          <View style={styles.SetpswContainer}>

            <Text style={styles.intructionpsw}>Name</Text>
            <TextInput
              //secureTextEntry={true} 
              style={styles.inputpsw}
              //defaultValue="RM "
              // onBlur={ () => setShow(true) }
              // onFocus={ () => setShow(false) }
              placeholder={"Name"}
              placeholderTextColor={"grey"}
              onChangeText={(val) => this.updateInputVal(val, 'Name')}
            />
            <Text style={styles.intructionpsw}>Password</Text>
            <TextInput
              //secureTextEntry={true} 
              style={styles.inputpsw}
              //defaultValue="RM "
              // onBlur={ () => setShow(true) }
              // onFocus={ () => setShow(false) }
              placeholder={"Password"}
              placeholderTextColor={"grey"}
              onChangeText={(val) => this.updateInputVal(val,'password')}
            />
            <Text style={styles.intructionpsw}>Contact</Text>
            <TextInput
              //secureTextEntry={true} 
              style={styles.inputpsw}
              //defaultValue="RM "
              // onBlur={ () => setShow(true) }
              // onFocus={ () => setShow(false) }
              placeholder={"Phone Number"}
              placeholderTextColor={"grey"}
              onChangeText={(val) => this.updateInputVal(val,'contact')}
            />
            <Text style={styles.intructionpsw}>Email</Text>
            <TextInput
              //secureTextEntry={true} 
              style={styles.inputpsw}
              //defaultValue="RM "
              // onBlur={ () => setShow(true) }
              // onFocus={ () => setShow(false) }
              placeholder={"someone123@gmail.com"}
              placeholderTextColor={"grey"}
              onChangeText={(val) => this.updateInputVal(val,'email')}
            />
            <Text style={styles.intructionpsw}>Designation</Text>
            <TextInput
              //secureTextEntry={true} 
              style={styles.inputpsw}
              //defaultValue="RM "
              // onBlur={ () => setShow(true) }
              // onFocus={ () => setShow(false) }
              placeholder={"designation"}
              placeholderTextColor={"grey"}
              onChangeText={(val) => this.updateInputVal(val,'designation')}
            />



            {/* <Text >{Oldpsw}</Text>
            <Text >{Newpsw}</Text>
            <Text >{Retypepsw}</Text> */}
            {/* </ScrollView> */}
          </View>
        </ScrollView>



        <View style={styles.ButtonView}>
          <TouchableOpacity
            style={styles.Button1}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress={()=> this.registerUser()}
          >
            <Text style={styles.ButtonContent}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Button2}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            // onPress={this._onPressChangePswButton}
            onPress={()=> this.props.navigation.goBack()} 
          >
            <Text style={styles.ButtonContent}>Cancel</Text>
          </TouchableOpacity>


        </View>
        


        <StatusBar style="auto" />
      </ImageBackground>
    </View>


  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'flex-start',
    // paddingTop:"20%",
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  SetpswContainer: {
    marginTop: 20,
    alignSelf: "center",
    width: "80%",
    // backgroundColor:"grey",
  },

  intructionpsw: {
    fontWeight: "bold",
    marginTop: 10,
    color: orange,
  },

  inputpsw: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    color: "black",
    //backgroundColor:"lightgrey",
    padding: 10,
    borderRadius: 5,
  },

  ButtonView: {
    width: '100%',
    backgroundColor: orange,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: "stretch",
    borderWidth: 2,
    borderColor: orange,
    //justifyContent: 'space-around',
    //backgroundColor:"black",
  },

  Button1: {
    borderRightWidth: 1,
    //borderColor:"lightgrey",
    backgroundColor: orange,
    padding: 10,
    // borderTopColor: "white",
    borderRightColor: 'white',
    // borderBottomColor: 'white',
    // borderRightColor: 'white',
    width: "50%",
    // borderRadius:5,
  },

  Button2: {
    borderLeftWidth: 1,
    //borderColor:"lightgrey",
    backgroundColor: orange,
    padding: 10,
    // borderTopColor: "white",
    // borderLeftColor: 'white',
    // borderBottomColor: 'white',
    borderLeftColor: 'white',
    width: "50%",
    // borderRadius:5,
  },

  ButtonContent: {
    textAlign: 'center',
    color: "black",
    fontWeight: 'bold',
  },

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },
});
