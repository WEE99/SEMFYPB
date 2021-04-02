import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput,ActivityIndicator } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import {firebase} from './firebase.js';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company: '',
      address: '',
      email: '',
      contact: '',
      isLoading: false
    }
  };


  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

componentDidMount(){
  const dbRef = firebase.firestore().collection('users').where("UID", "==","RTbmuyh68Gg4uAsggmnbiROpw6c2")
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          contact: user.contact,
          company: user.company,
          address: user.address,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
}

updateUser() {
  this.setState({
    isLoading: true,
  });
  const updateDBRef = firebase.firestore().collection('users').where("UID", "==","RTbmuyh68Gg4uAsggmnbiROpw6c2")
  updateDBRef.set({
    name: this.state.name,
    email: this.state.email,
    contact: this.state.contact,
    company: this.state.company,
    address: this.state.address,
  }).then((docRef) => {
    this.setState({
      key: '',
      name: '',
      email: '',
      conatact: '',
      company: '',
      address: '',
      isLoading: false,
    });
    // this.props.navigation.navigate('UserScreen');
  })
  .catch((error) => {
    console.error("Error: ", error);
    this.setState({
      isLoading: false,
    });
  });
}

  SaveButtonAction() {
    this.updateUser();
    // this.props.navigation.goBack();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
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
              onPress={() => this.SaveButtonAction()}
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
