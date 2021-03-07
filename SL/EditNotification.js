import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground, Image, Switch} from 'react-native';
import { orange } from './TablesandTimeFormat';


// export default function App() {
export default ({navigation, route}) => {

  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);


  const pressSave =()=>{
    {
    alert("Edit Notification Succesful nav to ProfileSetting .js")
    navigation.goBack()
    }

  };

  const pressCancel =()=>{
    alert("nav to ProfileSetting .js")
    navigation.goBack()
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Notification</Text>
      </View> */}

      <View style={styles.FlexSwitch}>
        <View style={styles.Switchintrustion}>
          <Text style={{color:orange}}>Appointment Reminder</Text>
        </View>

        <View style={styles.Switch}>
        <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch1}
        value={isEnabled1}
        />  
        </View>
      </View>

      <View style={styles.FlexSwitch}>
        <View style={styles.Switchintrustion}>
          <Text style={{color:orange}}>New Incomming Leads</Text>
        </View>

        <View style={styles.Switch}>
        <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch2}
        value={isEnabled2}
        />  
        </View>
      </View>


      <View style={styles.ButtonView}>
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

  FlexSwitch:{
    marginTop:10,
    width:"80%",
    flexDirection:"row",
    borderWidth:2,
    borderColor:orange,
    padding:10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius:5,
    alignItems:"center",
    alignSelf:"center",
  },

  Switchintrustion:{
    //marginRight:"5%",
    width:"80%",

  },

  Switch:{
    //width:"100%",
    position: 'absolute',
    right: 5,
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
    backgroundColor:'orange',
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
    backgroundColor:'orange',
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
