import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView, Keyboard} from 'react-native';

//export default function App() {
//export default class Touchables extends Component {
export default ({navigation, route}) => {

// _onPressChangePswButton() {
//     alert('Pasword not Match')
//   }

//   _onPressCancelChangePswButton() {
//     alert('Pasword Remains')
//   }
  
// state={
//     newpsw:'',
//     retypepsw:''
//     };

//  render(){

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

      <View style={styles.SetpswC}>
        <Text style={styles.intructionpsw}>New Password</Text>
        <TextInput 
            secureTextEntry={true} 
            style={styles.inputpsw}
            onChangeText={text => this.setState({newpsw:text})}
            />
        <Text style={styles.intructionpsw}>Retype  Password</Text>
        <TextInput 
            //secureTextEntry={true} 
            style={styles.inputpsw}
            onChangeText={text => this.setState({retypepsw:text})}
            />
        </View>
      
      <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            onPress={this. _onPressCancelChangePswButton}
            >
            <Text style={styles.ButtonContent}>Cancel</Text>
            </TouchableOpacity>
        <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            onPress={this._onPressChangePswButton}
            >
            <Text style={styles.ButtonContent}>Save</Text>
            </TouchableOpacity>
        

        </View>

      {/* {!isKeyboardVisible &&  <View style={styles.ButtonView}>
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
        } */}




      <StatusBar style="auto" />
    </View>
  );
}//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'Left',
    padding:"10%"
  },

  SetpswC:{
  backgroundColor:"white",
  },

  intructionpsw:{
  fontWeight:"bold",
  marginTop:10,
  },

  inputpsw:{
  marginTop:10,
  //borderWidth:2,
  backgroundColor:"lightgrey",
  padding:10,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  },

  ButtonView: {
  marginTop:20,
  flexDirection: 'row',
  justifyContent: 'space-around',
  //backgroundColor:"black",
  },

  Button:{
  backgroundColor:'black',
  padding: 10,
  width:150,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  },

  ButtonContent:{
  textAlign:'center',
  color:"white",
  fontWeight:'bold',
  },

});
