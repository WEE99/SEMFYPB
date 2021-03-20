import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather'; 
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image,Keyboard, ScrollView} from 'react-native';
import {auth, db} from './firebase';
import { orange } from './TablesandTimeFormat';
// import { ScrollView } from 'react-native-gesture-handler';



//export default function App() {
export default ({navigation, route}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const pressEditImage =()=>{
    {alert('image pressed')}
  };

  const pressSave =()=>{
    {alert('Profile Saved')}
    navigation.goBack()
  };

  const pressCancel =()=>{
    alert("nav to ProfileSetting .js")
    navigation.goBack()
  };


  const [showProfileUsername, setshowProfileUsername]=useState("")
  const [showProfileNickname, setshowProfileNickname]=useState("")
  const [showUserPhone, setshowUserPhone]=useState("")
  const [showUserEmail, setshowUserEmail]=useState("")
  const [showUserRole, setshowUserRole]=useState("")

  const [Newname, setNewname]=useState("")
  const [NewMobile, setNewMobile]=useState("")
  const [NewEmail, setNewEmail]=useState("")
  const [NewDesignation, setNewDesignation]=useState("")

  
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
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Profile</Text>
      </View> */}
    {/* <View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', marginLeft:50,marginRight:50, marginTop:20, paddingBottom:50, borderRadius:10, paddingLeft:5,paddingRight:5}}> */}
      {/* <View style={styles.diamondborder}> */}

      <ScrollView style={{height:20, marginBottom:"10%"}}>
        <TouchableOpacity style={styles.squareborder} onPress={pressEditImage}>
        <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbiZWccEy7BaDQdfouPsE-0-9JUiDyTxMQg&usqp=CAU"}} style={styles.image}/>
        <View style={{backgroundColor:orange,borderRadius:100, padding:5,alignContent:"center",position:"absolute", bottom:0, right:0, justifyContent:"flex-end",alignSelf:"flex-end"}}>
        <Icon name="edit" size={24} color="black" />
        </View>
        </TouchableOpacity>
      {/* </View> */}
        {/* </View> */}

  
      <View style={styles.SetpswContainer}>
      {/* <ScrollView style={{}}> */}
      <Text style={styles.intructionpsw}>Username</Text>
      <Text style={styles.username}>Wee......</Text>

      <Text style={styles.intructionpsw}>Name</Text>
        <TextInput
            //secureTextEntry={true} 
            style={styles.inputpsw}
            //defaultValue="RM "
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            placeholder={"Wee Chien"}
            placeholderTextColor={"black"}
            onChangeText={(val) => setNewname(val)}
            />
      <Text style={styles.intructionpsw}>Mobile</Text>
        <TextInput
            //secureTextEntry={true} 
            style={styles.inputpsw}
            //defaultValue="RM "
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            placeholder={"010 222 333"}
            placeholderTextColor={"black"}
            onChangeText={(val) => setNewMobile(val)}
            />
      <Text style={styles.intructionpsw}>Email</Text>
        <TextInput
            //secureTextEntry={true} 
            style={styles.inputpsw}
            //defaultValue="RM "
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            placeholder={"Wee@gmail.com"}
            placeholderTextColor={"black"}
            onChangeText={(val) => setNewEmail(val)}
            />
      <Text style={styles.intructionpsw}>Designation</Text>
        <TextInput
            //secureTextEntry={true} 
            style={styles.inputpsw}
            //defaultValue="RM "
            // onBlur={ () => setShow(true) }
            // onFocus={ () => setShow(false) }
            placeholder={"Salesperson"}
            placeholderTextColor={"black"}
            onChangeText={(val) => setNewDesignation(val)}
            />
        

          
            {/* <Text >{Oldpsw}</Text>
            <Text >{Newpsw}</Text>
            <Text >{Retypepsw}</Text> */}
            {/* </ScrollView> */}
      </View>
      </ScrollView>
    
      
      
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
    justifyContent: 'center',
    // padding:"20%",
  },

  intructionpsw:{
    fontWeight:"bold",
    marginTop:5,
    color:orange,
    fontSize:16,
    },

  username:{
    marginTop:5,
    width:"100%",
    color:"white",
    padding:5,
    fontSize:18,
  },
  
  inputpsw:{
    marginTop:5,
    borderWidth:2,
    borderColor:"lightgrey",
    backgroundColor:"white",
    borderRadius:10,
    width:"100%",
    color:"black",
    fontSize:16,
    //backgroundColor:"lightgrey",
    padding:5,
    borderRadius:5,
    },

  // diamondborder: {
  //   alignSelf:"center",
  //   marginTop:50,
  //   //padding:5,
  //   width: 150,
  //   height: 150,
  //   borderWidth:1,
  //   borderColor: orange,
  //   alignItems:"center",
  //   transform: [{ rotate: "45deg" }],
  // },

  squareborder:{
    // borderWidth:1,
    alignSelf:'center',
    // borderColor:orange,
    padding:5,
    marginTop:50,
    width:160,
    height:160,
    alignItems:"center",
    // transform: [{ rotate: "-45deg" }],
  },
  
  image:{
    width: 140,
    height: 140,
    borderRadius:10,
  },

  SetpswContainer:{
    marginTop:5,
    marginLeft:"10%",
    marginRight:"10%",
    marginBottom:"10%"
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
