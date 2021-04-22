import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StackNavigator, } from 'react-navigation';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default ({navigation, route}) => {
//export default function App() {
// export default class Touchables extends Component {

//   static navigationOptions = {
//     title: 'resset psw',
//   };

//   _onPressChangePswButton() {
//     const { newpsw } = this.state;
//     const { retypepsw } = this.state
//     const { p1 } = 'John David';

//     if (newpsw == retypepsw && newpsw != "") {
//       const url = 'https://poggersfyp.mooo.com/Backend/ressetpsw.php';
//       fetch(url,
//         {
//           method: 'POST',
//           headers:
//           {
//             'Origin': '*',
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(
//             {
//               newpsw: this.state.newpsw,
//               retypepsw: this.state.retypepsw,
//               user: 'John David',
//             })

//         }).then((response) => response.json()).then((responseJsonFromServer) => {

//         }).catch((error) => {
//           console.log(error);
//         });

//       alert("Password Change Successfully")
//       this.props.navigation.goBack();
//     }
//     else {
//       alert('Pasword not Match or no input')
//       //alert(p1)
//     }
//   }
  
//   _onPressCancelChangePswButton() {
//     alert('Password Remains');
//     this.props.navigation.goBack();
//   }

//   constructor(props) {
//     super(props)
//     this.state = {
//       newpsw: '',
//       retypepsw: '',
//       p1: 'John David',
//     }
//   }
  // render() {
  //   var p1 = 'John David';
  //   const { navigate } = this.props.navigation;

  const pressCancel =()=>{
    alert("Cancel")
    navigation.goBack();
  }

  const pressSave =()=>{
    // alert("Save")
    if(Newpsw==Retypepsw && Newpsw!="" && Oldpsw!="" && Newpsw!="")
    {
    alert("Resset Succesful nav to ProfileSetting .js")
    navigation.goBack()
    }
    else
    {alert('Pasword not Match or Empty Field Detected')}
  };
  

  const [Oldpsw, setOldpsw]=useState("");
  const [Newpsw, setNewpsw]=useState("");
  const [Retypepsw, setRetypepsw]=useState("");

    return (
      <View style={styles.container}>

        <View style={styles.SetpswC}>
        <Text style={styles.intructionpsw}>Old Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputpsw}
            onChangeText={(val) => setOldpsw(val)}
          />
          <Text style={styles.intructionpsw}>New Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputpsw}
            onChangeText={(val) => setNewpsw(val)}
          />
          <Text style={styles.intructionpsw}>Retype  Password</Text>
          <TextInput
            //secureTextEntry={true} 
            style={styles.inputpsw}
            onChangeText={(val) => setRetypepsw(val)}
          />
        </View>

        <View style={styles.ButtonView}>
          <TouchableOpacity
            style={styles.Button}
            onPress={pressCancel}
          >
            <Text style={styles.ButtonContent}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={pressSave}
          >
            <Text style={styles.ButtonContent}>Save</Text>
          </TouchableOpacity>


        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'Left',
    padding: "10%"
  },

  SetpswC: {
    backgroundColor: "white",
  },

  intructionpsw: {
    fontWeight: "bold",
    marginTop: 10,
  },

  inputpsw: {
    marginTop: 10,
    //borderWidth:2,
    backgroundColor: "lightgrey",
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  ButtonView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor:"black",
  },

  Button: {
    backgroundColor: 'black',
    padding: 10,
    width: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  ButtonContent: {
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
  },

});
