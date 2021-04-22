import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {auth, db, storage} from "../CA/firebase";

//export default function App() {
  export default ({navigation, route}) => {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lead_id: '',
  //     remarks: '',
  //     remarksDescription: '',
  //   }
  // }

  // componentDidMount() {
  //   this.setState({
  //     lead_id: this.props.route.params.lead_id,
  //     remarks: this.props.route.params.remarks
  //   })
  // }

  // _Insert_Data_Into_MySQL() {
  //   const url = 'https://poggersfyp.mooo.com/Backend/saveRemarks.php';
  //   fetch(url,
  //     {
  //       method: 'POST',
  //       headers:
  //       {
  //         'Origin': '*',
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(
  //         {
  //           LD: this.state.lead_id,
  //           remarks: this.state.remarks,
  //         })

  //     }).then((response) => response.json()).then((responseJsonFromServer) => {
  //       alert(responseJsonFromServer);

  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   this.props.navigation.navigate('Dashboard');
  // }

  const {comment,company,contactNumber,contacted,date,email,interest,name,quote,quoteSent,quoteAgreed,result,userId,id,Remarks} = route.params;
  const [remarksReceived,setRemarksReceived]=useState(Remarks)
  const [remarksUpdated,setRemarksUpdated]=useState("")

  const pressCancel =()=>{
    alert("Cancel")
    navigation.goBack()
  };

  const pressSave =()=>{
    if (remarksUpdated!="")
    {
    console.log("confirm: "+ id)
    var LeadRef = db.collection("leads").doc(id);
    // Set the "capital" field of the city 'DC'
    return LeadRef.update({
      Remarks: remarksUpdated
      })
      .then(() => {
      console.log("Document successfully updated!");
      alert("Remarks updated successfully")
      navigation.goBack()
      })
      .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      });
    }
    else
    {alert("No new remarks or remarks is not fill")}            
    // navigation.goBack()
  };

  useEffect(() => {
    console.log("id: " +id +", "+name+" ,"+Remarks)
    console.log("set Remarks data: "+Remarks+","+ remarksReceived)
    
  },[]);


  // render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.RemarksC}>
            <Text style={styles.Remarks}>Remarks</Text>
            {remarksReceived?
            <TextInput
              style={styles.inputR}
              placeholder={remarksReceived}
              placeholderTextColor="grey"
              multiline={true}
              autoFocus={true}
              editable={true}
              onChangeText={(val) => setRemarksUpdated(val)}
              />
              :
             <TextInput
              style={styles.inputR}
              placeholder='Write down your justification here'
              placeholderTextColor="grey"
              multiline={true}
              autoFocus={true}
              editable={true}
              onChangeText={(val) => setRemarksUpdated(val)}
            />
            }
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={styles.SubmitButtonR}
              onPress={pressSave}
            >
              <Text style={styles.SubmitR} >Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.SubmitButtonR}
              onPress={pressCancel}
            >
              <Text style={styles.SubmitR} >Cancel</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
  // }
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
    fontSize:16,
  },

  inputR: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    height: 200,
    borderRadius: 5,
  },

  SubmitButtonR: {
    margin: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: 130
  },

  SubmitR: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: "center",
    textAlign: "center",
  },

});