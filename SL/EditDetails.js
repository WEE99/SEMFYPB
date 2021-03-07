import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground, Image, ScrollView, Keyboard} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import { orange } from './TablesandTimeFormat';

// export default function App() {
export default ({navigation, route}) => {
  
  const [status,setstatus]=useState("")
  const [QuotationAgreed,setQuotationAgreed]=useState("")
  const [QuotationSent,setQuotationSent]=useState("")
  const [Remarks,setRemarks]=useState("")


  const pressSave =()=>{
    {
    alert("Edit Details Succesful nav to ???")
    navigation.goBack()
    }

  };

  const pressCancel =()=>{
    alert("nav to ???")
    navigation.goBack()
  };

////button disapear method////
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
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Edit Details</Text>
      </View> */}

      <View style={styles.border}>
      <View style={styles.flexrow}>  
        <View style={styles.StatusTextContainer}>
        <Text style={{color:orange, fontWeight:"bold"}}>Status</Text>
        </View>

        <View>

        <Picker
        style={styles.dropdown}
        selectedValue={status}
        style={{height: 50, width: 130, paddingLeft:"30%", borderWidth:0, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, color:"black",fontWeight:"bold"}}
        onValueChange={(itemValue, itemIndex) =>
        setstatus(itemValue)
        }>
        <Picker.Item label="OPEN" value="Open" />
        <Picker.Item label="WON" value="Won" />
        <Picker.Item label="LOST" value="Lost" />
        </Picker>
        {/* <DropDownPicker
        items={[
            {label: 'OPEN', value: 'open'},
            {label: 'WON', value: 'won'},
            {label: 'LOST', value: 'lost'},
        ]}
        //defaultValue={status}
        placeholder=""
        placeholderStyle={{
          color:"black"
        }}
        containerStyle={{height: 40, width:100, textAlign:"center"}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
            justifyContent: 'center',
            
        }}
        selectedLabelStyle={{
          color: 'black',
          fontWeight:'bold',
        }}
        activeLabelStyle={{color: 'green', fontWeight:'bold'}}
        activeItemStyle={{justifyContent: 'flex-end'}}
        dropDownStyle={{backgroundColor: 'white', zIndex:999, width:130}}
        onChangeItem={(item) =>setstatus(item.value)}
        /> */}
        </View>
      </View>
      </View>
  {/* <Text>{status}</Text> */}
  {/* <Text>{QuotationSent}</Text> */}
  {/* <Text>{QuotationAgreed}</Text> */}
  {/* <Text>{Remarks}</Text> */}

  <View style={styles.border}>
  <View style={styles.flexrow}>
        <View style={styles.StatusTextContainer}>
          <Text style={{color:orange, fontWeight:"bold", zIndex:-1}}>Quotation Sent to Lead</Text>
        </View>

        <View style={styles.RMContainer}> 
        <Text style={styles.Quotationtext}>RM</Text>
        <View style={styles.inputquoteView}>
        <TextInput 
            style={styles.inputquote}
            onChangeText={(val) => setQuotationSent(val)}
            />
        </View>
      </View>
      </View>
      </View>

      <View style={styles.border}>
      <View style={styles.flexrow}>
        <View style={styles.StatusTextContainer}>
          <Text style={{color:orange, fontWeight:"bold"}}>Quotation Agreed by Lead</Text>
        </View>

        <View style={styles.RMContainer}> 
        <Text style={styles.Quotationtext}>RM</Text>
        <View style={styles.inputquoteView}>
        <TextInput 
            style={styles.inputquote}
            onChangeText={(val) => setQuotationAgreed(val)}
            />
        </View>
      </View>
      </View>
      </View>


      <View style={styles.border}>
        <View>
        <View style={styles.StatusTextContainer}>
          <Text style={{color:orange, fontWeight:"bold"}}>Remarks</Text>
        </View>

        <View >
        <TextInput 
      style={styles.inputRemarks}
      placeholder='No remarks avaiable' 
      placeholderTextColor="white"
      multiline={true}
      onChangeText={(val) => setRemarks(val)}
      />
        </View>
        </View>
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

  border:{
    alignSelf:"center",
    borderWidth:1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor:orange,
    padding:5,
    width:"80%",
    borderRadius:10,
    marginTop:10,
    zIndex:-1
  },

  flexrow:{
    flexDirection:"row",
    justifyContent:"space-around",
    zIndex:-1
  },

  StatusTextContainer:{
    justifyContent:"center",
    width:"50%",
    textAlign:"left",
    zIndex:-1
  },

  RMContainer:{
    flexDirection:"row",
    //borderWidth:2,
    alignItems:"center",
    borderColor:"lightgrey",
    width:"50%",
    borderRadius:5,
    padding:5,
    paddingLeft:"10%",
    zIndex:-1
  },

  Quotationtext:{color:"white"},

  inputquoteView:{
    width:"50%",
    position: 'absolute',
    right:"1%",
    justifyContent:"center",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius:10,
    padding:5,
    zIndex:-1,
  },

  inputquote:{
    fontWeight:"bold",
    color:"white"
  },

  inputRemarks:{
    marginTop:5,
    padding:5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth:1,
    borderColor:"lightgrey",
    height:80,
    borderRadius:10,
    fontWeight:"bold",
    color:"white"
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


    dropdown:{
    textAlign:"center",
    // zIndex:200
  },

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
    },

});
