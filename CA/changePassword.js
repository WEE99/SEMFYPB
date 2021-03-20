import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image,ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import { orange } from './TablesandTimeFormat';



// export default function App() {
export default ({navigation, route}) => {
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

  const [show,setShow]=useState(true);

  const pressSave =()=>{
    if(Newpsw==Retypepsw && Newpsw!="" && Oldpsw!="" && Newpsw!="")
    {
    alert("Resset Succesful nav to ProfileSetting .js")
    navigation.goBack()
    }
    else
    {alert('Pasword not Match or No Input')}
  };

  const pressCancel =()=>{
    alert("nav to ProfileSetting .js")
    navigation.goBack()
  };

  const [Oldpsw, setOldpsw]=useState("");
  const [Newpsw, setNewpsw]=useState("");
  const [Retypepsw, setRetypepsw]=useState("");
  


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Password</Text>
      </View> */}

      <View style={styles.SetpswContainer}>
      <Text style={styles.intructionpsw}>Old Password</Text>
        <TextInput
            //secureTextEntry={true} 
            style={styles.inputpsw}
            //defaultValue="RM "
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            onChangeText={(val) => setOldpsw(val)}
            />
        <Text style={styles.intructionpsw}>New Password</Text>
        <TextInput
            placeholderTextColor={"white"} 
            secureTextEntry={true} 
            style={styles.inputpsw}
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            onChangeText={(val) => setNewpsw(val)}
            />
        <Text style={styles.intructionpsw}>Retype New Password</Text>
        <TextInput 
            //secureTextEntry={true} 
            style={styles.inputpsw}
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            onChangeText={(val) => setRetypepsw(val)}
            />

          
            {/* <Text >{Oldpsw}</Text>
            <Text >{Newpsw}</Text>
            <Text >{Retypepsw}</Text> */}
        </View>
      
      
      {!isKeyboardVisible &&  <View style={styles.ButtonView}>
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
        }
     

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

  SetpswContainer:{
    marginTop:20,
    alignSelf:"center",
    width:"80%",
    // backgroundColor:"grey",
    },
  
  intructionpsw:{
    fontWeight:"bold",
    marginTop:10,
    color:orange,
    },
  
  inputpsw:{
    marginTop:10,
    borderWidth:2,
    borderColor:"lightgrey",
    backgroundColor:"white",
    borderRadius:10,
    width:"100%",
    color:"black",
    //backgroundColor:"lightgrey",
    padding:10,
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
