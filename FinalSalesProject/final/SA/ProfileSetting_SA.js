import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
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
  _onPressCancel() {
    alert('Cancel');
  }

  _onPressSave() {
    alert('Save');
  }

  state = {
    username: '',
    companyName: '',
    address: '',
    email: '',
    contact: '',
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.instruction}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ username: text })}
          />

          <Text style={styles.instruction}>Company Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ companyName: text })}
          />

          <Text style={styles.instruction}>Address</Text>
          <TextInput
            style={styles.AddressInput}
            onChangeText={(text) => this.setState({ address: text })}
          />

          <Text style={styles.instruction}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <Text style={styles.instruction}>Contact</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ contact: text })}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.ButtonContent}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => this.props.navigation.goBack()}>
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
    marginTop: 10 },

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
