import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput,ActivityIndicator } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import {auth, storage, db} from './firebase.js';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company: '',
      address: '',
      email: '',
      contact: '',
    }
  };

inputValueUpdate = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
}

updateUser() {
  db.collection("users").doc("V4d1aKlbbQa9HXMPX6A1")
  .update({
    name: this.state.name,
    companyName: this.state.company,
    address: this.state.address,
    email: this.state.email,
    phoneNumber: this.state.contact,
  })
  .then(() => {
    console.log("Profile Updated");
    alert("Profile Updated");
  })
  this.setState({ 
    name:"",
    company: "",
    address: "",
    email: "",
    contact:""
  })
}

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.instruction}>Username</Text>
          <TextInput
            //secureTextEntry={true} 
            style={styles.input}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />

          <Text style={styles.instruction}>Company Name</Text>
          <TextInput
            //secureTextEntry={true} 
            style={styles.input}
            value={this.state.company}
            onChangeText={(val) => this.inputValueUpdate(val, 'company')}
          />

          <Text style={styles.instruction}>Address</Text>
          <TextInput
            //secureTextEntry={true} 
            style={styles.input}
            value={this.state.address}
            onChangeText={(val) => this.inputValueUpdate(val, 'address')}
          />

          <Text style={styles.instruction}>Email</Text>
          <TextInput
            //secureTextEntry={true} 
            style={styles.input}
            value={this.state.email}
            onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />

          <Text style={styles.instruction}>Contact</Text>
          <TextInput
            //secureTextEntry={true} 
            style={styles.input}
            value={this.state.contact}
            onChangeText={(val) => this.inputValueUpdate(val, 'contact')}
          />


          <View style={styles.row}>
            <TouchableOpacity
              style={styles.Button}
              //onPress={this._onPressLoginButton}
              //disabled={!this.state.isFormValid}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.ButtonContent}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              //onPress={this._onPressLoginButton}
              //disabled={!this.state.isFormValid}
              onPress={() => this.updateUser()}
            >
              <Text style={styles.ButtonContent}>Save</Text>
            </TouchableOpacity>


          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: "10%",
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  instruction: {
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  input: {
    backgroundColor: "lightgrey",
    //width:'100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },

  Button: {
    backgroundColor: "black",
    padding: 10,
    width: 130,
    borderRadius: 5,
  },

  ButtonContent: {
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
  },
  AddressInput: {
    height: 100,
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  }

});
