import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { auth, db, storage } from '../CA/firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';

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
    db.collection("users").doc("lNPM0knPOKln9gIO9oqV")
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
      name: "",
      company: "",
      address: "",
      email: "",
      contact: ""
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.instruction}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />

          <Text style={styles.instruction}>Company Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => this.inputValueUpdate(val, 'company')}
          />

          <Text style={styles.instruction}>Address</Text>
          <TextInput
            style={styles.AddressInput}
            onChangeText={(val) => this.inputValueUpdate(val, 'address')}
          />

          <Text style={styles.instruction}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />

          <Text style={styles.instruction}>Contact</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => this.inputValueUpdate(val, 'contact')}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.ButtonContent}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => this.updateUser()}>
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
    padding: '10%'
    , marginTop: 20
  },

  instruction: {
    fontWeight: 'bold',
    marginTop: 5,
  },

  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  Button: {
    backgroundColor: 'black',
    padding: 10,
    width: 130,
    borderRadius: 5,
    marginTop: 10
  },

  ButtonContent: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  AddressInput: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
