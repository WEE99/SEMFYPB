import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';


export default function App() {

  const [QuotationSent,setQuotationSent]=useState("");
  const [QuotationAgreed,setQuotationAgreed]=useState("");

  const pressSave =()=>{
    {
    alert("Edit Quotation Succesful nav to Dashboard .js")
    }

  };

  const pressCancel =()=>{
    alert("nav to Dashboard .js")
  };

  
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Quotation</Text>
      </View>

      <View style={styles.FlexQuote}>
        <View style={styles.intrustion}>
          <Text style={styles.Quotationtext}>Quotation Sent to Lead</Text>
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

      <View style={styles.FlexQuote}>
        <View style={styles.intrustion}>
          <Text style={styles.Quotationtext}>Quotation Agreed by Lead</Text>
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

      {/* <Text >{QuotationAgreed}</Text>
      <Text >{QuotationSent}</Text> */}

      <View style={styles.ButtonView}>
       <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
            //onPress={this. _onPressCancelChangePswButton}
            onPress= {pressSave}
            >
            <Text style={styles.ButtonContent}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.Button}
            //onPress={this._onPressLoginButton}
            //disabled={!this.state.isFormValid}
           // onPress={this._onPressChangePswButton}
           onPress= {pressCancel}
           >
         <Text style={styles.ButtonContent}>Cancel</Text>
        </TouchableOpacity>
        </View>



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'flex-start',
    paddingTop:"20%",
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
    //borderWidth:2,
    //borderColor:"lightgrey",
    padding:10,
    //borderRadius:5,
    alignItems:"center",
  },

  intrustion:{
    width:"50%",
    padding:'2%'

  },


  RMContainer:{
    flexDirection:"row",
    borderWidth:2,
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
  },

  Quotationtext:{
    color:"orange",
    fontWeight:'bold',
  },

  ButtonView: {
    width: '100%',
    backgroundColor:"white",
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems:"stretch",
    borderWidth:2,
    borderColor:"lightgrey",
    //justifyContent: 'space-around',
    //backgroundColor:"black",
    },
  
  Button:{
    borderWidth:3,
    //borderColor:"lightgrey",
    // backgroundColor:'black',
    padding: 10,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#fff',
    borderRightColor: 'lightgrey',
    width:"50%",
    // borderRadius:5,
    },
  
  ButtonContent:{
    textAlign:'center',
    color:"orange",
    // fontWeight:'bold',
    },

  
});
