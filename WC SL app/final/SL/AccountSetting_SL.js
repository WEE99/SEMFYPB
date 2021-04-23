import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import {auth, db, storage} from "../CA/firebase";


export default ({navigation, route}) => {
  //export default function App() {
//export default class Touchables extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: '',
  //     designation: '',
  //     sales_name: '',
  //     sales_email: '',
  //     sales_contact: '',
  //   }
  // }

  // componentDidMount() {
  //   this.setState({
  //     username: this.props.route.params.username,
  //     designation: this.props.route.params.designation,
  //     sales_name: this.props.route.params.sales_name,
  //     sales_email: this.props.route.params.sales_email,
  //     sales_contact: this.props.route.params.sales_contact
  //   });
  // }

  // exit(){
  //   Alert.alert(
  //     "Exit App",
  //     "Do you want to exit?",
  //     [
  //       {
  //         text: "No",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "Yes", onPress: () => BackHandler.exitApp() }
  //     ],
  //     { cancelable: false }
  //     );
  // }

const pressProfile =()=>{
  Alert.alert('navigation.navigate("Profile Settings")',"pressed")
    navigation.navigate("Profile Settings");  
}

const pressChangepsw =()=>{
  Alert.alert('navigation.navigate("ChangePassword")',"pressed")
  navigation.navigate("ChangePassword");  
}

const pressNotify =()=>{
  Alert.alert('navigation.navigate("Notification Settings")',"pressed")
  navigation.navigate("Notification Settings"); 
}

const pressLogout =()=>{
  auth.signOut().then(() => {
    // Sign-out successful.
    Alert.alert('Logout',"pressed")
  }).catch((error) => {
    // An error happened.
  });
}

  
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.AccButton}
            onPress={pressProfile}
          >
            <Text style={styles.buttoncontent}>PROFILE SETTING</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.AccButton}
            onPress={pressNotify}
          >
            <Text style={styles.buttoncontent}>NOTIFICATION</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.AccButton}
            onPress={pressChangepsw}
          >
            <Text style={styles.buttoncontent}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.AccButton}
            onPress={pressLogout}
          >
            <Text style={styles.buttoncontent}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "10%",
  },

  AccButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    width: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  buttoncontent: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: "center",
    textAlign: "center",
  },
});
