import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image, ScrollView, LogBox } from 'react-native';
import { orange, TableRowDashboard } from "./TablesandTimeFormat";
import { auth, db, storage } from "../components/firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Tooltip} from'react-native-elements';


export default ({ navigation, route }) => {

  var data = db.collection("users");

  const [username, setUsername] = useState("");
  const [leads, setLeads] = useState([]);


  useEffect(() => {

    var user = auth.currentUser
    console.log(user)
    // if(user){
    // console.log(user.uid)
    // db.collection("users").where("UID", "==",user.uid)
    db.collection("users").where("UID", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          db.collection("leads").where("userId", "==", doc.id)
            .onSnapshot((querySnapshot) => {
              let leadsArr = [];
              querySnapshot.forEach((docLeads) => {
                let leads = docLeads.data();
                leads.id = docLeads.id;
                leadsArr.push(leads);
                // doc.data() is never undefined for query doc snapshots
                console.log(docLeads.id, " => ", docLeads.data());
              });
              setLeads(leadsArr)
              console.log("LeadsArr:" + JSON.stringify(leadsArr));
            })


          console.log(doc.id, " => ", doc.data());
          setUsername(doc.data().name)
        });
      })


    LogBox.ignoreLogs(['Setting a timer']);

  }, []);

  const pressWon = () => {
    alert("Set Quotation Agreed. js")
    navigation.navigate("Set Quotation Agreed");
  }

  const pressLost = () => {
    alert("Lost nav Remarks. js")
    navigation.navigate("Remarks");
  }

  const pressQuote = () => {
    alert("nav setQuotationSend .js")
    navigation.navigate("Set Quotation Sent");
  }

  const pressLead = () => {
    alert("nav LeadsDetails .js")
    navigation.navigate("Details");
  }

  const pressNotification = () => {
    alert("nav to Notification .js ");
    navigation.navigate('Notification');

  }

  return (
    <View style={styles.container}>


      <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, margin: "5%" }}>

        <Text style={styles.title}>DASHBOARD</Text>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={{ color: "grey", fontSize: 10, fontStyle: 'italic' }}>*Tap the table cells for more actions</Text>
        </View>
        <View style={{ paddingBottom: 40, paddingTop: 10 }}>
          <View style={{ backgroundColor: "#fff", marginHorizontal: 15, borderWidth: 1, borderColor: "black", elevation: 2, borderTopWidth: 1 }}>
            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "black", backgroundColor: "lightgrey", paddingHorizontal: 10, height: 40 }}>
              <Text style={{ flex: 0.25, fontSize: 13, paddingVertical: 2, color: "black", fontWeight: "bold", justifyContent: "center", alignItems: "center", textAlign: "center", borderRightWidth: 1, paddingTop: 10 }}>
                Name
                    </Text>
              <Text style={{ flex: 0.25, fontSize: 13, paddingVertical: 2, color: "black", fontWeight: "bold", textAlign: "center", justifyContent: "center", alignItems: "center", textAlign: "center", borderRightWidth: 1, paddingTop: 10 }}>
                Contacted
                    </Text>
              <Text style={{ flex: 0.25, fontSize: 13, paddingVertical: 2, color: "black", fontWeight: "bold", textAlign: "center", justifyContent: "center", alignItems: "center", textAlign: "center", borderRightWidth: 1, paddingTop: 10 }}>
                Quote Sent
                    </Text>
              <Text style={{ flex: 0.25, fontSize: 13, paddingVertical: 2, color: "balck", fontWeight: "bold", textAlign: "center", justifyContent: "center", alignItems: "center", textAlign: "center", paddingTop: 10 }}>
                Status
                    </Text>
            </View>


            {leads.map((info) =>
              <TableRowDashboard key={info.id} data={info} navigation={navigation} handlePressLead={pressLead} handlePressQuote={pressQuote} handlePressLost={pressLost} handlePressWon={pressWon} />
            )}



          </View>

        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    // justifyContent: 'center',
    //padding:"20%"
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 5,
    flex: 1
  },

  DashboardtitleContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center"
  },

  titleDashboard: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    alignItems: "flex-start",
  },

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },
});
