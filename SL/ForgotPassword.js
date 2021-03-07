import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import {auth} from "./firebase";




// export default function App() {
export default ({navigation, route}) => {

const [forgotEmail, setforgotEmail]=useState("");

const  pressRessetPassword= ()=>
  {
  if (forgotEmail==""){
    alert("Email empty")
  }
  auth.sendPasswordResetEmail(forgotEmail).then(function() {
    alert ("Email is sent to" + forgotEmail)
    navigation.navigate("Login")

  }).catch(function(error) {
    alert("Email not sent please try again later")
    navigation.navigate("Login")
  });
  };

  return (
    <View style={styles.container}>
      {/* https://wallpaperaccess.com/full/1503970.jpg */}
      {/* <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1562710057-b3a85fa9ba85?ixlib=rb-1.2.1&w=1000&q=80' }} style={styles.image}> */}
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.image}>


        <View style={styles.emailwhite}>

          <View style={styles.usernameC}>
            <Text style={styles.email}>Email : </Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={(val) => setforgotEmail(val)}
            />
          </View>


          <View>
            <TouchableOpacity
              style={styles.RessetButton}
              onPress= {pressRessetPassword}
            >
              <Text style={styles.Resset}>RESET</Text>
            </TouchableOpacity>
          </View>
          {/* <Text >{"email====>" + forgotEmail}</Text> */}
        </View>


        <StatusBar style="auto" />
      </ImageBackground>
    </View>

  );
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "grey",
  alignItems: 'center',
},

image: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: "cover",
  justifyContent: "center"

},

emailwhite: {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius:10,
  padding: 50,
  marginLeft: "18%",
  marginRight: "18%",
  alignItems: 'center',
  // opacity:"85%",
},


input: {
  // borderWidth: 2,
  //borderColor: '#FF0000',
  backgroundColor: "#F3EEEE",
  // borderColor: '#FF0000',
  borderTopColor: '#fff',
  borderLeftColor: '#fff',
  borderRightColor: '#fff',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: 10,
  fontSize: 20,
  marginBottom: 10,
  marginTop: 5,
  width: 200,
  alignSelf: 'flex-start',
},


RessetButton: {
  width: 200,
  marginTop: 20,
  backgroundColor: "black",
  borderRadius:10,
  padding: 10,
  //borderRadius: 50,
},

email: {
  fontSize: 20,
  fontWeight: "bold"
},


Resset: {
  color: "#F8C018",
  fontSize: 20,
  fontWeight: 'bold',
  justifyContent: "center",
  textAlign: "center",
},

});
