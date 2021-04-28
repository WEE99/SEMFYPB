import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TextInput,
   TouchableOpacity, FlatList, Alert } from 'react-native';
   import React, {useEffect, useState, Component} from 'react';
   import {auth, db, storage} from "../components/firebase";


   export default ({navigation, route}) => {

    const {comment,company,contactNumber,contacted,date,email,interest,name,quote,quoteSent,quoteAgreed,result,userId,id} = route.params;
    const [quoteReceived,setQuoteReceived]=useState(quoteAgreed)
    const [quoteUpdated,setQuoteUpdated]=useState("")

    const pressCancel =()=>{
      // alert("Cancel")
      navigation.goBack()
    };

    const pressConfirm =()=>{
      if (quoteUpdated!="")
      {
      console.log("confirm: "+ id)
      var LeadRef = db.collection("leads").doc(id);
      // Set the "capital" field of the city 'DC'
      return LeadRef.update({
        quoteAgreed: quoteUpdated
        })
        .then(() => {
        console.log("Document successfully updated!");
        alert("Quote sent Updated RM"+quoteUpdated)
        navigation.goBack()
        })
        .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        });
      }
      else
      {alert("Please fill in the new quote")}
      
                             
      // navigation.goBack()
    };


    useEffect(() => {
      console.log("id: " +id +", "+name+" ,"+quoteAgreed)
      console.log("set Quotation Agreed data: "+quote+","+ quoteReceived)
      
    },[]);
    

    return (
    <View style={styles.container}>
    <Text style={styles.Remarks}>Quotation Agreed</Text>

    <View style={{flexDirection:"row", padding:5,marginTop:10, backgroundColor:"lightgrey",borderRadius:5}}>
    <Text style={{alignSelf:"center"}}>RM </Text>
    {quoteReceived?
    <TextInput
      placeholder={quoteReceived}
      placeholderTextColor="grey"
      autoFocus={true}
      editable={true}
      style={{width:"90%"}}
      // keyboardShouldPersistTaps={handled}
      keyboardType={'phone-pad'}
      onChangeText={(val) => setQuoteUpdated(val)}
      // onChangeText={text => this.setState({ Quote: text })}
      />:
      <TextInput
      placeholder={"Set Quote"}
      placeholderTextColor="red"
      autoFocus={true}
      editable={true}
      style={{width:"90%"}}
      // keyboardShouldPersistTaps={handled}
      keyboardType={'phone-pad'}
      onChangeText={(val) => setQuoteUpdated(val)}
      // onChangeText={text => this.setState({ Quote: text })}
      />}
      </View>
    

    <View style={{ flexDirection: "row", alignSelf: 'center' }}>
             <TouchableOpacity
              style={styles.SubmitButtonR}
              onPress={pressCancel}
              // onPress={() => { this.props.navigation.goBack() }}
            >
               <Text style={styles.SubmitR} >Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.SubmitButtonR}
               onPress={pressConfirm}
               // onPress={() => { this._Insert_Data_Into_MySQL() }}
             >
               <Text style={styles.SubmitR} >Confirm</Text>
             </TouchableOpacity>
           </View>
    </View>
        
    )
   }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: "10%"
  },

  RemarksC: {
    backgroundColor: "white",
  },

  Remarks: {
    color: "black",
    fontWeight: "bold",
  },

  inputR: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    height: 50,
    borderRadius: 5,
    flexDirection: 'row'
  },

  SubmitButtonR: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: '35%'
  },

  SubmitR: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: "center",
    textAlign: "center",
  },

});