import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
//import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import TodoItem from '../components/TodoItem.js';
import { auth, db, storage } from '../components/firebase';
// export default function App({navigation}) {

  export default class Touchables extends Component {


  state={
  leadstatus:"",
  LeadList:[]
  }

  // componentDidMount(){
  //   var user=auth.currentUser
  //   db.collection("users").where("UID", "==",user.uid)
  //   .onSnapshot((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //           db.collection("leads").where("companyID", "==", doc.id).where("name", "==", this.props.route.params.paramName ).where("userId", "==", this.props.route.params.paramUserID)
  //           .onSnapshot((querySnapshot) => {
  //             let leadsArr= [];
  //               querySnapshot.forEach((docLeads) => {
  //                   let leads = docLeads.data();
  //                   leads.id = docLeads.id;
  //                   leadsArr.push(leads);
  //               });
  //               this.setState({ LeadList: leadsArr });
  //               console.log("WASSSSSUP:", leadsArr)
  //           })

  //       });
  //     })
  // }

  render(){
  return (
    <View style={styles.container}>


        <ScrollView style={styles.scrollView}>

          <Text style={styles.title}>LEAD'S DETAIL</Text>

          <View style={styles.row}>
            <Text style={styles.details}>Name</Text>
            <Text style={styles.info}>{this.props.route.params.paramName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Email</Text>
            <Text style={styles.info}>{this.props.route.params.paramEmail}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Contact</Text>
            <Text style={styles.info}>{this.props.route.params.paramContact}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Company</Text>
            <Text style={styles.info}>{this.props.route.params.paramCompany}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Interest</Text>
            <Text style={styles.info}>{this.props.route.params.paramInterest}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Comment</Text>
            <Text style={styles.info}>{this.props.route.params.paramComment}</Text>
          </View>

          {/*<Text>Count: {leadstatus}</Text>*/}

          <View style={{ borderTopColor: 'black', borderTopWidth: 1, }}>
            <Text style={styles.title2}>SALESPERSON'S DETAIL</Text>
 
          <View style={styles.row}>

            <Text style={styles.details}>Salesperson Name</Text>
            <Text style={styles.info}>{this.props.route.params.paramSalesperson}</Text>
          </View>
          <View style={styles.row}>

            <Text style={styles.details}>Salesperson Name 2</Text>
            <Text style={styles.info2}>{this.props.route.params.paramSalesperson2}</Text>
          </View>

            <TouchableOpacity style={styles.WonButton} onPress={() => this.props.navigation.navigate('Assign Salesperson')}>
              <Text style={{ color: 'white' }}>RE-ASSIGN SALESPERSON</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>


      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10%',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    //justifyContent: 'space-between',
  },

  WonButton: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  LoseButton: {
    backgroundColor: "red",
    marginLeft: 10,
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  buttoncontent: {
    color: "grey",
    marginTop: 20,
    marginBottom: 20,
  },

  details: {
    width: "30%",
    color: "grey"
    //fontWeight:"bold",
  },

  info: {
    fontWeight: "bold",
    width: '75%',
    //borderWidth:1,
  },
  info2:{
    fontWeight: "bold",
    width: '20%',
  },

  border: {
    marginTop: 10,
    borderWidth: 1,
    padding: '3%',
  },

  bordertext: {
    fontWeight: "bold",
  },

  //inputadd:{
  //marginTop:5,
  //padding:5,
  //backgroundColor:"lightgrey",
  //borderTopLeftRadius: 5,
  //borderTopRightRadius: 5,
  //borderBottomLeftRadius: 5,
  //borderBottomRightRadius: 5,
  //},

  //CreateButton:{
  //backgroundColor:"black",
  //marginTop:10,
  //alignItems:"center",
  //padding:5,
  //borderTopLeftRadius: 5,
  //borderTopRightRadius: 5,
  //borderBottomLeftRadius: 5,
  //borderBottomRightRadius: 5,
  //},

  title2: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },


  list: {
    marginTop: 20,
  },
});
