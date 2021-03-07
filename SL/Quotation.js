import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import { orange } from './TablesandTimeFormat';


// export default function App() {
export default ({navigation, route}) => {

  const [QuotationSent,setQuotationSent]=useState("");
  const [QuotationAgreed,setQuotationAgreed]=useState("");

  const pressSave =()=>{
    {
    alert("Edit Quotation Succesful nav to Dashboard .js")
    navigation.goBack()
    }

  };

  const pressCancel =()=>{
    alert("nav to Dashboard .js")
    navigation.goBack()
  };

  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Quotation</Text>
      </View> */}

      <View style={styles.FlexQuote}>
        <View style={styles.intrustion}>
          <Text style={styles.Quotationtext}>Quotation Sent to Lead</Text>
        </View>

        <View style={styles.RMContainer}> 
        <Text style={styles.Quotationtext2}>RM</Text>
        <View style={styles.inputquoteView}>
        <TextInput 
            style={styles.inputquote}
            onChangeText={(val) => setQuotationSent(val)}
            />
        </View>
      </View>
      </View>

      <View style={styles.FlexQuote}>
        <View style={styles.intrustion}>
          <Text style={styles.Quotationtext}>Quotation Agreed by Lead</Text>
        </View>

        <View style={styles.RMContainer}> 
        <Text style={styles.Quotationtext2}>RM</Text>
        <View style={styles.inputquoteView}>
        <TextInput 
            style={styles.inputquote}
            onChangeText={(val) => setQuotationAgreed(val)}
            />
        </View>
      </View>
      </View>

      {/* <Text >{QuotationAgreed}</Text>
      <Text >{QuotationSent}</Text> */}

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

  FlexQuote:{
    marginTop:10,
    width:"80%",
    flexDirection:"row",
    borderWidth:2,
    borderColor:orange,
    borderRadius:10,
    padding:10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //borderRadius:5,
    alignSelf:"center",
    alignItems:"center",
  },

  intrustion:{
    width:"50%",
    padding:'2%'

  },


  RMContainer:{
    flexDirection:"row",
    // borderWidth:2,
    borderColor:"lightgrey",
    width:"50%",
    borderRadius:5,
    padding:5,

  },

  inputquoteView:{
    width:"50%",
    position: 'absolute',
    right:"10%",
  },

  inputquote:{
    color:"white",
    fontWeight:"bold",
    borderWidth:2,
    borderRadius:10,
    borderColor:orange,
  },

  Quotationtext:{
    color:orange,
    fontWeight:'bold',
  },

  Quotationtext2:{
    color:"white",
    fontWeight:'bold',
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
