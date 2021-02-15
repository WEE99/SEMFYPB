import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';

export default function App() {

  const pressLogin =()=>{
    alert("Login Succesful nav to Dashboard .js")
  };

  const pressForgotpassword =()=>{
    alert("nav to ForgotPassword .js")
  };

  const [Loginusername, setLoginusername]=useState("");
  const [Loginpassword, setLoginpassword]=useState("");

  return (
    <View style={styles.container}>
    {/* https://wallpaperaccess.com/full/1503970.jpg */}
    <ImageBackground source={{uri: ''}} style={styles.backgroundimage}>
    
    <View style={styles.LogintitleContainer}>
      <Text style={styles.title}>Sales Customer Management System</Text>
    </View>

    <View style={styles.extra}>
    <View style={styles.usernameandpasswordcontainer}>

    <View style={styles.usernameC}>
      <Text style={styles.username}>Username : </Text>
      <TextInput 
      style={styles.input}
      placeholder='Username'
      onChangeText={(val) => setLoginusername(val)}
       />
    </View>

    <View style={styles.passwordC}>
      <Text style={styles.password}>Password : </Text>
      <TextInput 
      secureTextEntry={true} 
      style={styles.input}
      placeholder='Password'
      onChangeText={(val) => setLoginpassword(val)}
      />
    </View>

    <View>
     <TouchableOpacity
      onPress= {pressForgotpassword}>
      <Text style={styles.forgot}>Forgot Password?</Text>
     </TouchableOpacity>
    </View>

    <View>
        <TouchableOpacity
         style={styles.SignINButton}
         onPress= {pressLogin}
         //onPress={() => this._onPressLoginButton()}
         //disabled={!this.state.isFormValid}
         >
         <Text style={styles.SignIN}>SIGN IN</Text>
     </TouchableOpacity>
     </View>

     {/* <Text >{"username====>"+ Loginusername}</Text>
     <Text >{"username====>"+ Loginpassword}</Text> */}

    {/* <Text >{"password====>"+Base64.encode(this.state.LOGIN_password) }</Text> */}
     </View>
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
    //backgroundColor:"grey",
    alignItems: 'center',
    //justifyContent: 'center',
  },

  backgroundimage: {
    flex: 1,
    width:'100%',
    height:'100%',
    resizeMode: "cover",
    justifyContent: "center"

  },

  extra:{
    paddingLeft:"10%",
    paddingRight:"10%",
    alignItems:'center',
    // marginBottom:20,
  },

  usernameandpasswordcontainer:{
  backgroundColor:"white",
  padding: "10%",
  borderWidth:2,
  borderColor:"black",
  alignItems:'center',
  },

  LogintitleContainer: {
  padding:10,
  marginBottom:50,
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: "bold",
    color:"lightgrey",

  },

  input: {
    borderWidth: 2,
    backgroundColor: '#D3D3D3',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderRadius:10,
    padding: 10,
    marginBottom:10,
    marginTop:5,
    width:200,
    alignSelf: 'flex-start',
  },

  forgot:{
    color:"black",
    fontSize:11,
    textAlign:"center",
  },

  SignINButton: {
    width: 200,
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
  },

  username: {
  fontWeight: "bold"
  },

  password:{
  fontWeight: "bold"
  },

  SignIN: {
    color: "white",
    fontSize: 20,
    fontWeight:'bold',
    justifyContent: "center",
    textAlign: "center",
  },
});